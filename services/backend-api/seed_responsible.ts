import db from "./config/db";

async function seedResponsible() {
    try {
        console.log("Seeding Responsible Gaming data...");
        
        // Find some users first
        const [users]: any = await db.execute("SELECT id FROM users LIMIT 3");
        
        if (!users || users.length === 0) {
            console.log("No users found to attach data.");
            process.exit(1);
        }

        for (let i = 0; i < users.length; i++) {
            const userId = users[i].id;
            
            // Seed user_self_exclusion
            const type = i % 2 === 0 ? "exclusion" : "cooldown";
            const duration = [7, 30, 90][i % 3];
            const reason = ["Need a break", "Losses too high", "Requested by family"][i % 3];
            
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + duration);
            
            await db.execute(
                `INSERT INTO user_self_exclusion 
                (user_id, type, duration_days, end_date, reason) 
                VALUES (?, ?, ?, ?, ?)`,
                [userId, type, duration, endDate, reason]
            );

            // Seed user_gambling_limits
            const dailyLoss = 100000 * (i + 1);
            const weeklyLoss = dailyLoss * 5;
            const monthlyLoss = dailyLoss * 20;
            const dailyDeposit = 500000 * (i + 1);
            
            await db.execute(
                `INSERT INTO user_gambling_limits 
                (user_id, daily_loss_limit, weekly_loss_limit, monthly_loss_limit, daily_deposit_limit) 
                VALUES (?, ?, ?, ?, ?)`,
                [userId, dailyLoss, weeklyLoss, monthlyLoss, dailyDeposit]
            );
        }

        console.log("Responsible Gaming Seed success!");
        process.exit(0);
    } catch (err: any) {
        // If tables don't exist, log it out so we can see
        console.error("Seed failed with error:", err.message);
        process.exit(1);
    }
}

seedResponsible();
