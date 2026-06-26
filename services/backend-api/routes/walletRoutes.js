const express = require("express");
const router = express.Router();
const {
  getBalances,
  getCryptoAddress,
  depositFiat,
  getWithdrawMethods,
  withdraw,
  getSwapRate,
  swap,
  getVaultInfo,
  getVaultHistory,
  vaultTransferIn,
  vaultTransferOut,
  getTransactions,
  getBetHistory,
  getBuyOptions,
  getBuyEstimate,
  getRollovers,
} = require("../controllers/walletController");
const authMiddleware = require("../middleware/authMiddleware");

// @route   GET /api/wallet/balances
router.get("/balances", authMiddleware, getBalances);

// Deposit
router.get("/deposit/crypto-address", authMiddleware, getCryptoAddress);
router.post("/deposit/fiat", authMiddleware, depositFiat);

// Withdraw
router.get("/withdraw/methods", authMiddleware, getWithdrawMethods);
router.post("/withdraw", authMiddleware, withdraw);

// Swap
router.get("/swap/rate", authMiddleware, getSwapRate);
router.post("/swap", authMiddleware, swap);

// Vault
router.get("/vault/info", authMiddleware, getVaultInfo);
router.get("/vault/history", authMiddleware, getVaultHistory);
router.post("/vault/transfer-in", authMiddleware, vaultTransferIn);
router.post("/vault/transfer-out", authMiddleware, vaultTransferOut);

// History & Estimates
router.get("/transactions", authMiddleware, getTransactions);
router.get("/bet-history", authMiddleware, getBetHistory);
router.get("/buy/options", authMiddleware, getBuyOptions);
router.get("/buy/estimate", authMiddleware, getBuyEstimate);
router.get("/rollovers", authMiddleware, getRollovers);

module.exports = router;
