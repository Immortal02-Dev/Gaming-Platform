const db = require("../../config/db");

const DEFAULT_GAME_SETTINGS = [
  { id: 1, title: "크로스", slug: "cross", category: "sports" },
  { id: 9, title: "스페셜", slug: "special", category: "special" },
  { id: 7, title: "라이브", slug: "live", category: "live" },
  { id: 6, title: "프리매치", slug: "prematch", category: "sports" },
  { id: 2, title: "카지노", slug: "casino", category: "casino" },
  { id: 3, title: "슬롯", slug: "slot", category: "slot" },
  { id: 4, title: "파워볼(PBG)", slug: "powerball-pbg", category: "arcade" },
  {
    id: 10,
    title: "EOS파워볼5분",
    slug: "eos-powerball-5",
    category: "arcade",
  },
  {
    id: 11,
    title: "EOS파워볼3분",
    slug: "eos-powerball-3",
    category: "arcade",
  },
  {
    id: 12,
    title: "코인파워볼5분",
    slug: "coin-powerball-5",
    category: "arcade",
  },
  {
    id: 13,
    title: "코인파워볼3분",
    slug: "coin-powerball-3",
    category: "arcade",
  },
  { id: 14, title: "코인사다리5분", slug: "coin-ladder-5", category: "arcade" },
  { id: 15, title: "코인사다리3분", slug: "coin-ladder-3", category: "arcade" },
  { id: 5, title: "플레이홀덤", slug: "play-holdem", category: "poker" },
  { id: 8, title: "파파홀덤", slug: "papa-holdem", category: "poker" },
  { id: 18, title: "와일드홀덤", slug: "wild-holdem", category: "poker" },
  { id: 19, title: "웹맞고", slug: "web-matgo", category: "table" },
  { id: 20, title: "웹바둑이", slug: "web-baduk", category: "table" },
  { id: 22, title: "로얄홀덤", slug: "royal-holdem", category: "poker" },
];

const buildPlaceholders = (count) => Array(count).fill("?").join(",");

const ensureGameSettings = async () => {
  const ids = DEFAULT_GAME_SETTINGS.map((game) => game.id);
  const placeholders = buildPlaceholders(ids.length);

  const [existingRows] = await db.execute(
    `SELECT id FROM games WHERE id IN (${placeholders})`,
    ids,
  );

  const existingIds = new Set(existingRows.map((row) => row.id));
  const missingGames = DEFAULT_GAME_SETTINGS.filter(
    (game) => !existingIds.has(game.id),
  );

  if (missingGames.length === 0) {
    return;
  }

  const valuePlaceholders = missingGames
    .map(() => "(?,?,?,?,?,?,?,?,?,?,?)")
    .join(",");
  const insertValues = [];

  missingGames.forEach((game) => {
    insertValues.push(
      game.id,
      game.title,
      game.slug,
      game.category,
      null,
      null,
      0,
      0,
      0,
      0,
      0,
    );
  });

  await db.execute(
    `INSERT IGNORE INTO games (id, title, slug, category, provider_id, image, is_hot, is_featured, is_new, rtp, is_maintenance) VALUES ${valuePlaceholders}`,
    insertValues,
  );
};

exports.getGameSettings = async (req, res) => {
  try {
    const ids = DEFAULT_GAME_SETTINGS.map((game) => game.id);
    const placeholders = buildPlaceholders(ids.length);

    await ensureGameSettings();

    const [rows] = await db.execute(
      `SELECT id AS gameTypeIdx, title AS gameTypeName, category AS gameCategory, is_maintenance AS gameTypeClose
       FROM games
       WHERE id IN (${placeholders})
       ORDER BY FIELD(id, ${placeholders})`,
      [...ids, ...ids],
    );

    res.status(200).json({
      ReturnCode: 0,
      ReturnMessage: "Success",
      data: rows,
    });
  } catch (error) {
    console.error("Error in getGameSettings:", error);
    res.status(500).json({ ReturnCode: 1, ReturnMessage: error.message });
  }
};

exports.updateGameSettingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { key, value } = req.body;

    if (key !== "gameTypeClose") {
      return res.status(400).json({
        ReturnCode: 1,
        ReturnMessage: "Invalid key provided",
      });
    }

    const isMaintenance = Number(value) === 1 ? 1 : 0;

    const [result] = await db.execute(
      "UPDATE games SET is_maintenance = ? WHERE id = ?",
      [isMaintenance, parseInt(id, 10)],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        ReturnCode: 1,
        ReturnMessage: "Game not found",
      });
    }

    res.status(200).json({
      ReturnCode: 0,
      ReturnMessage: "Game status updated successfully",
    });
  } catch (error) {
    console.error("Error in updateGameSettingStatus:", error);
    res.status(500).json({ ReturnCode: 1, ReturnMessage: error.message });
  }
};
