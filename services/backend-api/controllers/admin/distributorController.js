const db = require('../../config/db');

/**
 * GET /api/admin/distributor/levels
 * Returns all distributor levels
 */
exports.getLevels = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT idx, step, full_name as fullName, short_name as shortName, color FROM distributor_levels ORDER BY step ASC');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching distributor levels:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch levels' });
  }
};

/**
 * POST /api/admin/distributor/levels
 * Creates a new distributor level
 */
exports.createLevel = async (req, res) => {
  try {
    const { fullName, shortName, color } = req.body;
    
    // Get the highest step and add 1
    const [maxStepResult] = await db.query('SELECT MAX(step) as maxStep FROM distributor_levels');
    const nextStep = (maxStepResult[0].maxStep || 0) + 1;
    
    const [result] = await db.execute(
      'INSERT INTO distributor_levels (step, full_name, short_name, color) VALUES (?, ?, ?, ?)',
      [nextStep, fullName, shortName, color || '#000000']
    );
    
    res.json({
      success: true,
      data: {
        idx: result.insertId,
        step: nextStep,
        fullName,
        shortName,
        color: color || '#000000'
      }
    });
  } catch (error) {
    console.error('Error creating distributor level:', error);
    res.status(500).json({ success: false, error: 'Failed to create level' });
  }
};

/**
 * PUT /api/admin/distributor/levels/:idx
 * Updates an existing distributor level
 */
exports.updateLevel = async (req, res) => {
  try {
    const { idx } = req.params;
    const { fullName, shortName, color, step } = req.body;
    
    await db.execute(
      'UPDATE distributor_levels SET full_name = ?, short_name = ?, color = ?, step = ? WHERE idx = ?',
      [fullName, shortName, color, step, idx]
    );
    
    res.json({
      success: true,
      data: {
        idx: parseInt(idx, 10),
        step,
        fullName,
        shortName,
        color
      }
    });
  } catch (error) {
    console.error('Error updating distributor level:', error);
    res.status(500).json({ success: false, error: 'Failed to update level' });
  }
};
