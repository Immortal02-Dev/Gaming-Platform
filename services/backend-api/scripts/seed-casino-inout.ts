import mysql from 'mysql2/promise';

async function seed() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bc_game_auth'
  });

  console.log('Seeding casino_transfers...');

  const [users] = await conn.query('SELECT id FROM users WHERE role != \"admin\" LIMIT 10');
  const userIds = (users as any[]).map(u => u.id);

  if (userIds.length === 0) {
    console.log('No users found to seed casino transfers');
    await conn.end();
    return;
  }

  const providers = ['Evolution', 'Pragmatic Play', 'Habanero', 'AE Casino', 'Microgaming'];
  const types = ['deposit', 'withdraw', 'depositHoldem', 'withdrawHoldem'];

  const values = [];
  for (let i = 0; i < 50; i++) {
    const userId = userIds[Math.floor(Math.random() * userIds.length)];
    const exchangeType = types[Math.floor(Math.random() * types.length)];
    const amount = Math.floor(Math.random() * 100000) + 1000;
    const beforeAmount = Math.floor(Math.random() * 500000) + 100000;
    const afterAmount = exchangeType.startsWith('deposit') ? beforeAmount - amount : beforeAmount + amount;
    const provider = providers[Math.floor(Math.random() * providers.length)];
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 30));

    values.push([
      userId,
      1, // admin handler
      provider,
      exchangeType,
      amount,
      beforeAmount,
      afterAmount,
      3, // approved
      createdAt
    ]);
  }

  await conn.query(
    'INSERT INTO casino_transfers (user_id, handler_id, api_provider, exchange_type, amount, before_amount, after_amount, status_idx, created_at) VALUES ?',
    [values]
  );

  console.log('Seeded 50 casino transfer records');
  await conn.end();
}

seed().catch(console.error);
