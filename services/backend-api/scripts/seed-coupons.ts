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

    console.log('Seeding coupons...');

    const [users] = await connection.query('SELECT id FROM users LIMIT 10') as any[];
    
    if (users.length === 0) {
        console.log('No users found to seed coupons for.');
        await connection.end();
        return;
    }

    const values = [];
    const subjects = ['Welcome Bonus', 'Loyalty Reward', 'Daily Spin Prize', 'Referral Bonus', 'Special Event Coupon'];
    
    for (let i = 0; i < 20; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const amount = Math.floor(Math.random() * 100) + 10;
        const status = Math.random() > 0.5 ? 1 : 0; // 1 = used, 0 = unused
        const regDate = new Date();
        regDate.setDate(regDate.getDate() - Math.floor(Math.random() * 10));
        const useDate = status === 1 ? new Date(regDate.getTime() + 86400000).toISOString().slice(0, 19).replace('T', ' ') : null;
        const expireDate = new Date(regDate.getTime() + 86400000 * 30).toISOString().split('T')[0];

        values.push([
            user.id,
            subjects[Math.floor(Math.random() * subjects.length)],
            amount,
            status,
            2, // register_id (admin)
            regDate.toISOString().slice(0, 19).replace('T', ' '),
            useDate,
            expireDate
        ]);
    }

    const query = 'INSERT INTO coupons (receiver_id, subject, amount, status, register_id, register_date, use_date, expire_date) VALUES ?';
    await connection.query(query, [values]);

    console.log(`Seeded ${values.length} coupon records.`);
    await connection.end();
}

seed().catch(console.error);
