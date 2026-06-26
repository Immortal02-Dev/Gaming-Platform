import mysql from 'mysql2/promise';

async function seed() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bc_game_auth'
  });

  console.log('Seeding board_bet_orders...');

  const [users] = await conn.query('SELECT id FROM users WHERE role != "admin" LIMIT 10');
  const userIds = (users as any[]).map(u => u.id);

  if (userIds.length === 0) {
    console.log('No users found');
    await conn.end();
    return;
  }

  const providers = ['Holdem', 'Poker', 'Baccarat'];
  const games = ['Texas Holdem', 'Omaha', 'Seven Stud', 'Baccarat Classic'];

  for (let i = 0; i < 50; i++) {
    const userId = userIds[Math.floor(Math.random() * userIds.length)];
    const betMoney = Math.floor(Math.random() * 100000) + 1000;
    const winMoney = Math.random() > 0.7 ? betMoney * 2 : 0;
    const gameTime = new Date();
    gameTime.setDate(gameTime.getDate() - Math.floor(Math.random() * 30));
    const transId = `BOARD-${Date.now()}-${i}`;

    await conn.query(
      'INSERT INTO board_bet_orders (transaction_id, user_id, api_provider, game_type_idx, game_name, round_id, bet_money, win_money, bet_status, game_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [transId, userId, providers[i % providers.length], 1, games[i % games.length], `ROUND-${i}`, betMoney, winMoney, 1, gameTime]
    );
  }

  console.log('Seeded 50 board bet orders');
  await conn.end();
}

seed().catch(console.error);
