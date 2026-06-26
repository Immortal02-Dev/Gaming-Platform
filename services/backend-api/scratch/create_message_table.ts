import db from "../config/db";

async function createMessageTable() {
  try {
    console.log('Creating messages table...');
    await db.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sender_id INT DEFAULT NULL,
        sender_type VARCHAR(20) DEFAULT 'admin',
        receiver_id INT NOT NULL,
        subject VARCHAR(255) NOT NULL,
        content LONGTEXT NOT NULL,
        is_read TINYINT(1) DEFAULT 0,
        read_at TIMESTAMP NULL DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX (receiver_id),
        INDEX (sender_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    `);
    console.log('Messages table created successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error creating messages table:', error);
    process.exit(1);
  }
}

createMessageTable();
