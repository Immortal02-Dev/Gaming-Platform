const fs = require('fs');
const path = require('path');

const dir = 'd:/Projets/gaming-platform/app/admin-panel/app/user/user/detail/components';
const files = ['TabBettingLog.tsx', 'TabChangeLog.tsx', 'TabChargeExchange.tsx'];

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const targetRegex = /useEffect\(\(\) => \{\s*fetchLogs\(\);\s*\}, \[fetchLogs\]\);/g;
  
  const replacement = `useEffect(() => {
        setTimeout(() => {
            fetchLogs();
        }, 0);
    }, [fetchLogs]);`;

  if (targetRegex.test(content)) {
    content = content.replace(targetRegex, replacement);
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  } else {
    console.log(`Pattern not found in ${file}`);
  }
});
