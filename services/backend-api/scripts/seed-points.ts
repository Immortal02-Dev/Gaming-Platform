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

    console.log('Seeding point logs...');

    const [users] = await connection.query('SELECT id FROM users LIMIT 10') as any[];
    
    if (users.length === 0) {
        console.log('No users found to seed point logs for.');
        await connection.end();
        return;
    }

    const values = [];
    const groups = [9, 10, 11, 12];
    const typesByGroup: Record<number, number[]> = {
        9: [15, 16, 17, 23, 25, 26, 47],
        10: [18, 19, 24, 27, 28, 29, 42, 43, 44, 46],
        11: [20, 21],
        12: [22, 38]
    };
    
    for (let i = 0; i < 50; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const groupIdx = groups[Math.floor(Math.random() * groups.length)];
        const typeIdx = typesByGroup[groupIdx][Math.floor(Math.random() * typesByGroup[groupIdx].length)];
        const amount = (Math.floor(Math.random() * 100) + 1) * 100;
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 20));

        values.push([
            user.id,
            groupIdx,
            typeIdx,
            amount,
            50000,
            50000 + amount,
            `Seed log for ${typeIdx}`,
            date.toISOString().slice(0, 19).replace('T', ' ')
        ]);
    }

    const query = 'INSERT INTO point_logs (user_id, group_idx, type_idx, amount, before_amount, after_amount, memo, created_at) VALUES ?';
    await connection.query(query, [values]);

    console.log(`Seeded ${values.length} point log records.`);
    await connection.end();
}

seed().catch(console.error);
