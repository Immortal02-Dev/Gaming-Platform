const db = require("../../config/db");

exports.getAllBoards = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 20,
      boardType,
      searchType,
      searchText
    } = req.query;

    const limit = parseInt(pageSize, 10) || 20;
    const pageNum = parseInt(page, 10) || 1;
    const offset = (pageNum - 1) * limit;

    let whereClause = "WHERE 1=1";
    const params = [];

    if (boardType) {
      whereClause += " AND b.board_type = ?";
      params.push(boardType);
    }

    if (searchType && searchText) {
      if (searchType === "subject") {
        whereClause += " AND b.subject LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "id") {
        whereClause += " AND u.username LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "nick") {
        whereClause += " AND u.nickname LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "replywait") {
        whereClause += " AND b.board_type = 'qna' AND (b.reply_content IS NULL OR b.reply_content = '')";
      }
    }

    const query = `
      SELECT 
        b.id,
        b.board_type as boardType,
        CASE 
          WHEN b.board_type = 'notice' THEN '공지사항'
          WHEN b.board_type = 'event' THEN '이벤트게시판'
          WHEN b.board_type = 'partnerNotice' THEN '파트너 공지'
          WHEN b.board_type = 'free' THEN '자유게시판'
          WHEN b.board_type = 'popup' THEN '팝업'
          WHEN b.board_type = 'qna' THEN '1:1문의'
          WHEN b.board_type = 'reply' THEN '답변 템플릿'
          ELSE b.board_type
        END as boardTypeDisplay,
        b.user_id as userId,
        b.subject,
        b.content,
        b.title_color as boardTitleColor,
        b.title_weight as boardTitleWeight,
        b.is_pinned as isPinned,
        b.display_order as displayOrder,
        b.is_popup as isPopup,
        b.is_disabled as isDisabled,
        b.view_date as displayDate,
        b.view_count as viewCount,
        b.request_type as requestType,
        b.reply_content as replyContent,
        b.replied_at as repliedAt,
        b.created_at as createdAt,
        u.username,
        u.nickname
      FROM boards b
      JOIN users u ON b.user_id = u.id
      ${whereClause}
      ORDER BY b.is_pinned DESC, b.display_order ASC, b.created_at DESC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await db.query(query, [...params, limit, offset]);

    const [[{ total }]] = await db.query(
      `SELECT COUNT(*) as total FROM boards b JOIN users u ON b.user_id = u.id ${whereClause}`,
      params
    );

    const formattedData = rows.map(row => ({
      ...row,
      user: {
        username: row.username,
        nickname: row.nickname,
        display: `${row.username}(${row.nickname})`
      }
    }));

    res.status(200).json({
      success: true,
      data: formattedData,
      pagination: {
        total,
        page: parseInt(page, 10),
        pageSize: limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error in getAllBoards:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBoardById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT 
        b.*,
        u.username,
        u.nickname
      FROM boards b
      JOIN users u ON b.user_id = u.id
      WHERE b.id = ?
    `;
    const [rows] = await db.execute(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const board = rows[0];
    const formattedBoard = {
      ...board,
      boardTitle: board.subject,
      boardContent: board.content,
      boardTitleColor: board.title_color,
      boardTitleWeight: board.title_weight,
      noticeTopYN: board.is_pinned === 'Y',
      boardSort: board.display_order,
      viewDate: board.view_date,
      noticePopupYN: board.is_popup === 'Y',
      boardUserDel: board.is_disabled === 'Y',
      replyContent: board.reply_content,
      repliedAt: board.replied_at,
      user: {
        username: board.username,
        nickname: board.nickname,
        display: `${board.username}(${board.nickname})`
      }
    };

    res.status(200).json({ success: true, data: formattedBoard });
  } catch (error) {
    console.error("Error in getBoardById:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createBoard = async (req, res) => {
  try {
    const {
      boardType,
      boardTitle,
      boardTitleColor,
      boardTitleWeight,
      boardContent,
      noticeTopYN,
      boardSort,
      viewDate,
      noticePopupYN,
      boardUserDel
    } = req.body;

    const userId = req.user.id; // From auth middleware

    const query = `
      INSERT INTO boards (
        board_type, user_id, subject, content, 
        title_color, title_weight, is_pinned, 
        display_order, is_popup, is_disabled, view_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(query, [
      boardType,
      userId,
      boardTitle,
      boardContent,
      boardTitleColor || '#000000',
      boardTitleWeight || '',
      noticeTopYN ? 'Y' : 'N',
      parseInt(boardSort, 10) || 0,
      noticePopupYN ? 'Y' : 'N',
      boardUserDel ? 'Y' : 'N',
      viewDate || null
    ]);

    res.status(201).json({
      success: true,
      message: "Board created successfully",
      data: { id: result.insertId }
    });
  } catch (error) {
    console.error("Error in createBoard:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      boardType,
      boardTitle,
      boardTitleColor,
      boardTitleWeight,
      boardContent,
      noticeTopYN,
      boardSort,
      viewDate,
      noticePopupYN,
      boardUserDel,
      replyContent
    } = req.body;

    const query = `
      UPDATE boards SET 
        board_type = ?, 
        subject = ?, 
        content = ?, 
        title_color = ?, 
        title_weight = ?, 
        is_pinned = ?, 
        display_order = ?, 
        is_popup = ?, 
        is_disabled = ?, 
        view_date = ?,
        reply_content = ?,
        replied_at = CASE WHEN ? IS NOT NULL AND (reply_content IS NULL OR reply_content = '') THEN CURRENT_TIMESTAMP ELSE replied_at END,
        reply_user_id = CASE WHEN ? IS NOT NULL AND (reply_content IS NULL OR reply_content = '') THEN ? ELSE reply_user_id END
      WHERE id = ?
    `;

    await db.execute(query, [
      boardType,
      boardTitle,
      boardContent,
      boardTitleColor || '#000000',
      boardTitleWeight || '',
      noticeTopYN ? 'Y' : 'N',
      parseInt(boardSort, 10) || 0,
      noticePopupYN ? 'Y' : 'N',
      boardUserDel ? 'Y' : 'N',
      viewDate || null,
      replyContent || null,
      replyContent || null,
      replyContent || null,
      req.user.id,
      id
    ]);

    res.status(200).json({ success: true, message: "Board updated successfully" });
  } catch (error) {
    console.error("Error in updateBoard:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute("DELETE FROM boards WHERE id = ?", [id]);
    res.status(200).json({ success: true, message: "Board deleted successfully" });
  } catch (error) {
    console.error("Error in deleteBoard:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
