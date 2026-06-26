import mysql from 'mysql2/promise';

async function seed() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bc_game_auth'
  });

  console.log('Seeding match_events, sport_bet_orders and details...');

  const [leagues] = await conn.query('SELECT id FROM leagues LIMIT 5');
  const [teams] = await conn.query('SELECT id FROM teams LIMIT 10');
  
  const leagueIds = (leagues as any[]).map(l => l.id);
  const teamIds = (teams as any[]).map(t => t.id);

  if (leagueIds.length === 0 || teamIds.length < 2) {
    console.log('Not enough leagues or teams to seed matches');
    await conn.end();
    return;
  }

  // Create some match events
  const matchIds = [];
  for (let i = 0; i < 10; i++) {
    const homeId = teamIds[i % teamIds.length];
    let awayId = teamIds[(i + 1) % teamIds.length];
    const leagueId = leagueIds[i % leagueIds.length];
    const slug = `match-seed-${Date.now()}-${i}`;
    
    const [res] = await conn.query(
      'INSERT INTO match_events (league_id, home_team_id, away_team_id, start_time, status, slug) VALUES (?, ?, ?, ?, ?, ?)',
      [leagueId, homeId, awayId, new Date(), 'finished', slug]
    );
    matchIds.push((res as any).insertId);
  }

  const [users] = await conn.query('SELECT id FROM users WHERE role != "admin" LIMIT 10');
  const userIds = (users as any[]).map(u => u.id);

  if (userIds.length === 0) {
    console.log('No users found to seed sport bets');
    await conn.end();
    return;
  }

  const markets = ['Match Winner', 'Total Goals', 'Handicap', 'First Goal'];

  for (let i = 0; i < 50; i++) {
    const userId = userIds[Math.floor(Math.random() * userIds.length)];
    const folderCount = Math.floor(Math.random() * 3) + 1;
    const betMoney = Math.floor(Math.random() * 100000) + 10000;
    const totalOdds = parseFloat((Math.random() * 4 + 1.5).toFixed(2));
    const expectWinMoney = betMoney * totalOdds;
    const betStatus = Math.random() > 0.5 ? 'win' : 'lose';
    const winMoney = betStatus === 'win' ? expectWinMoney : 0;
    const betTime = new Date();
    betTime.setDate(betTime.getDate() - Math.floor(Math.random() * 30));

    const [orderResult] = await conn.query(
      'INSERT INTO sport_bet_orders (user_id, bet_status, folder_count, total_odds, bet_money, expect_win_money, win_money, bet_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [userId, betStatus, folderCount, totalOdds, betMoney, expectWinMoney, winMoney, betTime]
    );
    const orderId = (orderResult as any).insertId;

    for (let j = 0; j < folderCount; j++) {
      const matchId = matchIds[Math.floor(Math.random() * matchIds.length)];
      const market = markets[Math.floor(Math.random() * markets.length)];
      const odds = parseFloat((Math.random() * 2 + 1.2).toFixed(2));
      const gameResult = betStatus === 'win' ? 'win' : 'lose';

      await conn.query(
        'INSERT INTO sport_bet_details (order_id, match_id, market_name, selection, odds, game_result) VALUES (?, ?, ?, ?, ?, ?)',
        [orderId, matchId, market, 'Home', odds, gameResult]
      );
    }
  }

  console.log('Seeded 50 sport bet orders with details');
  await conn.end();
}

seed().catch(console.error);
