const fs = require('fs');
const file = 'd:/Projets/gaming-platform/app/admin-panel/app/site/setting/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace button id="settingKey-0" and id="settingKey-1" with id="settingKey_0" / id="settingKey_1"
// Pattern: id="<camelCaseKey>-<digit>"
// We only want to replace ids on <button> elements that use handleToggle
// Match: id="...-0" or id="...-1" followed by onClick={handleToggle}
let count = 0;
content = content.replace(
  /id="([A-Za-z][A-Za-z0-9]*)-([0-9]+)"(\s[^>]*onClick=\{handleToggle\})/g,
  (match, key, val, rest) => {
    count++;
    return `id="${key}_${val}"${rest}`;
  }
);

// Also handle the case where onClick comes before id (or className is between)
content = content.replace(
  /(onClick=\{handleToggle\}[^>]*?)id="([A-Za-z][A-Za-z0-9]*)-([0-9]+)"/g,
  (match, before, key, val) => {
    count++;
    return `${before}id="${key}_${val}"`;
  }
);

fs.writeFileSync(file, content);
console.log(`Done! Replaced ${count} button ids.`);
