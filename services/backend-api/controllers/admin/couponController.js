const db = require("../../config/db");

// ── Coupon Management ──────────────────────────────────────────

/**
 * GET /api/admin/coupons
 * List all coupons with filtering and pagination
 */
exports.getCoupons = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 50,
      searchDateType = "register",
      startDate,
      endDate,
      searchStatus,
      searchType,
      searchText,
    } = req.query;

    const limit = parseInt(pageSize, 10) || 50;
    const pageNum = parseInt(page, 10) || 1;
    const offset = (pageNum - 1) * limit;

    let whereClause = "WHERE 1=1";
    const params = [];

    // Date filtering
    const dateColumn =
      searchDateType === "use"
        ? "c.use_date"
        : searchDateType === "expire"
        ? "c.expire_date"
        : "c.register_date";

    if (startDate && startDate.trim() !== "") {
      whereClause += ` AND DATE(${dateColumn}) >= ?`;
      params.push(startDate);
    }
    if (endDate && endDate.trim() !== "") {
      whereClause += ` AND DATE(${dateColumn}) <= ?`;
      params.push(endDate);
    }

    // Status filtering
    if (searchStatus !== undefined && searchStatus !== "") {
      whereClause += " AND c.status = ?";
      params.push(parseInt(searchStatus, 10));
    }

    // Text search
    if (searchType && searchText && searchText.trim() !== "") {
      if (searchType === "receiver_id") {
        whereClause += " AND receiver.username LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "subject") {
        whereClause += " AND c.subject LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "register_id") {
        whereClause += " AND issuer.username LIKE ?";
        params.push(`%${searchText}%`);
      }
    }

    // Main query
    const query = `
      SELECT
        c.id,
        c.receiver_id,
        receiver.username AS receiver_id_display,
        c.subject,
        c.amount,
        c.status,
        c.register_id,
        issuer.username AS register_id_display,
        c.register_date,
        c.use_date,
        c.expire_date
      FROM coupons c
      JOIN users receiver ON c.receiver_id = receiver.id
      LEFT JOIN users issuer ON c.register_id = issuer.id
      ${whereClause}
      ORDER BY c.register_date DESC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await db.query(query, [...params, limit, offset]);

    // Count query
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM coupons c
      JOIN users receiver ON c.receiver_id = receiver.id
      LEFT JOIN users issuer ON c.register_id = issuer.id
      ${whereClause}
    `;
    const [countRows] = await db.query(countQuery, params);
    const total = countRows[0].total;

    // Summary amounts
    const summaryQuery = `
      SELECT
        SUM(CASE WHEN c.status = 0 THEN c.amount ELSE 0 END) AS waitAmount,
        SUM(CASE WHEN c.status = 1 THEN c.amount ELSE 0 END) AS useAmount,
        SUM(CASE WHEN c.status = 2 THEN c.amount ELSE 0 END) AS cancelAmount,
        SUM(CASE WHEN c.status = 3 THEN c.amount ELSE 0 END) AS expireAmount
      FROM coupons c
      JOIN users receiver ON c.receiver_id = receiver.id
      LEFT JOIN users issuer ON c.register_id = issuer.id
      ${whereClause}
    `;
    const [summaryRows] = await db.query(summaryQuery, params);
    const summary = {
      waitAmount: Number(summaryRows[0].waitAmount) || 0,
      useAmount: Number(summaryRows[0].useAmount) || 0,
      cancelAmount: Number(summaryRows[0].cancelAmount) || 0,
      expireAmount: Number(summaryRows[0].expireAmount) || 0,
    };

    // Map status to string for frontend
    const data = rows.map((r) => ({
      ...r,
      status: String(r.status),
    }));

    res.status(200).json({
      success: true,
      data,
      summary,
      pagination: {
        total,
        page: parseInt(page, 10),
        pageSize: limit,
        totalPages: Math.ceil(total / limit),
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error("Error in getCoupons:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * POST /api/admin/coupons
 * Issue a new coupon to a user
 */
exports.createCoupon = async (req, res) => {
  try {
    const { receiver_id, subject, amount, expire_date } = req.body;
    const register_id = req.user?.id || null;

    if (!receiver_id || !subject || !amount || !expire_date) {
      return res.status(400).json({
        success: false,
        error: "receiver_id, subject, amount, expire_date are required",
      });
    }

    // Verify user exists
    const [users] = await db.execute("SELECT id FROM users WHERE id = ?", [receiver_id]);
    if (users.length === 0) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    await db.execute(
      `INSERT INTO coupons (receiver_id, subject, amount, status, register_id, expire_date)
       VALUES (?, ?, ?, 0, ?, ?)`,
      [receiver_id, subject, amount, register_id, expire_date]
    );

    res.status(201).json({ success: true, message: "쿠폰이 발급되었습니다." });
  } catch (error) {
    console.error("Error in createCoupon:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * POST /api/admin/coupons/cancel
 * Cancel one, selected, or all pending coupons
 */
exports.cancelCoupons = async (req, res) => {
  try {
    const {
      type,
      couponIdx,
      searchDateType,
      startDate,
      endDate,
      searchStatus,
      searchType,
      searchText,
    } = req.body;

    if (type === "single" || type === "sel") {
      // Cancel by specific IDs
      const ids = String(couponIdx)
        .split(",")
        .map((id) => parseInt(id.trim(), 10))
        .filter((id) => !isNaN(id));

      if (ids.length === 0) {
        return res.status(400).json({ success: false, error: "No valid coupon IDs provided" });
      }

      const placeholders = ids.map(() => "?").join(",");
      const [result] = await db.execute(
        `UPDATE coupons SET status = 2 WHERE id IN (${placeholders}) AND status = 0`,
        ids
      );

      res.status(200).json({
        success: true,
        message: `${result.affectedRows}개의 쿠폰이 취소되었습니다.`,
      });
    } else if (type === "all") {
      // Cancel all pending coupons matching current search filters
      let whereClause = "WHERE status = 0";
      const params = [];

      const dateColumn =
        searchDateType === "use"
          ? "use_date"
          : searchDateType === "expire"
          ? "expire_date"
          : "register_date";

      if (startDate) {
        whereClause += ` AND DATE(${dateColumn}) >= ?`;
        params.push(startDate);
      }
      if (endDate) {
        whereClause += ` AND DATE(${dateColumn}) <= ?`;
        params.push(endDate);
      }

      const [result] = await db.execute(
        `UPDATE coupons SET status = 2 ${whereClause}`,
        params
      );

      res.status(200).json({
        success: true,
        message: `${result.affectedRows}개의 쿠폰이 취소되었습니다.`,
      });
    } else {
      res.status(400).json({ success: false, error: "Invalid cancel type" });
    }
  } catch (error) {
    console.error("Error in cancelCoupons:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
