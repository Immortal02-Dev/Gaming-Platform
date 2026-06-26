const fs = require('fs');
const sql = fs.readFileSync('database/bc_game_auth.sql', 'utf8');
const regex = /CREATE TABLE `([^`]+)`/g;
let match;
const tables = [];
while ((match = regex.exec(sql)) !== null) {
  tables.push(match[1]);
}
console.log(tables.join(', '));
