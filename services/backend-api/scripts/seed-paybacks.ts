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

    console.log('Seeding payback requests...');

    const [users] = await connection.query('SELECT id FROM users LIMIT 10') as any[];
    
    if (users.length === 0) {
        console.log('No users found to seed paybacks for.');
        await connection.end();
        return;
    }

    const values = [];
    const statuses = [1, 2, 3, 4]; // 1: Requested, 2: Pending, 3: Approved, 4: Cancelled
    
    for (let i = 0; i < 30; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const amount = (Math.floor(Math.random() * 50) + 1) * 1000;
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const type = Math.floor(Math.random() * 3) + 1;
        const applyDate = new Date();
        applyDate.setDate(applyDate.getDate() - Math.floor(Math.random() * 10));

        values.push([
            user.id,
            type,
            amount,
            10.00, // 10%
            status,
            amount * 10, // total_betting
            amount * 2,  // total_win
            50000,       // charge
            10000,       // exchange
            5000,        // balance
            applyDate.toISOString().split('T')[0],
            applyDate.toISOString().split('T')[0]
        ]);
    }

    const query = 'INSERT INTO payback_requests (user_id, type, amount, percent, status, total_betting_amount, total_win_amount, charge_amount, exchange_amount, balance_amount, apply_date, request_available_date) VALUES ?';
    await connection.query(query, [values]);

    console.log(`Seeded ${values.length} payback records.`);
    await connection.end();
}

seed().catch(console.error);
