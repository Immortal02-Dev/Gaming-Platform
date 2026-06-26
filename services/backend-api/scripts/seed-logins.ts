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

    console.log('Seeding login history...');

    const [users] = await connection.query('SELECT id FROM users LIMIT 10') as any[];
    
    if (users.length === 0) {
        console.log('No users found to seed logins for.');
        await connection.end();
        return;
    }

    const values = [];
    const ips = ['192.168.1.10', '192.168.1.55', '10.0.0.4', '172.16.0.22', '8.8.8.8'];
    const devices = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/123.0.0.0 Safari/537.36',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/122.0.0.0 Safari/537.36'
    ];

    for (const user of users) {
        for (let i = 0; i < 5; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            values.push([
                user.id,
                ips[Math.floor(Math.random() * ips.length)],
                devices[Math.floor(Math.random() * devices.length)],
                date.toISOString().slice(0, 19).replace('T', ' ')
            ]);
        }
    }

    const query = 'INSERT INTO user_login_history (user_id, ip_address, device_info, created_at) VALUES ?';
    await connection.query(query, [values]);

    console.log(`Seeded ${values.length} login history records.`);
    await connection.end();
}

seed().catch(console.error);
