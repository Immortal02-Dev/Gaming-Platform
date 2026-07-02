const fs = require('fs');

function fixPage(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');

  // 1. Fix thead placement
  const tbodyRegex = /<tbody>[\s\S]*?<\/tbody>/;
  const theadRegex = /\{\/\*\s*Table Header\s*\*\/\}\s*<thead[\s\S]*?<\/thead>/;

  const tbodyMatch = content.match(tbodyRegex);
  const theadMatch = content.match(theadRegex);

  if (tbodyMatch && theadMatch) {
    let tbodyStr = tbodyMatch[0];
    let theadStr = theadMatch[0];
    content = content.replace(theadStr, '');
    content = content.replace(tbodyStr, theadStr + '\n            ' + tbodyStr);
  }

  // 2. Fix total calculation with proper types
  const targetRegex = /\/\/ Ensure all dates have at least a total entry[\s\S]*?\}\);/;
  const goodTotalCode = `  // Ensure all dates have at least a total entry (calculate sum)
  Object.values(groupedByDate).forEach((group) => {
    if (!group.total && group.gameTypes.length > 0) {
      const baseStat = group.gameTypes[0];
      const totalStat = { ...baseStat, game_type_id: null, game_type_code: null, game_type_name: null };
      
      const sumFields = [
        'site_balance', 'casino_balance', 'holdem_balance', 'mini_balance', 'total_points',
        'user_deposit', 'user_withdrawal', 'user_profit', 'partner_deposit', 'partner_deposit_received',
        'partner_withdrawal', 'partner_withdrawal_received', 'partner_profit', 'admin_deposit',
        'admin_withdrawal', 'total_bet_amount', 'invalid_bet_amount', 'public_bet_amount',
        'total_win_amount', 'betting_profit', 'rolling', 'member_comp', 'first_deposit_bonus',
        'regular_deposit_bonus', 'final_profit', 'losing_amount', 'money_deposit', 'money_withdrawal',
        'point_deposit', 'point_withdrawal'
      ];
      
      sumFields.forEach(field => {
        totalStat[field as keyof DateStatistics] = group.gameTypes.reduce((sum, stat) => sum + Number(stat[field as keyof DateStatistics] || 0), 0) as never;
      });
      group.total = totalStat;
    }
  });`;
  content = content.replace(targetRegex, goodTotalCode);

  // 3. Add getAuthHeaders and redirectToLogin if they don't exist
  const authRegex = /const startDateRef = useRef<HTMLInputElement>\(null\);\s*const endDateRef = useRef<HTMLInputElement>\(null\);/;
  const authInjection = `const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const getAuthHeaders = React.useCallback((): HeadersInit => {
    if (typeof window === "undefined") return {};

    const token = localStorage.getItem("adminToken");
    return token ? { Authorization: \`Bearer \${token}\` } : {};
  }, []);

  const redirectToLogin = React.useCallback(() => {
    window.location.href = "/login";
  }, []);`;
  if(!content.includes("getAuthHeaders")) {
     content = content.replace(authRegex, authInjection);
  }

  // 4. Rewrite fetch calls and useEffects completely to fix TDZ and dependencies
  const hooksRegex = /\/\/ Fetch game types on mount[\s\S]*?setLoading\(false\);\n    \}\n  \};/m;
  const newHooksCode = `  const fetchGameTypes = React.useCallback(async () => {
    try {
      const response = await fetch(
        \`\${BACKEND_URL}/api/admin/statistics/game-types\`,
        {
          credentials: "include",
          headers: getAuthHeaders(),
        }
      );
      if (response.status === 401) {
        redirectToLogin();
        return;
      }
      
      const data = await response.json();
      if (data.success) {
        setGameTypes(data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch game types:", err);
    }
  }, [getAuthHeaders, redirectToLogin]);

  const fetchStatistics = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        startDate,
        endDate,
      });

      if (userIdx) {
        params.append("partnerId", userIdx);
      }

      if (gameGroupIdx) {
        params.append("gameTypeId", gameGroupIdx);
      }

      const response = await fetch(
        \`\${BACKEND_URL}/api/admin/statistics/date?\${params}\`,
        {
          credentials: "include",
          headers: getAuthHeaders(),
        }
      );

      if (response.status === 401) {
        redirectToLogin();
        return;
      }
      
      const data = await response.json();

      if (data.success) {
        setStatistics(data.data || []);
      } else {
        setError(data.error || "Failed to fetch statistics");
      }
    } catch (err: unknown) {
      console.error("Failed to fetch statistics:", err);
      const error = err as Error;
      setError(error.message || "Network error");
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate, userIdx, gameGroupIdx, getAuthHeaders, redirectToLogin]);

  // Fetch game types on mount
  useEffect(() => {
    fetchGameTypes();
  }, [fetchGameTypes]);

  // Fetch statistics when dates change
  useEffect(() => {
    if (startDate && endDate) {
      fetchStatistics();
    }
  }, [startDate, endDate, fetchStatistics]);`;
  content = content.replace(hooksRegex, newHooksCode);

  // 5. Fix unused variables
  content = content.replace(/const \[child, setChild\] = useState\(""\);/, '// const [child, setChild] = useState("");');
  
  // Safely comment out the entire sortedGameTypes block
  const sortedRegex = /const sortedGameTypes = \[\.\.\.gameTypes\]\.sort\(\(a, b\) => \{[\s\S]*?\}\);/m;
  content = content.replace(sortedRegex, '/* $& */');
  
  content = content.replace(/dateList\.map\(\(group, dateIndex\)/, 'dateList.map((group)');

  fs.writeFileSync(filepath, content);
  console.log('Fixed', filepath);
}

fixPage('app/admin-panel/app/statistics/date/list/page.tsx');
