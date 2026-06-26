const db = require("../../config/db");

/**
 * GET /api/admin/casino-setting
 * List casino vendors/providers with their settings
 */
exports.getCasinoSettings = async (req, res) => {
  try {
    // Get all casino providers from providers table
    const [providers] = await db.execute(
      "SELECT id, name, slug, is_maintenance FROM providers ORDER BY name ASC",
    );

    // For each provider, check if it's active (not in maintenance)
    const vendors = providers.map((provider) => ({
      id: provider.id.toString(),
      name: provider.name,
      category: "casino", // All are casino
      checked: provider.is_maintenance === 0, // checked means active (not maintenance)
    }));

    res.status(200).json({
      ReturnCode: 0,
      ReturnMessage: "Success",
      data: vendors,
    });
  } catch (error) {
    console.error("Error in getCasinoSettings:", error);
    res.status(500).json({ ReturnCode: 1, ReturnMessage: error.message });
  }
};

/**
 * POST /api/admin/casino-setting/vendorUseYN
 * Update vendor active status
 */
exports.updateVendorUseYN = async (req, res) => {
  try {
    const { vendorIdx, vendorUseYN } = req.body;

    if (!vendorIdx || vendorUseYN === undefined) {
      return res.status(400).json({
        ReturnCode: 1,
        ReturnMessage: "Missing vendorIdx or vendorUseYN",
      });
    }

    // Update the provider's maintenance status
    // vendorUseYN = 1 means active (not maintenance), 0 means inactive (maintenance)
    const isMaintenance = vendorUseYN === 1 ? 0 : 1;

    await db.execute("UPDATE providers SET is_maintenance = ? WHERE id = ?", [
      isMaintenance,
      parseInt(vendorIdx, 10),
    ]);

    res.status(200).json({
      ReturnCode: 0,
      ReturnMessage: "Vendor status updated successfully",
    });
  } catch (error) {
    console.error("Error in updateVendorUseYN:", error);
    res.status(500).json({ ReturnCode: 1, ReturnMessage: error.message });
  }
};
