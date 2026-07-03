import db from "./config/db";

async function seedKyc() {
    try {
        console.log("Seeding KYC submissions...");
        
        // Find some users first
        const [users]: any = await db.execute("SELECT id FROM users LIMIT 3");
        
        if (!users || users.length === 0) {
            console.log("No users found to attach KYC submissions.");
            process.exit(1);
        }

        for (let i = 0; i < users.length; i++) {
            const userId = users[i].id;
            const idType = ["National ID", "Passport", "Driver License"][i % 3];
            const fullName = "Test User " + userId;
            const idNumber = "ID-" + Math.floor(Math.random() * 1000000000);
            const status = ["pending", "approved", "rejected"][i % 3];
            
            await db.execute(
                `INSERT INTO kyc_submissions 
                (user_id, id_type, id_number, full_name, status, id_front_url, id_back_url, selfie_url) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    userId, 
                    idType, 
                    idNumber, 
                    fullName, 
                    status, 
                    "https://via.placeholder.com/150?text=ID+Front", 
                    "https://via.placeholder.com/150?text=ID+Back", 
                    "https://via.placeholder.com/150?text=Selfie"
                ]
            );
        }

        console.log("KYC Seed success!");
        process.exit(0);
    } catch (err) {
        console.error("KYC Seed failed with error:", err);
        process.exit(1);
    }
}

seedKyc();
