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

    console.log('Seeding IP blacklist...');

    const values = [
        ['1.2.3.4', 'Frequent failed login attempts', new Date().toISOString().slice(0, 19).replace('T', ' '), new Date(Date.now() + 86400000 * 30).toISOString().slice(0, 19).replace('T', ' ')],
        ['5.6.7.8', 'Suspicious betting patterns', new Date().toISOString().slice(0, 19).replace('T', ' '), null],
        ['11.22.33.44', 'VPN/Proxy usage detected', new Date().toISOString().slice(0, 19).replace('T', ' '), new Date(Date.now() + 86400000 * 7).toISOString().slice(0, 19).replace('T', ' ')],
        ['192.168.1.100', 'Internal security test', new Date().toISOString().slice(0, 19).replace('T', ' '), null]
    ];

    const query = 'INSERT INTO ip_blacklist (ip_address, reason, blocked_at, expires_at) VALUES ?';
    await connection.query(query, [values]);

    console.log(`Seeded ${values.length} IP blacklist records.`);
    await connection.end();
}

seed().catch(console.error);
