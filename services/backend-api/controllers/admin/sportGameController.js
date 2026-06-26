const db = require("../../config/db");

const MATCH_STATUS_DISPLAY = {
  upcoming: "예정",
  live: "진행중",
  finished: "종료",
  cancelled: "취소",
};

const BETTING_STATUS_DISPLAY = {
  available: "베팅가능",
  closed: "베팅마감",
  suspended: "이용중지",
};

const TYPE_FLAG_DISPLAY = {
  1: "프리매치",
  2: "라이브",
};

/**
 * GET /api/admin/sport-games
 * List sport match events with full admin metadata
 */
exports.getSportGames = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 50,
      startDate,
      endDate,
      sportIdx,
      regionIdx,
      searchType,
      searchText,
      prematchliveType, // "1"=prematch, "2"=live
      gameStatus, // "1"=진행중, "2"=베팅마감, "3"=경기종료, "4"=취소, "0"=베팅된것만
    } = req.query;

    const limit = parseInt(pageSize, 10) || 50;
    const pageNum = parseInt(page, 10) || 1;
    const offset = Math.max(0, (pageNum - 1) * limit);

    let whereClause = "WHERE 1=1";
    const params = [];

    // Date range on start_time
    if (startDate && startDate.trim() !== "") {
      whereClause += " AND DATE(me.start_time) >= ?";
      params.push(startDate);
    }
    if (endDate && endDate.trim() !== "") {
      whereClause += " AND DATE(me.start_time) <= ?";
      params.push(endDate);
    }

    // Sport filter (by sport id via league)
    if (sportIdx && sportIdx !== "") {
      whereClause += " AND l.sport_id = ?";
      params.push(parseInt(sportIdx, 10));
    }

    // Region filter (via league.region mapped to id — store region as league's region column)
    // Since our schema stores region as text not id, skip for now unless regionIdx matches league id range
    if (regionIdx && regionIdx !== "") {
      whereClause += " AND l.id = ?";
      params.push(parseInt(regionIdx, 10));
    }

    // Prematch/Live type
    if (prematchliveType && prematchliveType !== "") {
      whereClause += " AND me.type_flag = ?";
      params.push(parseInt(prematchliveType, 10));
    }

    // Game status filter
    if (gameStatus && gameStatus !== "") {
      if (gameStatus === "1") {
        // 진행중 = upcoming or live
        whereClause += " AND me.status IN ('upcoming', 'live')";
      } else if (gameStatus === "2") {
        // 베팅마감
        whereClause += " AND me.betting_status = 'closed'";
      } else if (gameStatus === "3") {
        // 경기종료
        whereClause += " AND me.status = 'finished'";
      } else if (gameStatus === "4") {
        // 취소
        whereClause += " AND me.status = 'cancelled'";
      } else if (gameStatus === "0") {
        // 베팅된것만
        whereClause +=
          " AND me.id IN (SELECT DISTINCT match_id FROM match_odds)";
      }
    }

    // Text search
    if (searchType && searchText && searchText.trim() !== "") {
      if (searchType === "matchId") {
        whereClause += " AND me.id = ?";
        params.push(parseInt(searchText, 10));
      } else if (searchType === "league") {
        whereClause += " AND l.name LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "team") {
        whereClause += " AND (ht.name LIKE ? OR at.name LIKE ?)";
        params.push(`%${searchText}%`, `%${searchText}%`);
      }
    }

    const query = `
      SELECT
        me.id,
        me.slug AS matchId,
        s.id AS sportIdx,
        s.name AS sportName,
        s.icon_svg AS sportImage,
        l.id AS regionIdx,
        l.region AS regionName,
        l.logo AS regionImage,
        l.name AS leagueName,
        ht.name AS teamHome,
        ht.logo AS teamHomeImage,
        at.name AS teamAway,
        at.logo AS teamAwayImage,
        me.start_time AS gameStartTime,
        me.status AS matchStatus,
        me.betting_status AS bettingStatus,
        me.admin_is_suspended AS adminIsSuspended,
        me.admin_status AS adminStatus,
        me.wait_live AS waitLive,
        me.type_flag AS typeFlag,
        me.home_score AS scoreHome,
        me.away_score AS scoreAway,
        me.updated_at AS updatedAt,
        (SELECT COUNT(*) FROM match_odds mo WHERE mo.match_id = me.id) AS totalBetCount,
        0 AS totalBetMoney
      FROM match_events me
      JOIN leagues l ON me.league_id = l.id
      JOIN sports s ON l.sport_id = s.id
      JOIN teams ht ON me.home_team_id = ht.id
      JOIN teams at ON me.away_team_id = at.id
      ${whereClause}
      ORDER BY me.start_time DESC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await db.query(query, [...params, limit, offset]);

    const countQuery = `
      SELECT COUNT(*) AS total
      FROM match_events me
      JOIN leagues l ON me.league_id = l.id
      JOIN sports s ON l.sport_id = s.id
      JOIN teams ht ON me.home_team_id = ht.id
      JOIN teams at ON me.away_team_id = at.id
      ${whereClause}
    `;
    const [countRows] = await db.query(countQuery, params);
    const total = countRows[0].total;

    const data = rows.map((r) => ({
      ...r,
      matchStatusDisplay: MATCH_STATUS_DISPLAY[r.matchStatus] || r.matchStatus,
      bettingStatusDisplay:
        BETTING_STATUS_DISPLAY[r.bettingStatus] || r.bettingStatus,
      typeFlagDisplay: TYPE_FLAG_DISPLAY[r.typeFlag] || "프리매치",
      totalBetCount: Number(r.totalBetCount) || 0,
      totalBetMoney: Number(r.totalBetMoney) || 0,
    }));

    res.status(200).json({
      success: true,
      data: {
        games: data,
        pagination: {
          total,
          page: parseInt(page, 10),
          pageSize: limit,
          totalPages: Math.ceil(total / limit),
          hasMore: offset + limit < total,
        },
      },
    });
  } catch (error) {
    console.error("Error in getSportGames:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * PUT /api/admin/sport-games/:id/admin-status
 * Toggle admin suspension of a match
 */
exports.updateAdminStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminIsSuspended } = req.body;

    const suspended = adminIsSuspended ? 1 : 0;
    const adminStatus = suspended ? "suspended" : "active";
    const bettingStatus = suspended ? "suspended" : "available";

    await db.execute(
      `UPDATE match_events SET admin_is_suspended = ?, admin_status = ?, betting_status = ? WHERE id = ?`,
      [suspended, adminStatus, bettingStatus, id],
    );

    res.status(200).json({
      success: true,
      message: suspended
        ? "이용중지 처리되었습니다."
        : "이용가능 처리되었습니다.",
    });
  } catch (error) {
    console.error("Error in updateAdminStatus:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/admin/sport-games/:id
 * Get sport match detail and its markets for admin view
 */
exports.getSportGameDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const matchId = parseInt(id, 10);

    const [rows] = await db.execute(
      `SELECT
        me.id,
        me.slug AS matchId,
        s.id AS sportIdx,
        s.name AS sportName,
        s.icon_svg AS sportImage,
        l.id AS regionIdx,
        l.region AS regionName,
        l.logo AS regionImage,
        l.name AS leagueName,
        ht.name AS teamHome,
        ht.logo AS teamHomeImage,
        at.name AS teamAway,
        at.logo AS teamAwayImage,
        me.start_time AS gameStartTime,
        me.status AS matchStatus,
        me.betting_status AS bettingStatus,
        me.admin_is_suspended AS adminIsSuspended,
        me.admin_status AS adminStatus,
        me.wait_live AS waitLive,
        me.type_flag AS typeFlag,
        me.home_score AS scoreHome,
        me.away_score AS scoreAway,
        me.updated_at AS updatedAt
      FROM match_events me
      JOIN leagues l ON me.league_id = l.id
      JOIN sports s ON l.sport_id = s.id
      JOIN teams ht ON me.home_team_id = ht.id
      JOIN teams at ON me.away_team_id = at.id
      WHERE me.id = ?`,
      [matchId],
    );

    if (!rows.length) {
      return res
        .status(404)
        .json({ success: false, message: "Match not found." });
    }

    const game = rows[0];
    const [marketRows] = await db.execute(
      `SELECT id, market_name, outcome_name, odds_value
       FROM match_odds
       WHERE match_id = ?
       ORDER BY id ASC`,
      [matchId],
    );

    const markets = marketRows.map((row) => ({
      id: row.id,
      marketType: row.market_name || "기본",
      marketName: row.market_name || "기본",
      selection: row.outcome_name,
      odds: Number(row.odds_value),
      isActive: 1,
    }));

    res.status(200).json({
      success: true,
      data: {
        game: {
          ...game,
          matchStatusDisplay:
            MATCH_STATUS_DISPLAY[game.matchStatus] || game.matchStatus,
          bettingStatusDisplay:
            BETTING_STATUS_DISPLAY[game.bettingStatus] || game.bettingStatus,
        },
        markets,
      },
    });
  } catch (error) {
    console.error("Error in getSportGameDetail:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * PUT /api/admin/sport-games/:id/wait-live
 * Toggle wait-live flag
 */
exports.updateWaitLive = async (req, res) => {
  try {
    const { id } = req.params;
    const { waitLive } = req.body;

    await db.execute(`UPDATE match_events SET wait_live = ? WHERE id = ?`, [
      waitLive ? 1 : 0,
      id,
    ]);

    res
      .status(200)
      .json({ success: true, message: "라이브 대기 상태가 변경되었습니다." });
  } catch (error) {
    console.error("Error in updateWaitLive:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * PUT /api/admin/sport-games/:id/cancel
 * Cancel a match
 */
exports.cancelSportGame = async (req, res) => {
  try {
    const { id } = req.params;

    await db.execute(
      `UPDATE match_events SET status = 'cancelled', betting_status = 'closed' WHERE id = ?`,
      [id],
    );

    res
      .status(200)
      .json({ success: true, message: "경기가 취소 처리되었습니다." });
  } catch (error) {
    console.error("Error in cancelSportGame:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
