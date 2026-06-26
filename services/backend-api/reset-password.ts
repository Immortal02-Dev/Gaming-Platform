import db from "./config/db";
import bcrypt from "bcrypt";

async function resetPassword() {
    try {
        const password = "password123";
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await db.execute("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, 1]);

        console.log("Password reset successfully!");
        console.log("Username: user");
        console.log("Password: password123");
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

resetPassword();
