const fs = require('fs');
const sql = fs.readFileSync('database/bc_game_auth.sql', 'utf8');
const idx = sql.indexOf('CREATE TABLE `users`');
console.log(sql.substring(idx, idx+500));
