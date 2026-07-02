const db = require("../../config/db");

// Get available partner statistics date range
exports.getPartnerStatisticsDateRange = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT
        DATE_FORMAT(MIN(stat_date), '%Y-%m-%d') as minDate,
        DATE_FORMAT(MAX(stat_date), '%Y-%m-%d') as maxDate
      FROM partner_statistics
    `);

    res.status(200).json({
      success: true,
      data: rows[0] || { minDate: null, maxDate: null },
    });
  } catch (error) {
    console.error("Failed to fetch partner statistics date range:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getDateStatisticsDateRange = exports.getPartnerStatisticsDateRange;

// Get partner statistics aggregated by date and game type
exports.getPartnerStatistics = async (req, res) => {
  const { startDate, endDate, partnerId, gameTypeId } = req.query;

  try {
    let query = `
      SELECT 
        ps.*,
        u.username,
        u.nickname,
        u.role as partner_type,
        gt.code as game_type_code,
        gt.name_ko as game_type_name
      FROM partner_statistics ps
      JOIN users u ON ps.partner_id = u.id
      LEFT JOIN game_types gt ON ps.game_type_id = gt.id
      WHERE DATE(ps.stat_date) BETWEEN ? AND ?
    `;

    const params = [startDate, endDate];

    if (partnerId) {
      query += " AND ps.partner_id = ?";
      params.push(partnerId);
    }

    if (gameTypeId) {
      query += " AND ps.game_type_id = ?";
      params.push(gameTypeId);
    }

    query += " ORDER BY ps.stat_date DESC, u.username ASC";

    const [rows] = await db.execute(query, params);

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Failed to fetch partner statistics:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all available game types
exports.getGameTypes = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM game_types ORDER BY display_order ASC");
    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Failed to fetch game types:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get statistics aggregated by date and game type
exports.getDateStatistics = async (req, res) => {
  const { startDate, endDate, partnerId, gameTypeId } = req.query;

  try {
    let query = `
      SELECT 
        DATE_FORMAT(ps.stat_date, '%Y-%m-%d') as stat_date,
        ps.game_type_id,
        gt.code as game_type_code,
        gt.name_ko as game_type_name,
        SUM(ps.site_balance) as site_balance,
        SUM(ps.casino_balance) as casino_balance,
        SUM(ps.holdem_balance) as holdem_balance,
        SUM(ps.mini_balance) as mini_balance,
        SUM(ps.total_points) as total_points,
        SUM(ps.user_deposit) as user_deposit,
        SUM(ps.user_withdrawal) as user_withdrawal,
        SUM(ps.user_profit) as user_profit,
        SUM(ps.partner_deposit) as partner_deposit,
        SUM(ps.partner_deposit_received) as partner_deposit_received,
        SUM(ps.partner_withdrawal) as partner_withdrawal,
        SUM(ps.partner_withdrawal_received) as partner_withdrawal_received,
        SUM(ps.partner_profit) as partner_profit,
        SUM(ps.admin_deposit) as admin_deposit,
        SUM(ps.admin_withdrawal) as admin_withdrawal,
        SUM(ps.total_bet_amount) as total_bet_amount,
        SUM(ps.invalid_bet_amount) as invalid_bet_amount,
        SUM(ps.public_bet_amount) as public_bet_amount,
        SUM(ps.total_win_amount) as total_win_amount,
        SUM(ps.betting_profit) as betting_profit,
        SUM(ps.rolling) as rolling,
        SUM(ps.member_comp) as member_comp,
        SUM(ps.first_deposit_bonus) as first_deposit_bonus,
        SUM(ps.regular_deposit_bonus) as regular_deposit_bonus,
        SUM(ps.final_profit) as final_profit,
        SUM(ps.money_deposit) as money_deposit,
        SUM(ps.money_withdrawal) as money_withdrawal,
        SUM(ps.point_deposit) as point_deposit,
        SUM(ps.point_withdrawal) as point_withdrawal
      FROM partner_statistics ps
      LEFT JOIN game_types gt ON ps.game_type_id = gt.id
      JOIN users u ON ps.partner_id = u.id
      WHERE DATE(ps.stat_date) BETWEEN ? AND ?
    `;

    const params = [startDate, endDate];

    if (partnerId) {
      query += " AND ps.partner_id = ?";
      params.push(partnerId);
    }

    if (gameTypeId) {
      query += " AND ps.game_type_id = ?";
      params.push(gameTypeId);
    }

    query += " GROUP BY DATE_FORMAT(ps.stat_date, '%Y-%m-%d'), ps.game_type_id, gt.code, gt.name_ko ORDER BY stat_date DESC";

    const [rows] = await db.execute(query, params);

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Failed to fetch date statistics:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
