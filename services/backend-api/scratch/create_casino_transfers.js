const mysql = require('mysql2/promise');
async function test() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bc_game_auth'
  });
  
  const sql = `
    CREATE TABLE IF NOT EXISTS casino_transfers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      handler_id INT,
      api_provider VARCHAR(50) DEFAULT '알',
      exchange_type ENUM('deposit', 'withdraw', 'depositHoldem', 'withdrawHoldem') NOT NULL,
      amount DECIMAL(20, 8) NOT NULL,
      before_amount DECIMAL(20, 8) NOT NULL,
      after_amount DECIMAL(20, 8) NOT NULL,
      status_idx INT DEFAULT 3,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;
  
  await conn.query(sql);
  console.log('casino_transfers table created');
  await conn.end();
}
test();
