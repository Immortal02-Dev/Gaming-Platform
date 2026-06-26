import mysql from 'mysql2/promise';

async function seed() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bc_game_auth'
  });

  console.log('Seeding casino_bet_orders...');

  const [users] = await conn.query('SELECT id FROM users WHERE role != \"admin\" LIMIT 10');
  const userIds = (users as any[]).map(u => u.id);

  if (userIds.length === 0) {
    console.log('No users found to seed casino bets');
    await conn.end();
    return;
  }

  const providers = ['Evolution', 'Pragmatic Play', 'Habanero'];
  const games = ['Baccarat', 'Blackjack', 'Roulette', 'Crazy Time', 'Mega Ball'];

  const values = [];
  for (let i = 0; i < 50; i++) {
    const userId = userIds[Math.floor(Math.random() * userIds.length)];
    const betMoney = Math.floor(Math.random() * 50000) + 1000;
    const winMoney = Math.random() > 0.6 ? betMoney * 2 : 0;
    const betStatus = winMoney > 0 ? 1 : 2; // 1: Win, 2: Loss
    const betTime = new Date();
    betTime.setDate(betTime.getDate() - Math.floor(Math.random() * 30));

    values.push([
      userId,
      `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      providers[Math.floor(Math.random() * providers.length)],
      'Vendor X',
      games[Math.floor(Math.random() * games.length)],
      'Table 1',
      betMoney + 50000, // before_bet
      betMoney,
      50000, // after_bet
      50000, // before_win
      winMoney,
      50000 + winMoney, // after_win
      betStatus,
      'Note',
      betTime,
      betTime
    ]);
  }

  await conn.query(
    'INSERT INTO casino_bet_orders (user_id, transaction_id, api_provider, vendor_name, game_type, table_name, before_bet_money, bet_money, after_bet_money, before_win_money, win_money, after_win_money, bet_status, note, bet_time, result_time) VALUES ?',
    [values]
  );

  console.log('Seeded 50 casino bet records');
  await conn.end();
}

seed().catch(console.error);
