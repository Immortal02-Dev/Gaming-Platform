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

    console.log('Seeding money logs...');

    const [users] = await connection.query('SELECT id FROM users LIMIT 10') as any[];
    
    if (users.length === 0) {
        console.log('No users found to seed money logs for.');
        await connection.end();
        return;
    }

    const values = [];
    const groups = [1, 2, 3, 4, 5, 6, 7, 8, 13];
    const typesByGroup: Record<number, number[]> = {
        1: [1, 2],
        2: [3, 4],
        3: [5, 34],
        4: [6, 7, 35, 36],
        5: [8, 9, 39, 40],
        6: [10, 11],
        7: [12, 37],
        8: [13, 14],
        13: [41]
    };
    
    for (let i = 0; i < 50; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const groupIdx = groups[Math.floor(Math.random() * groups.length)];
        const typeIdx = typesByGroup[groupIdx][Math.floor(Math.random() * typesByGroup[groupIdx].length)];
        const amount = (Math.floor(Math.random() * 200) + 1) * 1000;
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 20));

        values.push([
            user.id,
            groupIdx,
            typeIdx,
            amount,
            1000000,
            1000000 + amount,
            `Seed money log for ${typeIdx}`,
            date.toISOString().slice(0, 19).replace('T', ' ')
        ]);
    }

    const query = 'INSERT INTO money_logs (user_id, group_idx, type_idx, amount, before_amount, after_amount, memo, created_at) VALUES ?';
    await connection.query(query, [values]);

    console.log(`Seeded ${values.length} money log records.`);
    await connection.end();
}

seed().catch(console.error);
