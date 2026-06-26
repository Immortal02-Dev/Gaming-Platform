import db from "../config/db";
import {
  fetchNBAScores,
  fetchNBAOdds,
  OddsEvent,
  OddsData,
} from "../services/oddsApiService";
import dotenv from "dotenv";

dotenv.config();

/**
 * Maps The Odds API status to our database status
 */
function mapStatus(
  completed: boolean,
): "upcoming" | "live" | "finished" | "cancelled" {
  if (completed) return "finished";
  // The Odds API doesn't explicitly flag "live" in the scores endpoint easily without comparing times,
  // but if scores are present and it's not completed, it's likely live or just started.
  return "upcoming";
}

async function syncNBA_Odds() {
  console.log("🏀 Starting NBA Sync (The Odds API)...");

  try {
    // 1. Ensure Sport exists
    const sport_slug = "basketball";
    const [sports]: any = await db.query(
      "SELECT id FROM sports WHERE slug = ?",
      [sport_slug],
    );
    let sportId: number;

    if (sports.length === 0) {
      const [result]: any = await db.query(
        "INSERT INTO sports (slug, name, order_index) VALUES (?, ?, ?)",
        [sport_slug, "Basketball", 2],
      );
      sportId = result.insertId;
    } else {
      sportId = sports[0].id;
    }

    // 2. Ensure League exists
    const league_slug = "nba";
    const [leagues]: any = await db.query(
      "SELECT id FROM leagues WHERE slug = ?",
      [league_slug],
    );
    let leagueId: number;

    if (leagues.length === 0) {
      const [result]: any = await db.query(
        "INSERT INTO leagues (sport_id, slug, name, region, is_popular) VALUES (?, ?, ?, ?, ?)",
        [sportId, league_slug, "NBA", "USA", true],
      );
      leagueId = result.insertId;
    } else {
      leagueId = leagues[0].id;
    }

    // 3. Fetch Data
    console.log("📡 Fetching NBA Scores...");
    const scores = await fetchNBAScores();
    console.log("📡 Fetching NBA Odds...");
    const oddsData = await fetchNBAOdds();

    console.log(`✅ Found ${scores.length} games.`);

    const NBA_LOGO_MAP: Record<string, string> = {
      "Atlanta Hawks": "atl",
      "Boston Celtics": "bos",
      "Brooklyn Nets": "bkn",
      "Charlotte Hornets": "cha",
      "Chicago Bulls": "chi",
      "Cleveland Cavaliers": "cle",
      "Dallas Mavericks": "dal",
      "Denver Nuggets": "den",
      "Detroit Pistons": "det",
      "Golden State Warriors": "gs",
      "Houston Rockets": "hou",
      "Indiana Pacers": "ind",
      "LA Clippers": "lac",
      "Los Angeles Clippers": "lac",
      "Los Angeles Lakers": "lal",
      Lakers: "lal",
      "Memphis Grizzlies": "mem",
      "Miami Heat": "mia",
      "Milwaukee Bucks": "mil",
      "Minnesota Timberwolves": "min",
      "New Orleans Pelicans": "no",
      "New York Knicks": "ny",
      "Oklahoma City Thunder": "okc",
      "Orlando Magic": "orl",
      "Philadelphia 76ers": "phi",
      "Phoenix Suns": "phx",
      "Portland Trail Blazers": "por",
      "Sacramento Kings": "sac",
      "San Antonio Spurs": "sa",
      "Toronto Raptors": "tor",
      "Utah Jazz": "utah",
      "Washington Wizards": "was",
    };

    for (const event of scores) {
      try {
        // 4. Upsert Teams
        const upsertTeam = async (name: string) => {
          // Normalize name for mapping
          const logoCode = NBA_LOGO_MAP[name];
          const logo = logoCode
            ? `https://a.espncdn.com/i/teamlogos/nba/500/scoreboard/${logoCode}.png`
            : `https://via.placeholder.com/150?text=${encodeURIComponent(name)}`;

          const [existing]: any = await db.query(
            "SELECT id, logo FROM teams WHERE name = ?",
            [name],
          );

          if (existing.length > 0) {
            // Update logo if it's currently a placeholder or different
            if (
              existing[0].logo.includes("placeholder") ||
              (logoCode && !existing[0].logo.includes("espncdn"))
            ) {
              await db.query("UPDATE teams SET logo = ? WHERE id = ?", [
                logo,
                existing[0].id,
              ]);
            }
            return existing[0].id;
          }

          const [result]: any = await db.query(
            "INSERT INTO teams (sport_id, name, logo) VALUES (?, ?, ?)",
            [sportId, name, logo],
          );
          return result.insertId;
        };

        const homeTeamId = await upsertTeam(event.home_team);
        const awayTeamId = await upsertTeam(event.away_team);

        // 5. Upsert Match Event
        const status = event.completed
          ? "finished"
          : event.scores && event.scores.length > 0
            ? "live"
            : "upcoming";
        const gameSlug = `nba-${event.id}`;

        // Determine live status
        const isLive = status === "live";

        const homeScoreRaw =
          event.scores?.find((s) => s.name === event.home_team)?.score || "0";
        const awayScoreRaw =
          event.scores?.find((s) => s.name === event.away_team)?.score || "0";

        const homeScore = parseInt(String(homeScoreRaw), 10) || 0;
        const awayScore = parseInt(String(awayScoreRaw), 10) || 0;

        const periodInfo = event.completed
          ? "Final"
          : isLive
            ? "Live"
            : "Upcoming";

        const [existingMatch]: any = await db.query(
          "SELECT id FROM match_events WHERE slug = ?",
          [gameSlug],
        );

        let matchId: number;
        if (existingMatch.length > 0) {
          matchId = existingMatch[0].id;
          await db.query(
            `UPDATE match_events SET 
              status = ?, 
              is_live = ?, 
              home_score = ?, 
              away_score = ?, 
              period_info = ?,
              start_time = ?,
              is_popular = TRUE
            WHERE id = ?`,
            [
              status,
              isLive,
              homeScore,
              awayScore,
              periodInfo,
              new Date(event.commence_time),
              matchId,
            ],
          );
        } else {
          const [result]: any = await db.query(
            `INSERT INTO match_events (league_id, home_team_id, away_team_id, start_time, status, is_live, home_score, away_score, period_info, slug, is_popular)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              leagueId,
              homeTeamId,
              awayTeamId,
              new Date(event.commence_time),
              status,
              isLive,
              homeScore,
              awayScore,
              periodInfo,
              gameSlug,
              true,
            ],
          );
          matchId = result.insertId;
        }

        // 6. Upsert Odds
        const eventOdds = oddsData.find((o) => o.id === event.id);
        if (
          eventOdds &&
          eventOdds.bookmakers &&
          eventOdds.bookmakers.length > 0
        ) {
          // Use the first bookmaker for now (or average them)
          const bookmaker = eventOdds.bookmakers[0];
          const market = bookmaker.markets.find((m) => m.key === "h2h");

          if (market) {
            for (const outcome of market.outcomes) {
              const outcomeName = outcome.name === event.home_team ? "1" : "2"; // Simplified for 1x2

              const [existingOdd]: any = await db.query(
                "SELECT id FROM match_odds WHERE match_id = ? AND outcome_name = ?",
                [matchId, outcomeName],
              );

              if (existingOdd.length > 0) {
                await db.query(
                  "UPDATE match_odds SET odds_value = ?, market_name = ? WHERE id = ?",
                  [outcome.price, "Moneyline", existingOdd[0].id],
                );
              } else {
                await db.query(
                  "INSERT INTO match_odds (match_id, market_name, outcome_name, odds_value) VALUES (?, ?, ?, ?)",
                  [matchId, "Moneyline", outcomeName, outcome.price],
                );
              }
            }
          }
        }
      } catch (err) {
        console.error(`❌ Failed to sync game ${event.id}:`, err);
      }
    }

    console.log("🎉 NBA (The Odds API) Sync completed successfully!");
  } catch (error) {
    console.error("❌ NBA Sync Error:", error);
  } finally {
    if (require.main === module) {
      process.exit();
    }
  }
}

if (require.main === module) {
  syncNBA_Odds();
}

export default syncNBA_Odds;
