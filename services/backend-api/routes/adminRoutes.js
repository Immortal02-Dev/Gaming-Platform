const express = require("express");
const router = express.Router();
const userController = require("../controllers/admin/userController");
const financeController = require("../controllers/admin/financeController");
const gameController = require("../controllers/admin/gameController");
const referralController = require("../controllers/admin/referralController");
const promoController = require("../controllers/admin/promoController");
const miscController = require("../controllers/admin/miscController");
const authController = require("../controllers/admin/authController");
const analyticsController = require("../controllers/admin/analyticsController");
const notificationController = require("../controllers/notificationController");
const platformController = require("../controllers/admin/platformController");
const chatController = require("../controllers/admin/chatController");
const auditController = require("../controllers/admin/auditController");
const kycController = require("../controllers/admin/kycController");
const responsibleController = require("../controllers/admin/responsibleController");
const securityController = require("../controllers/admin/securityController");
const statisticsController = require("../controllers/admin/statisticsController");
const distributorController = require("../controllers/admin/distributorController");
const couponController = require("../controllers/admin/couponController");
const sportGameController = require("../controllers/admin/sportGameController");
const arcadeGameController = require("../controllers/admin/arcadeGameController");
const sportBettingController = require("../controllers/admin/sportBettingController");
const casinoController = require("../controllers/admin/casinoController");
const alarmSettingController = require("../controllers/admin/alarmSettingController");
const casinoBettingController = require("../controllers/admin/casinoBettingController");
const casinoSettingController = require("../controllers/admin/casinoSettingController");
const gameSettingController = require("../controllers/admin/gameSettingController");
const slotBettingController = require("../controllers/admin/slotBettingController");
const boardBettingController = require("../controllers/admin/boardBettingController");
const arcadeBettingController = require("../controllers/admin/arcadeBettingController");
const paybackController = require("../controllers/admin/paybackController");
const pointController = require("../controllers/admin/pointController");
const moneyController = require("../controllers/admin/moneyController");
const sportSettingController = require("../controllers/admin/sportSettingController");
const sportCompetitionSettingController = require("../controllers/admin/sportCompetitionSettingController");
const sportMarketTypeSettingController = require("../controllers/admin/sportMarketTypeSettingController");
const sportOddsSettingController = require("../controllers/admin/sportOddsSettingController");
const sportSumOddsSettingController = require("../controllers/admin/sportSumOddsSettingController");
const sportCrossSettingController = require("../controllers/admin/sportCrossSettingController");
const arcadeSettingController = require("../controllers/admin/arcadeSettingController");
const boardController = require("../controllers/admin/boardController");
const managerSettingController = require("../controllers/admin/managerSettingController");
const bankSettingController = require("../controllers/admin/bankSettingController");
// Event Setting Controller
const eventSettingController = require("../controllers/admin/eventSettingController");
const alarmController = require("../controllers/admin/alarmController");
const ruleController = require("../controllers/admin/ruleController");
const guideController = require("../controllers/admin/guideController");
const messageTemplateController = require("../controllers/admin/messageTemplateController");
const messageController = require("../controllers/admin/messageController");
const faqController = require("../controllers/admin/faqController");

const authMiddleware = require("../middleware/authMiddleware");
const { auditMiddleware } = require("../middleware/auditMiddleware");

// Middleware to check if user is admin
const adminMiddleware = (req, res, next) => {
  if (
    req.user &&
    (req.user.role === "admin" || req.user.role === "super_admin")
  ) {
    next();
  } else {
    res
      .status(403)
      .json({ success: false, message: "Access denied. Admin only." });
  }
};

const superAdminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "super_admin") {
    next();
  } else {
    res
      .status(403)
      .json({ success: false, message: "Access denied. Super Admin only." });
  }
};

// Admin Login (Public)
router.post("/login", authController.login);
router.get("/settings", miscController.getPlatformSettings);

// Apply auth and admin middleware to all routes
router.use(authMiddleware, adminMiddleware);

// Audit Logs
router.get("/audit-logs", superAdminMiddleware, userController.getAuditLogs);

// Analytics
router.get("/analytics/revenue", analyticsController.getRevenueStats);
router.get("/analytics/users", analyticsController.getUserStats);
router.get("/analytics/activity", analyticsController.getActivityStats);
router.get("/analytics/games", analyticsController.getGamePerformance);
router.get("/analytics/top-players", analyticsController.getTopPlayers);
router.get("/analytics/financial-flow", analyticsController.getFinancialFlow);
router.get("/analytics/security", analyticsController.getSecurityAlerts);

// Statistics
router.get("/statistics/partner/date-range", statisticsController.getPartnerStatisticsDateRange);
router.get("/statistics/partner", statisticsController.getPartnerStatistics);
router.get("/statistics/date/date-range", statisticsController.getDateStatisticsDateRange);
router.get("/statistics/date", statisticsController.getDateStatistics);
router.get("/statistics/game-types", statisticsController.getGameTypes);

// MFA
router.post("/mfa/verify-login", authController.verifyMfaLogin);
router.post("/mfa/setup", authController.setupMfa);
router.post("/mfa/enable", authController.enableMfa);
router.post("/mfa/disable", authController.disableMfa);

// User Management
router.get("/user/list", userController.getAllUsers);
router.get("/user/tree/list", userController.getTreeList);
router.get("/users/duplicate", userController.getDuplicateUsers);
router.get("/user-edit-logs", userController.getUserEditLogs);
router.get("/user/login/list", userController.getLoginLogs);

// Finance List Routes (for consistency)
router.get("/finance/deposits", financeController.getDeposits);
router.get("/charges", financeController.getCharges);
router.get("/exchanges", financeController.getExchanges);
router.get("/money-deposit-withdraw", financeController.getManualMoneyLogs);
router.get("/point-logs", pointController.getPointLogs);
router.get("/money-logs", moneyController.getMoneyLogs);
router.get("/paybacks", paybackController.getAllPaybacks);
router.post(
  "/paybacks/changeStatus",
  auditMiddleware("UPDATE_PAYBACK_STATUS"),
  paybackController.changeStatus,
);
router.post(
  "/paybacks/changeStatusList",
  auditMiddleware("UPDATE_PAYBACK_STATUS_BULK"),
  paybackController.changeStatusList,
);

// Distributor Levels
router.get("/distributor/levels", distributorController.getLevels);
router.post(
  "/distributor/levels",
  auditMiddleware("CREATE_DISTRIBUTOR_LEVEL"),
  distributorController.createLevel,
);
router.put(
  "/distributor/levels/:idx",
  auditMiddleware("UPDATE_DISTRIBUTOR_LEVEL"),
  distributorController.updateLevel,
);

router.post(
  "/users",
  auditMiddleware("CREATE_USER"),
  userController.createUser,
);
router.get("/user/detail", userController.getUserDetail);
router.get("/users/:id", userController.getUserById);
router.get("/user/:id", userController.getUserById); // Alias for consistency
router.get("/user/list", userController.getAllUsers); // Missing route used by message write
router.put(
  "/users/:id",
  auditMiddleware("UPDATE_USER"),
  userController.updateUser,
);
router.delete(
  "/users/:id",
  auditMiddleware("DELETE_USER"),
  userController.deleteUser,
);
router.put(
  "/users/:id/kyc",
  auditMiddleware("UPDATE_USER_KYC"),
  userController.updateKycStatus,
);
router.put(
  "/users/:id/mute",
  auditMiddleware("TOGGLE_USER_MUTE"),
  userController.toggleMute,
);
router.get("/users/:id/login-history", userController.getLoginHistory);

// Platform Stats
router.get("/stats", financeController.getPlatformStats);
router.get("/me/permissions", authController.getMyPermissions);

// Wallet & Transactions
router.get("/transactions", financeController.getAllTransactions);
router.get("/transactions/pending", financeController.getPendingTransactions);
router.put(
  "/transactions/:id/approve",
  auditMiddleware("APPROVE_TRANSACTION"),
  financeController.approveTransaction,
);
router.put(
  "/transactions/:id/reject",
  auditMiddleware("REJECT_TRANSACTION"),
  financeController.rejectTransaction,
);
router.post(
  "/wallets/adjust-balance",
  auditMiddleware("ADJUST_USER_BALANCE"),
  financeController.adjustBalance,
);
router.get("/finance/webhook-logs", financeController.getWebhookLogs);

// Promotions
router.get("/promotions", promoController.getAllPromotions);
router.post(
  "/promotions",
  auditMiddleware("CREATE_PROMOTION"),
  promoController.createPromotion,
);
router.put(
  "/promotions/:id",
  auditMiddleware("UPDATE_PROMOTION"),
  promoController.updatePromotion,
);
router.delete(
  "/promotions/:id",
  auditMiddleware("DELETE_PROMOTION"),
  promoController.deletePromotion,
);

// Quests
router.get("/quests", promoController.getAllQuests);
router.post(
  "/quests",
  auditMiddleware("CREATE_QUEST"),
  promoController.createQuest,
);
router.put(
  "/quests/:id",
  auditMiddleware("UPDATE_QUEST"),
  promoController.updateQuest,
);
router.delete(
  "/quests/:id",
  auditMiddleware("DELETE_QUEST"),
  promoController.deleteQuest,
);

// Games
router.get("/games", gameController.getAllGames);
router.post(
  "/games",
  auditMiddleware("CREATE_GAME"),
  gameController.createGame,
);
router.put(
  "/games/:id",
  auditMiddleware("UPDATE_GAME"),
  gameController.updateGame,
);
router.delete(
  "/games/:id",
  auditMiddleware("DELETE_GAME"),
  gameController.deleteGame,
);
router.get("/games/bets", gameController.getBetHistory);
router.put(
  "/providers/:id",
  auditMiddleware("UPDATE_PROVIDER"),
  gameController.updateProvider,
);
router.get("/providers", gameController.getProviders);

// Trading
const adminTradingController = require("../controllers/admin/tradingController");
router.get("/trading/markets", adminTradingController.getAllMarkets);
router.put(
  "/trading/markets/:symbol",
  auditMiddleware("UPDATE_TRADING_MARKET"),
  adminTradingController.updateMarket,
);
router.get("/trading/trades", adminTradingController.getTrades);
router.get("/trading/rounds", adminTradingController.getTradingRounds);
router.post(
  "/trading/cancel/:id",
  auditMiddleware("CANCEL_TRADING_ROUND"),
  miscController.cancelTradingRound,
);

// Lottery
router.get("/lottery/draws", miscController.getLotteryDraws);
router.post(
  "/lottery/draws",
  auditMiddleware("CREATE_LOTTERY_DRAW"),
  miscController.createLotteryDraw,
);
router.put(
  "/lottery/draws/:id",
  auditMiddleware("UPDATE_LOTTERY_DRAW"),
  miscController.updateLotteryDraw,
);
router.delete(
  "/lottery/draws/:id",
  auditMiddleware("DELETE_LOTTERY_DRAW"),
  miscController.deleteLotteryDraw,
);
router.post(
  "/lottery/draws/:id/trigger",
  auditMiddleware("TRIGGER_LOTTERY_DRAW"),
  miscController.triggerLotteryDraw,
);

// Sports
router.get("/sports", miscController.getAllSports);
router.get("/sports/matches", miscController.getSportsMatches);
router.put(
  "/sports/matches/:id",
  auditMiddleware("UPDATE_SPORT_MATCH"),
  miscController.updateSportMatch,
);
router.put(
  "/sports/matches/:id/odds",
  auditMiddleware("UPDATE_SPORT_ODDS"),
  miscController.updateMatchOdds,
);

// Sport Game Admin (for /sport/game/list)
router.get("/sport-games", sportGameController.getSportGames);
router.get("/sport-games/:id", sportGameController.getSportGameDetail);
router.put(
  "/sport-games/:id/admin-status",
  auditMiddleware("UPDATE_SPORT_GAME_STATUS"),
  sportGameController.updateAdminStatus,
);
router.put(
  "/sport-games/:id/wait-live",
  auditMiddleware("UPDATE_SPORT_GAME_WAIT_LIVE"),
  sportGameController.updateWaitLive,
);
router.put(
  "/sport-games/:id/cancel",
  auditMiddleware("CANCEL_SPORT_GAME"),
  sportGameController.cancelSportGame,
);

// Sport Betting Admin (for /sport/betting/list)
router.get("/sport-betting", sportBettingController.getSportBettings);
router.get(
  "/sport-betting/detail/:id",
  sportBettingController.getSportBettingDetail,
);

// Alarm Settings
router.get("/alarm-setting", alarmSettingController.getAlarmSettings);
router.post(
  "/alarm-setting/update",
  auditMiddleware("UPDATE_ALARM_SETTINGS"),
  alarmSettingController.updateAlarmSettings,
);

// Alarm Counts (Polling)
router.get("/alarm/counts", alarmController.getAlarmCounts);

// Sport Settings Admin (for /sport/setting)
router.get("/sport-setting", sportSettingController.getSportSettings);
router.post(
  "/sport-setting/:id",
  auditMiddleware("UPDATE_SPORT_SETTING"),
  sportSettingController.updateSportSetting,
);

// Arcade Settings Admin (for /arcade/setting)
router.get("/arcade-setting", arcadeSettingController.getArcadeSettings);
router.post(
  "/arcade-setting/:id",
  auditMiddleware("UPDATE_ARCADE_SETTING"),
  arcadeSettingController.updateArcadeSetting,
);

// Sport Competition Settings Admin (for /sport/competition/setting)
router.get(
  "/sport-competition-setting",
  sportCompetitionSettingController.getSportCompetitionSettings,
);
router.post(
  "/sport-competition-setting/:id",
  auditMiddleware("UPDATE_SPORT_COMPETITION_SETTING"),
  sportCompetitionSettingController.updateSportCompetitionSetting,
);

// Sport Market Type Settings Admin (for /sport/market/type/setting)
router.get(
  "/sport-market-type-setting",
  sportMarketTypeSettingController.getMarketTypes,
);
router.post(
  "/sport-market-type-setting/:id",
  auditMiddleware("UPDATE_SPORT_MARKET_TYPE"),
  sportMarketTypeSettingController.updateMarketType,
);

// Sport Odds Settings Admin (for /sport/odds/setting)
router.get("/sport-odds-setting", sportOddsSettingController.getOddsSettings);
router.post(
  "/sport-odds-setting",
  auditMiddleware("UPDATE_SPORT_ODDS_SETTING"),
  sportOddsSettingController.updateOddsSettings,
);

// Sport Sum Odds Settings Admin (for /sport/sum/odds/setting)
router.get(
  "/sport-sum-odds-setting",
  sportSumOddsSettingController.getSettings,
);
router.post(
  "/sport-sum-odds-setting",
  auditMiddleware("UPDATE_SPORT_SUM_ODDS_SETTING"),
  sportSumOddsSettingController.updateSettings,
);

// Sport Cross Settings Admin (for /sport/cross/setting)
router.get(
  "/sport-cross-setting/sportCrossMarketTypeList",
  sportCrossSettingController.getMarketTypes,
);
router.get(
  "/sport-cross-setting",
  sportCrossSettingController.getCrossSettings,
);
router.post(
  "/sport-cross-setting/single",
  auditMiddleware("UPDATE_SPORT_CROSS_SINGLE"),
  sportCrossSettingController.updateSingle,
);
router.post(
  "/sport-cross-setting",
  auditMiddleware("CREATE_SPORT_CROSS_SETTING"),
  sportCrossSettingController.createCrossSetting,
);
router.post(
  "/sport-cross-setting/update",
  auditMiddleware("UPDATE_SPORT_CROSS_SETTING"),
  sportCrossSettingController.updateCrossSetting,
);
router.post(
  "/sport-cross-setting/delete",
  auditMiddleware("DELETE_SPORT_CROSS_SETTING"),
  sportCrossSettingController.deleteCrossSetting,
);

// Casino Transfers (for /casino/inout)
router.get("/casino-inout", casinoController.getCasinoTransfers);

// Casino Betting Admin (for /casino/betting/list)
router.get("/casino-betting", casinoBettingController.getCasinoBettings);

// Casino Settings Admin (for /casino/setting)
router.get("/casino-setting", casinoSettingController.getCasinoSettings);
router.post(
  "/casino-setting/vendorUseYN",
  casinoSettingController.updateVendorUseYN,
);

// Game Settings Admin (for /game/setting)
router.get("/game-setting", gameSettingController.getGameSettings);
router.post(
  "/game-setting/:id/status",
  auditMiddleware("UPDATE_GAME_SETTING_STATUS"),
  gameSettingController.updateGameSettingStatus,
);

// Slot Betting Admin (for /slot/betting/list)
router.get("/slot-betting", slotBettingController.getSlotBettings);

// Board Betting Admin (for /board/betting/list)
router.get("/board-betting", boardBettingController.getBoardBettings);

// Arcade Betting Admin (for /arcade/betting/list)
router.get("/arcade-betting", arcadeBettingController.getArcadeBettings);
router.delete(
  "/arcade-betting/:id",
  auditMiddleware("DELETE_ARCADE_BET"),
  arcadeBettingController.deleteArcadeBet,
);

// Arcade / Mini-Game Admin (for /arcade/game/list)
router.get("/arcade-games", arcadeGameController.getArcadeGames);
router.get(
  "/arcade-games/:id/detail",
  arcadeGameController.getArcadeGameDetail,
);
router.patch(
  "/arcade-games/:id/status",
  auditMiddleware("UPDATE_ARCADE_GAME_STATUS"),
  arcadeGameController.updateArcadeGameStatus,
);

// Referrals
router.get("/referral/stats", miscController.getReferralStats);
router.get("/referral/rewards", miscController.getReferralRewards);
router.get("/referral/friends", miscController.getAllReferralFriends);
router.get("/referral/codes", miscController.getAllReferralCodes);

// VIP Management
router.get("/vip/levels", miscController.getVipLevels);
router.put(
  "/vip/levels/:id",
  auditMiddleware("UPDATE_VIP_LEVEL"),
  miscController.updateVipLevel,
);
router.get("/vip/benefits", miscController.getAllVipBenefits);
router.post(
  "/vip/benefits",
  auditMiddleware("CREATE_VIP_BENEFIT"),
  miscController.createVipBenefit,
);
router.put(
  "/vip/benefits/:id",
  auditMiddleware("UPDATE_VIP_BENEFIT"),
  miscController.updateVipBenefit,
);
router.delete(
  "/vip/benefits/:id",
  auditMiddleware("DELETE_VIP_BENEFIT"),
  miscController.deleteVipBenefit,
);

// ── Security & Risk Management ─────────────────────────────
router.get(
  "/security/blacklist",
  superAdminMiddleware,
  securityController.getBlacklist,
);
router.post(
  "/security/blacklist",
  superAdminMiddleware,
  securityController.addToBlacklist,
);
router.delete(
  "/security/blacklist/:id",
  superAdminMiddleware,
  securityController.removeFromBlacklist,
);

router.get(
  "/security/bet-limits",
  superAdminMiddleware,
  securityController.getBetLimits,
);
router.put(
  "/security/bet-limits/:id",
  superAdminMiddleware,
  securityController.updateBetLimit,
);

router.get(
  "/security/fraud-rules",
  superAdminMiddleware,
  securityController.getFraudRules,
);
router.put(
  "/security/fraud-rules/:id",
  superAdminMiddleware,
  securityController.updateFraudRule,
);

router.get(
  "/security/logs",
  superAdminMiddleware,
  securityController.getSecurityLogs,
);

// Coupon Management
router.get("/coupons", couponController.getCoupons);
router.post(
  "/coupons",
  auditMiddleware("CREATE_COUPON"),
  couponController.createCoupon,
);
router.post(
  "/coupons/cancel",
  auditMiddleware("CANCEL_COUPON"),
  couponController.cancelCoupons,
);

// Bonus & Rewards Oversight
router.get("/bonuses/stats", promoController.getGlobalBonusStats);
router.get("/bonuses/promo-codes", promoController.getAllPromoCodes);
router.post(
  "/bonuses/promo-codes",
  auditMiddleware("CREATE_PROMO_CODE"),
  promoController.createPromoCode,
);
router.put(
  "/bonuses/promo-codes/:id",
  auditMiddleware("UPDATE_PROMO_CODE"),
  promoController.updatePromoCode,
);
router.delete(
  "/bonuses/promo-codes/:id",
  auditMiddleware("DELETE_PROMO_CODE"),
  promoController.deletePromoCode,
);

// Sponsorship Management
router.get("/sponsorships", miscController.getAllSponsorships);
router.put(
  "/sponsorships/:id",
  auditMiddleware("UPDATE_SPONSORSHIP"),
  miscController.updateSponsorship,
);

// Admin Role Management
router.get("/admins", superAdminMiddleware, userController.getAllAdmins);
router.put(
  "/admins/:id/role",
  superAdminMiddleware,
  auditMiddleware("UPDATE_ADMIN_ROLE"),
  userController.updateAdminRole,
);

// Notifications Management
router.get("/notifications", notificationController.getAllNotifications);
router.post(
  "/notifications",
  auditMiddleware("CREATE_NOTIFICATION"),
  notificationController.createNotification,
);
router.delete(
  "/notifications/:id",
  auditMiddleware("DELETE_NOTIFICATION"),
  notificationController.deleteNotification,
);

// Platform Settings
router.put(
  "/settings/:key",
  auditMiddleware("UPDATE_SETTING"),
  miscController.updatePlatformSetting,
);

// ── API Key Management ──────────────────────────────────────
router.get(
  "/platform/api-keys",
  superAdminMiddleware,
  platformController.getAllApiKeys,
);
router.post(
  "/platform/api-keys",
  superAdminMiddleware,
  platformController.updateApiKey,
);
router.delete(
  "/platform/api-keys/:id",
  superAdminMiddleware,
  platformController.deleteApiKey,
);

// ── Language Management ─────────────────────────────────────
router.get(
  "/platform/languages",
  superAdminMiddleware,
  platformController.getAllLanguages,
);
router.put(
  "/platform/languages/:id",
  superAdminMiddleware,
  platformController.updateLanguage,
);
router.delete(
  "/platform/languages/:id",
  superAdminMiddleware,
  platformController.deleteLanguage,
);

// Banners
router.get("/banners", platformController.getAllBanners);
router.post(
  "/banners",
  auditMiddleware("CREATE_BANNER"),
  platformController.createBanner,
);
router.put(
  "/banners/:id",
  auditMiddleware("UPDATE_BANNER"),
  platformController.updateBanner,
);
router.delete(
  "/banners/:id",
  auditMiddleware("DELETE_BANNER"),
  platformController.deleteBanner,
);

// Swap Rates
router.get("/swap-rates", platformController.getSwapRates);
router.post(
  "/swap-rates",
  auditMiddleware("CREATE_SWAP_RATE"),
  platformController.createSwapRate,
);
router.put(
  "/swap-rates/:id",
  auditMiddleware("UPDATE_SWAP_RATE"),
  platformController.updateSwapRate,
);
router.delete(
  "/swap-rates/:id",
  auditMiddleware("DELETE_SWAP_RATE"),
  platformController.deleteSwapRate,
);

// Vault Oversight
router.get("/vault/overview", platformController.getVaultOverview);

// Currencies
router.get("/currencies", platformController.getAllCurrencies);
router.post(
  "/currencies",
  auditMiddleware("CREATE_CURRENCY"),
  platformController.createCurrency,
);
router.put(
  "/currencies/:id",
  auditMiddleware("UPDATE_CURRENCY"),
  platformController.updateCurrency,
);
router.delete(
  "/currencies/:id",
  auditMiddleware("DELETE_CURRENCY"),
  platformController.deleteCurrency,
);

// ── Payment Gateways ────────────────────────────────────────
router.get("/platform/payment-gateways", platformController.getPaymentGateways);
router.put(
  "/platform/payment-gateways/:id",
  auditMiddleware("UPDATE_PAYMENT_GATEWAY"),
  platformController.updatePaymentGateway,
);

// BC Token Config
router.get("/bc-token/config", platformController.getBcTokenConfig);
router.put(
  "/bc-token/config",
  auditMiddleware("UPDATE_BC_TOKEN_CONFIG"),
  platformController.updateBcTokenConfig,
);

// Referrals & Agents
router.get("/referral/stats", referralController.getGlobalReferralStats);
router.get("/referral/agents", referralController.getAgents);
router.put("/referral/agents/:id", referralController.updateAgent);

// ── Logs & Monitoring ──────────────────────────────────────
router.get("/logs/login", miscController.getLoginHistory);
router.get("/login-logs", securityController.getAllLoginLogs);
router.get("/blacklist/ips", securityController.getBlacklist);
router.post("/blacklist/ips/block", securityController.blockIp);
router.post(
  "/blacklist/ips/:id/unblock",
  securityController.removeFromBlacklist,
);
router.get("/logs/attempts", miscController.getLoginAttempts);
router.get("/logs/system", miscController.getSystemLogs);

// ── Board Management ──────────────────────────────────────
router.get("/boards", boardController.getAllBoards);
router.get("/boards/:id", boardController.getBoardById);
router.post(
  "/boards",
  auditMiddleware("CREATE_BOARD"),
  boardController.createBoard,
);
router.put(
  "/boards/:id",
  auditMiddleware("UPDATE_BOARD"),
  boardController.updateBoard,
);
router.delete(
  "/boards/:id",
  auditMiddleware("DELETE_BOARD"),
  boardController.deleteBoard,
);

// ── Bank Setting ─────────────────────────────────────────
// Banks (은행 목록)
router.get("/bank-setting/banks", bankSettingController.getBanks);
router.post(
  "/bank-setting/banks",
  auditMiddleware("CREATE_BANK"),
  bankSettingController.addBank,
);
router.put(
  "/bank-setting/banks/:bankIdx",
  auditMiddleware("UPDATE_BANK"),
  bankSettingController.updateBank,
);
router.delete(
  "/bank-setting/banks/:bankIdx",
  auditMiddleware("DELETE_BANK"),
  bankSettingController.deleteBank,
);

// Charge Banks (충전 은행)
router.get("/bank-setting/charge-banks", bankSettingController.getChargeBanks);
router.post(
  "/bank-setting/charge-banks",
  auditMiddleware("CREATE_CHARGE_BANK"),
  bankSettingController.addChargeBank,
);
router.put(
  "/bank-setting/charge-banks/:bankIdx",
  auditMiddleware("UPDATE_CHARGE_BANK"),
  bankSettingController.updateChargeBank,
);
router.put(
  "/bank-setting/charge-banks/:bankIdx/auto",
  auditMiddleware("TOGGLE_CHARGE_BANK_AUTO"),
  bankSettingController.toggleAutoYN,
);
router.delete(
  "/bank-setting/charge-banks/:bankIdx",
  auditMiddleware("DELETE_CHARGE_BANK"),
  bankSettingController.deleteChargeBank,
);

// ── Event Setting ──────────────────────────────────────
// General Event Settings
router.get("/event-setting", eventSettingController.getEventSettings);
router.put("/event-setting", eventSettingController.updateEventSettings);

// Charge Events (돌발 이벤트) – routes are accessed via the proxy at /api/admin/...
router.get(
  "/event-setting/charge-events",
  eventSettingController.getChargeEvents,
);
router.post(
  "/event-setting/charge-events",
  eventSettingController.createChargeEvent,
);
router.put(
  "/event-setting/charge-events/:id",
  eventSettingController.updateChargeEvent,
);
router.delete(
  "/event-setting/charge-events/:id",
  eventSettingController.deleteChargeEvent,
);

// ── Manager Setting ──────────────────────────────────────
// Admin IP management
router.get("/manager-setting/ips", managerSettingController.getAdminIPs);
router.post(
  "/manager-setting/ips",
  auditMiddleware("CREATE_ADMIN_IP"),
  managerSettingController.addAdminIP,
);
router.delete(
  "/manager-setting/ips/:adminIPIdx",
  auditMiddleware("DELETE_ADMIN_IP"),
  managerSettingController.deleteAdminIP,
);

// Manager account management
router.get("/manager-setting/managers", managerSettingController.getManagers);
router.get(
  "/manager-setting/managers/:managerIdx",
  managerSettingController.getManagerDetail,
);
router.post(
  "/manager-setting/check-credentials",
  managerSettingController.checkCredentials,
);
router.post(
  "/manager-setting/managers",
  auditMiddleware("CREATE_MANAGER"),
  managerSettingController.createManager,
);
router.put(
  "/manager-setting/managers/:managerIdx",
  auditMiddleware("UPDATE_MANAGER"),
  managerSettingController.updateManager,
);

// ── Alarm Setting ──────────────────────────────────────
router.get("/alarm-setting", alarmSettingController.getAlarmSettings);
router.post(
  "/alarm-setting/update",
  alarmSettingController.updateAlarmSettings,
);

// Rules Management
router.get("/rules", ruleController.getAllRules);
router.post(
  "/rules",
  auditMiddleware("CREATE_RULE"),
  ruleController.createRule,
);
router.put(
  "/rules/:id",
  auditMiddleware("UPDATE_RULE"),
  ruleController.updateRule,
);
router.delete(
  "/rules/:id",
  auditMiddleware("DELETE_RULE"),
  ruleController.deleteRule,
);
router.put(
  "/rules/:id/active",
  auditMiddleware("TOGGLE_RULE_ACTIVE"),
  ruleController.toggleActive,
);
router.put(
  "/rules/:id/order",
  auditMiddleware("UPDATE_RULE_ORDER"),
  ruleController.updateOrder,
);

// Guides Management
router.get("/guides", guideController.getAllGuides);
router.post(
  "/guides",
  auditMiddleware("CREATE_GUIDE"),
  guideController.createGuide,
);
router.put(
  "/guides/:id",
  auditMiddleware("UPDATE_GUIDE"),
  guideController.updateGuide,
);
router.delete(
  "/guides/:id",
  auditMiddleware("DELETE_GUIDE"),
  guideController.deleteGuide,
);
router.put(
  "/guides/:id/active",
  auditMiddleware("TOGGLE_GUIDE_ACTIVE"),
  guideController.toggleActive,
);
router.put(
  "/guides/:id/order",
  auditMiddleware("UPDATE_GUIDE_ORDER"),
  guideController.updateOrder,
);

// Message Templates Management
router.get("/messages/templates", messageTemplateController.getAllTemplates);
router.get(
  "/messages/templates/:id",
  messageTemplateController.getTemplateById,
);
router.post(
  "/messages/templates",
  auditMiddleware("CREATE_MESSAGE_TEMPLATE"),
  messageTemplateController.createTemplate,
);
router.put(
  "/messages/templates/:id",
  auditMiddleware("UPDATE_MESSAGE_TEMPLATE"),
  messageTemplateController.updateTemplate,
);
router.delete(
  "/messages/templates/:id",
  auditMiddleware("DELETE_MESSAGE_TEMPLATE"),
  messageTemplateController.deleteTemplate,
);

// General Messages Management
router.get("/messages", messageController.getAllMessages);
router.post(
  "/messages",
  auditMiddleware("SEND_MESSAGE"),
  messageController.sendMessage,
);
router.get("/messages/:id", messageController.getMessageDetail);
router.delete(
  "/messages/:id",
  auditMiddleware("DELETE_MESSAGE"),
  messageController.deleteMessage,
);
router.post(
  "/messages/delete-selected",
  auditMiddleware("DELETE_SELECTED_MESSAGES"),
  messageController.deleteSelectedMessages,
);
router.post(
  "/messages/delete-all",
  auditMiddleware("DELETE_ALL_MESSAGES"),
  messageController.deleteAllMessages,
);

// ── FAQ Management ──────────────────────────────────────
router.get("/faqs", faqController.getAllFaqs);
router.post("/faqs", auditMiddleware("CREATE_FAQ"), faqController.createFaq);
router.put("/faqs/:id", auditMiddleware("UPDATE_FAQ"), faqController.updateFaq);
router.delete(
  "/faqs/:id",
  auditMiddleware("DELETE_FAQ"),
  faqController.deleteFaq,
);
router.put(
  "/faqs/:id/active",
  auditMiddleware("TOGGLE_FAQ_ACTIVE"),
  faqController.toggleActive,
);
router.put(
  "/faqs/:id/order",
  auditMiddleware("UPDATE_FAQ_ORDER"),
  faqController.updateOrder,
);

// ── Chat Moderation ──────────────────────────────────────────
router.get("/chat/messages", chatController.getAllMessages);
router.delete("/chat/messages/:id", chatController.deleteMessage);
router.delete("/chat/clear", chatController.clearChat);

// ── KYC Management ──────────────────────────────────────────
router.get("/kyc/submissions", kycController.getAllSubmissions);
router.put("/kyc/submissions/:id/status", kycController.updateStatus);

// ── Responsible Gambling ─────────────────────────────────────
router.get("/responsible/exclusions", responsibleController.getAllExclusions);
router.delete("/responsible/exclusions/:id", responsibleController.cancelExclusion);
router.get("/responsible/limits", responsibleController.getAllLimits);

// ── Audit Logs ──────────────────────────────────────────────
router.get("/platform/audit-logs", auditController.getAllLogs);

module.exports = router;
