const db = require("../../config/db");

const formatDate = (d) => {
  if (!d) return "-";
  const date = new Date(d);
  if (isNaN(date.getTime())) return d;
  return date.toISOString().replace("T", " ").substring(0, 19);
};

exports.getAllPaybacks = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 50,
      startDate,
      endDate,
      paybackType,
      paybackStatus,
      searchType,
      searchText,
    } = req.query;
    const limit = parseInt(pageSize, 10);
    const offset = (parseInt(page, 10) - 1) * limit;

    let whereClause = "WHERE 1=1";
    const queryParams = [];

    if (startDate) {
      whereClause += " AND p.apply_date >= ?";
      queryParams.push(startDate);
    }
    if (endDate) {
      whereClause += " AND p.apply_date <= ?";
      queryParams.push(endDate);
    }
    if (paybackType) {
      whereClause += " AND p.type = ?";
      queryParams.push(paybackType);
    }
    if (paybackStatus) {
      whereClause += " AND p.status = ?";
      queryParams.push(paybackStatus);
    }
    if (searchText && searchType) {
      if (searchType === "id") {
        whereClause += " AND u.username LIKE ?";
        queryParams.push(`%${searchText}%`);
      } else if (searchType === "nick") {
        whereClause += " AND u.nickname LIKE ?";
        queryParams.push(`%${searchText}%`);
      }
    }

    let rows = [];
    let countResult = { total: 0 };
    let summary = {
      totalRequestAmount: 0,
      totalApprovedAmount: 0,
      waitingAmount: 0,
      cancelledAmount: 0,
    };

    try {
      const rowsResult = await db.execute(
        `
        SELECT 
          p.id,
          p.user_id,
          p.type,
          p.amount,
          p.percent,
          p.status,
          p.apply_date,
          p.request_available_date,
          p.total_betting_amount,
          p.total_win_amount,
          p.charge_amount,
          p.exchange_amount,
          p.balance_amount,
          p.created_at,
          p.processed_at,
          u.username,
          u.nickname,
          u.role as userRole
        FROM payback_requests p
        JOIN users u ON p.user_id = u.id
        ${whereClause}
        ORDER BY p.created_at DESC
        LIMIT ? OFFSET ?
      `,
        [...queryParams, limit, offset],
      );
      rows = rowsResult[0] || [];
    } catch (err) {
      console.error("[Payback API] Error fetching rows:", err);
      // If table doesn't exist, return empty data
      if (err.code === "ER_NO_SUCH_TABLE") {
        console.log("[Payback API] Table does not exist yet");
        rows = [];
      } else {
        throw err;
      }
    }

    try {
      const countRowsResult = await db.execute(
        `
        SELECT COUNT(*) as total FROM payback_requests p JOIN users u ON p.user_id = u.id ${whereClause}`,
        queryParams,
      );
      countResult = countRowsResult[0][0] || { total: 0 };
    } catch (err) {
      console.error("[Payback API] Error fetching count:", err);
      countResult = { total: 0 };
    }

    try {
      const summaryResult = await db.execute(
        `
        SELECT 
          SUM(p.amount) as totalRequestAmount,
          SUM(CASE WHEN p.status = 3 THEN p.amount ELSE 0 END) as totalApprovedAmount,
          SUM(CASE WHEN p.status = 2 THEN p.amount ELSE 0 END) as waitingAmount,
          SUM(CASE WHEN p.status = 4 THEN p.amount ELSE 0 END) as cancelledAmount
        FROM payback_requests p
        JOIN users u ON p.user_id = u.id
        ${whereClause}
      `,
        queryParams,
      );
      summary = summaryResult[0][0] || summary;
    } catch (err) {
      console.error("[Payback API] Error fetching summary:", err);
      summary = {
        totalRequestAmount: 0,
        totalApprovedAmount: 0,
        waitingAmount: 0,
        cancelledAmount: 0,
      };
    }

    // Map to frontend structure
    const mappedData = (rows || [])
      .map((r, index) => {
        if (!r) return null;
        return {
          paybackIdx: r.id || 0,
          no: countResult?.total
            ? countResult.total - offset - index
            : index + 1,
          affiliation: {
            userIdx: 1,
            userID: "System",
            nickname: "System",
            role: "Partner",
            backgroundColor: "#6c757d",
          },
          applicant: {
            userIdx: r.user_id || 0,
            userID: r.username || "-",
            nickname: r.nickname || r.username || "-",
            role: (r.userRole || "user").toUpperCase(),
            backgroundColor: "#007bff",
          },
          paybackType:
            r.type === 1
              ? "Bet-Win (Sports)"
              : r.type === 2
                ? "In-Out"
                : "In-Out-Bal",
          applyDate: r.apply_date
            ? new Date(r.apply_date).toISOString().split("T")[0]
            : "-",
          requestAvailableDate: r.request_available_date
            ? new Date(r.request_available_date).toISOString().split("T")[0]
            : "-",
          requestAmount: r.amount ? Number(r.amount).toLocaleString() : "0",
          paybackPercent: r.percent ? `${r.percent}%` : "0%",
          status: r.status || 0,
          statusBadges: [
            {
              label:
                r.status === 1
                  ? "신청"
                  : r.status === 2
                    ? "대기"
                    : r.status === 3
                      ? "승인"
                      : "취소",
              className:
                r.status === 3
                  ? "bg-info"
                  : r.status === 4
                    ? "bg-danger"
                    : "bg-secondary",
            },
          ],
          totalBettingAmount: r.total_betting_amount
            ? Number(r.total_betting_amount).toLocaleString()
            : "0",
          totalWinAmount: r.total_win_amount
            ? Number(r.total_win_amount).toLocaleString()
            : "0",
          chargeAmount: r.charge_amount
            ? Number(r.charge_amount).toLocaleString()
            : "0",
          exchangeAmount: r.exchange_amount
            ? Number(r.exchange_amount).toLocaleString()
            : "0",
          balanceAmount: r.balance_amount
            ? Number(r.balance_amount).toLocaleString()
            : "0",
          requestDate: formatDate(r.created_at),
          processDate: formatDate(r.processed_at),
        };
      })
      .filter(Boolean);

    console.log("[Payback API] Fetched rows:", rows?.length || 0);
    console.log("[Payback API] Summary:", summary);

    res.status(200).json({
      success: true,
      data: mappedData || [],
      summary: {
        totalRequestAmount: Number(summary?.totalRequestAmount || 0),
        totalApprovedAmount: Number(summary?.totalApprovedAmount || 0),
        waitingAmount: Number(summary?.waitingAmount || 0),
        cancelledAmount: Number(summary?.cancelledAmount || 0),
      },
    });
  } catch (error) {
    console.error("[Payback API Error]", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch paybacks",
      error: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const { paybackIdx, paybackStatus } = req.body;
    await db.execute(
      "UPDATE payback_requests SET status = ?, processed_at = NOW() WHERE id = ?",
      [paybackStatus, paybackIdx],
    );
    res.status(200).json({ ReturnCode: 0, ReturnMessage: "Status updated" });
  } catch (error) {
    res.status(500).json({ ReturnCode: 1, ReturnMessage: error.message });
  }
};

exports.changeStatusList = async (req, res) => {
  try {
    const { paybackIdx, paybackStatus } = req.body;
    const ids = Object.values(paybackIdx);
    if (ids.length > 0) {
      const placeholders = ids.map(() => "?").join(",");
      await db.execute(
        `UPDATE payback_requests SET status = ?, processed_at = NOW() WHERE id IN (${placeholders})`,
        [paybackStatus, ...ids],
      );
    }
    res
      .status(200)
      .json({ ReturnCode: 0, ReturnMessage: `${ids.length} records updated` });
  } catch (error) {
    res.status(500).json({ ReturnCode: 1, ReturnMessage: error.message });
  }
};
