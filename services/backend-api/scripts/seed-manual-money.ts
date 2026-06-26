import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

async function seed() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'bc_game_auth',
    });

    console.log('Seeding manual money adjustments...');

    const [users] = await connection.query('SELECT id, role FROM users LIMIT 20') as any[];
    
    if (users.length === 0) {
        console.log('No users found to seed adjustments for.');
        await connection.end();
        return;
    }

    const values = [];
    
    for (let i = 0; i < 40; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const amount = (Math.floor(Math.random() * 20) + 1) * 5000 * (Math.random() > 0.5 ? 1 : -1);
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 10));

        values.push([
            user.id,
            'admin_adjustment',
            'KRW',
            amount,
            1000000 + amount,
            'completed',
            'manual_' + Math.random().toString(36).substring(7),
            date.toISOString().slice(0, 19).replace('T', ' ')
        ]);
    }

    const query = 'INSERT INTO wallet_transactions (user_id, type, currency, amount, balance_after, status, tx_hash, created_at) VALUES ?';
    await connection.query(query, [values]);

    console.log(`Seeded ${values.length} manual adjustment records.`);
    await connection.end();
}

seed().catch(console.error);
