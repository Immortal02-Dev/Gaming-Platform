import db from "./config/db";

async function check() {
    const [rows]: any = await db.query("DESCRIBE boards");
    rows.forEach((r: any) => console.log(r.Field));
    process.exit(0);
}

check();
