import express, { Request, Response } from "express"; // Restart triggered
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
// NOTE: importing db triggers db.ts which loads its OWN dotenv block first,
// then creates the connection pool. Must come AFTER the imports but the env
// loading inside db.ts runs before the pool is created — so order is safe.
import db from "./config/db";

// ─────────────────────────────────────────────────────────────────────────────
// CHANGE: Added environment-aware dotenv loading (split .env / .env.local)
// ─────────────────────────────────────────────────────────────────────────────
// This block is a SECONDARY dotenv load (db.ts already loaded it above).
// It ensures any server.ts-specific vars (PORT, JWT_SECRET, etc.) are also
// available if something reads them before db.ts is fully initialised.
//
// LOCAL  → loads backend/.env.local
// LIVE (Vercel) → SKIPPED. All vars must be set in:
//                 Dashboard → Project → Settings → Environment Variables
if (process.env.NODE_ENV !== "production") {
  const envPath = path.resolve(__dirname, "..", ".env.local");
  const result = dotenv.config({ path: envPath });
  if (result.error) {
    // Fallback to .env if .env.local doesn't exist
    dotenv.config({ path: path.resolve(__dirname, "..", ".env") });
  }
}



// Route imports — using require() because these files are still plain JS.
// CHANGE: uploadRoutes is the only route imported as ES module (it was
//         rewritten in TypeScript to support multer file uploads).
const authRoutes = require("./routes/authRoutes");
const gameRoutes = require("./routes/gameRoutes");
const providerRoutes = require("./routes/providerRoutes");
const betRoutes = require("./routes/betRoutes");
const sportRoutes = require("./routes/sportRoutes");
const lotteryRoutes = require("./routes/lotteryRoutes");
const promotionRoutes = require("./routes/promotionRoutes");
const questRoutes = require("./routes/questRoutes");
const vipRoutes = require("./routes/vipRoutes");
const referralRoutes = require("./routes/referralRoutes");
const sponsorshipRoutes = require("./routes/sponsorshipRoutes");
const bonusRoutes = require("./routes/bonusRoutes");
const swapRoutes = require("./routes/swapRoutes");
const tradingRoutes = require("./routes/tradingRoutes");
const walletRoutes = require("./routes/walletRoutes");
const adminRoutes = require("./routes/adminRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const webhookRoutes = require("./routes/webhookRoutes");
const ruleRoutes = require("./routes/ruleRoutes");
const guideRoutes = require("./routes/guideRoutes");
const chatRoutes = require("./routes/chatRoutes");
const responsibleRoutes = require("./routes/responsibleRoutes");
// CHANGE: uploadRoutes converted to TypeScript (supports multer image uploads)
import uploadRoutes from "./routes/uploadRoutes";

const securityMiddleware = require("./middleware/securityMiddleware");

const app = express();

// Middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});
app.use(
  cors({
    origin: true, // Reflects the request origin in the Access-Control-Allow-Origin header
    credentials: true,
  })
);
app.use(securityMiddleware);
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ── Routes ────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/bets", betRoutes);
app.use("/api/sports", sportRoutes);
app.use("/api/lottery", lotteryRoutes);
app.use("/api/promotions", promotionRoutes);
app.use("/api/quests", questRoutes);
app.use("/api/vip", vipRoutes);
app.use("/api/referral", referralRoutes);
app.use("/api/sponsorship", sponsorshipRoutes);
app.use("/api/bonus", bonusRoutes);
app.use("/api/swap", swapRoutes);
app.use("/api/trading", tradingRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/webhooks", webhookRoutes);
app.use("/api/rules", ruleRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/responsible", responsibleRoutes);

// ── Health check ──────────────────────────────────────
app.get("/", (req: Request, res: Response) => {
  res.send("BC Game API is running (TypeScript)...");
});

// Test DB Connection
app.get("/api/test", async (req: Request, res: Response) => {
  try {
    const [rows]: any = await db.query("SELECT 1 + 1 AS solution");
    res.json({
      status: "success",
      message: "Database connected successfully",
      data: rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Database connection failed",
      error: error.message,
    });
  }
});

// PORT falls back to 5000 locally; Vercel injects its own PORT automatically.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  // CHANGE: Notification scheduler started here (inside listen callback) so it
  // only runs once the server is fully bound — avoids race conditions.
  const notificationScheduler = require('./cron/notificationScheduler');
  notificationScheduler.start();

  // CHANGE: Sports sync (NBA + Soccer) triggered on startup and every 10 min.
  // Uses child_process exec so the sync script runs in its own process and
  // doesn't block the main server thread.
  // NOTE: On Vercel serverless this interval won't persist between invocations.
  //       Consider a Vercel Cron Job for reliable scheduling in production.
  const { exec } = require('child_process');
  exec('npm run sync:sports', (err: any) => {
    if (err) console.error("❌ Initial Global Sync Failed:", err);
    else console.log("🌍 Initial Global internal sync triggered.");
  });

  // Recurring sync every 10 minutes (local / always-on server only)
  setInterval(() => {
    exec('npm run sync:sports');
  }, 10 * 60 * 1000);
});
