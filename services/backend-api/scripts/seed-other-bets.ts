import mysql from 'mysql2/promise';

async function seed() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bc_game_auth'
  });

  const [users] = await conn.query('SELECT id FROM users WHERE role != "admin" LIMIT 10');
  const userIds = (users as any[]).map(u => u.id);

  if (userIds.length === 0) return;

  const tables = ['slot_bet_orders', 'board_bet_orders'];
  
  for (const table of tables) {
    console.log("Seeding " + table + "...");
    const values = [];
    for (let i = 0; i < 50; i++) {
      const userId = userIds[Math.floor(Math.random() * userIds.length)];
      const betMoney = Math.floor(Math.random() * 50000) + 1000;
      const winMoney = Math.random() > 0.8 ? betMoney * 5 : 0;
      const betStatus = winMoney > 0 ? 1 : 2;
      const betTime = new Date();
      betTime.setDate(betTime.getDate() - Math.floor(Math.random() * 30));

      values.push([
        userId,
        "TXN-" + table.split('_')[0].toUpperCase() + "-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        'Provider X',
        'Vendor Y',
        table.startsWith('slot') ? 'Slot Game' : 'Board Game',
        'Table A',
        betMoney + 50000,
        betMoney,
        50000,
        50000,
        winMoney,
        50000 + winMoney,
        betStatus,
        'Note',
        betTime,
        betTime
      ]);
    }

    await conn.query(
      "INSERT INTO " + table + " (user_id, transaction_id, api_provider, vendor_name, game_type, table_name, before_bet_money, bet_money, after_bet_money, before_win_money, win_money, after_win_money, bet_status, note, bet_time, result_time) VALUES ?",
      [values]
    );
    console.log("Seeded 50 " + table + " records");
  }

  await conn.end();
}

seed().catch(console.error);
