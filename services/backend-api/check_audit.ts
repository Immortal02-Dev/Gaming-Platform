import db from "./config/db";

async function checkAuditLogs() {
    try {
        const [rows]: any = await db.query("SELECT * FROM admin_audit_logs WHERE action = 'SEND_MESSAGE' ORDER BY created_at DESC LIMIT 10");
        console.log("Recent SEND_MESSAGE audit logs:", JSON.stringify(rows, null, 2));
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

checkAuditLogs();
