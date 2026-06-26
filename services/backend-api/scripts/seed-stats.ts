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

    console.log('Seeding partner statistics...');

    // 1. Mark users as agents
    await connection.query('UPDATE users SET is_agent = 1 WHERE id IN (2, 3, 4)');
    console.log('Users 2, 3, 4 marked as agents.');

    // 2. Clear existing statistics to avoid duplicates
    await connection.query('DELETE FROM partner_statistics');

    const partnerIds = [2, 3, 4];
    const gameTypeIds = [1, 2, 3, 4, 5]; // casino, slot, board, mini, sports
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().split('T')[0]);
    }
    // Add March 2025 dates which the UI seems to be requesting
    for (let i = 1; i <= 10; i++) {
        dates.push(`2025-03-${i < 10 ? '0' + i : i}`);
    }

    const values = [];
    for (const partnerId of partnerIds) {
        for (const date of dates) {
            for (const gameTypeId of gameTypeIds) {
                const userDeposit = Math.random() * 10000;
                const userWithdrawal = Math.random() * 5000;
                const totalBet = Math.random() * 50000;
                const totalWin = totalBet * (0.9 + Math.random() * 0.15); // Roughly 90-105% RTP
                
                values.push([
                    partnerId,
                    date,
                    gameTypeId,
                    100000 + Math.random() * 10000, // site_balance
                    userDeposit,
                    userWithdrawal,
                    userDeposit - userWithdrawal, // user_profit
                    totalBet,
                    totalWin,
                    totalBet - totalWin, // betting_profit
                    totalBet * 0.01 // rolling
                ]);
            }
        }
    }

    const query = `
        INSERT INTO partner_statistics 
        (partner_id, stat_date, game_type_id, site_balance, user_deposit, user_withdrawal, user_profit, total_bet_amount, total_win_amount, betting_profit, rolling) 
        VALUES ?
    `;

    await connection.query(query, [values]);

    console.log(`Seeded ${values.length} statistical records.`);
    await connection.end();
}

seed().catch(console.error);
