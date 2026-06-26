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

    console.log('Seeding exchange requests...');

    const [users] = await connection.query('SELECT id FROM users LIMIT 10') as any[];
    
    if (users.length === 0) {
        console.log('No users found to seed exchanges for.');
        await connection.end();
        return;
    }

    const dates = [];
    for (let i = 0; i < 5; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().slice(0, 19).replace('T', ' '));
    }
    // Add March 2025 dates
    for (let i = 1; i <= 5; i++) {
        dates.push(`2025-03-0${i} 14:30:00`);
    }

    const values = [];
    const statuses = ['requested', 'pending', 'approved', 'cancelled'];
    
    for (const date of dates) {
        for (let i = 0; i < 3; i++) {
            const user = users[Math.floor(Math.random() * users.length)];
            const amount = -(Math.floor(Math.random() * 50) + 1) * 10000; // -10k to -500k
            const status = statuses[Math.floor(Math.random() * statuses.length)];

            values.push([
                user.id,
                'withdraw',
                'KRW',
                amount,
                500000 + amount, // balance_after (approx)
                status,
                'tx_ex_' + Math.random().toString(36).substring(7),
                date
            ]);
        }
    }

    const query = 'INSERT INTO wallet_transactions (user_id, type, currency, amount, balance_after, status, tx_hash, created_at) VALUES ?';
    await connection.query(query, [values]);

    console.log(`Seeded ${values.length} exchange records.`);
    await connection.end();
}

seed().catch(console.error);
