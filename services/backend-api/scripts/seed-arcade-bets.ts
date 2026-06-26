import mysql from 'mysql2/promise';

async function seed() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bc_game_auth'
  });

  console.log('Re-seeding arcade data with correct IDs...');

  // 1. Clear existing arcade data
  await conn.query('SET FOREIGN_KEY_CHECKS = 0');
  await conn.query('TRUNCATE arcade_bets');
  await conn.query('TRUNCATE arcade_game_list');
  await conn.query('TRUNCATE arcade_game_types');
  await conn.query('SET FOREIGN_KEY_CHECKS = 1');

  // 2. Seed Arcade Types with specific IDs from frontend
  const types = [
    { id: 4, name: '파워볼(PBG)', slug: 'pbg-powerball', interval: 5 },
    { id: 10, name: 'EOS파워볼5분', slug: 'eos-powerball-5m', interval: 5 },
    { id: 11, name: 'EOS파워볼3분', slug: 'eos-powerball-3m', interval: 3 },
    { id: 12, name: '코인파워볼5분', slug: 'coin-powerball-5m', interval: 5 },
    { id: 13, name: '코인파워볼3분', slug: 'coin-powerball-3m', interval: 3 },
    { id: 14, name: '코인사다리5분', slug: 'coin-ladder-5m', interval: 5 },
    { id: 15, name: '코인사다리3분', slug: 'coin-ladder-3m', interval: 3 }
  ];

  for (const t of types) {
    await conn.query(
      'INSERT INTO arcade_game_types (id, name, slug, interval_minutes) VALUES (?, ?, ?, ?)',
      [t.id, t.name, t.slug, t.interval]
    );
  }

  // 3. Seed Arcade Game List
  const typeIds = types.map(t => t.id);
  const listIds = [];
  for (let i = 0; i < 20; i++) {
    const typeId = typeIds[i % typeIds.length];
    const inning = `20260502-${100 + i}`;
    const gameTime = new Date();
    gameTime.setMinutes(gameTime.getMinutes() - (i * 5));
    
    const [res] = await conn.query(
      'INSERT INTO arcade_game_list (game_type_id, game_inning, game_today_inning, game_arcade_status, game_time, bet_close_time) VALUES (?, ?, ?, ?, ?, ?)',
      [typeId, inning, String(100 + i), 3, gameTime, gameTime]
    );
    listIds.push((res as any).insertId);
  }

  // 4. Seed Arcade Bets
  const [users] = await conn.query('SELECT id FROM users WHERE role != "admin" LIMIT 10');
  const userIds = (users as any[]).map(u => u.id);

  if (userIds.length === 0) {
    console.log('No users found');
    await conn.end();
    return;
  }

  const items = ['홀', '짝', '소', '대', '좌', '우'];

  for (let i = 0; i < 100; i++) {
    const userId = userIds[Math.floor(Math.random() * userIds.length)];
    const listId = listIds[Math.floor(Math.random() * listIds.length)];
    const [listItem] = await conn.query('SELECT game_type_id FROM arcade_game_list WHERE id = ?', [listId]);
    const typeId = (listItem as any[])[0].game_type_id;
    
    const betMoney = Math.floor(Math.random() * 50000) + 1000;
    const odds = 1.95;
    const winMoney = Math.random() > 0.5 ? betMoney * odds : 0;
    const betStatus = winMoney > 0 ? 1 : 2;
    const betTime = new Date();
    betTime.setDate(betTime.getDate() - Math.floor(Math.random() * 30));

    await conn.query(
      'INSERT INTO arcade_bets (game_list_id, game_type_id, user_id, bet_item, odds, before_money, bet_money, after_money, win_before_money, win_money, win_after_money, bet_status, bet_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [listId, typeId, userId, items[Math.floor(Math.random() * items.length)], odds, 100000, betMoney, 100000 - betMoney, 100000 - betMoney, winMoney, 100000 - betMoney + winMoney, betStatus, betTime]
    );
  }

  console.log('Re-seeded 100 arcade bets with correct IDs');
  await conn.end();
}

seed().catch(console.error);
