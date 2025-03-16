const cron = require("node-cron");
const sendSMSReminder = require("./smsService");
const sendEmailReminder = require("./emailService");
const mysql = require("mysql2");

// Create DB connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ayuscan",
});

// ⏰ Run every day at 9 AM
cron.schedule("0 9 * * *", () => {
    console.log("⏰ Running daily reminder job...");

    // Fetch all users from DB
    db.query("SELECT email, phone FROM users", async (err, results) => {
        if (err) {
            console.error("❌ Error fetching users:", err);
            return;
        }

        for (const user of results) {
            const { email, phone } = user;

            // ✅ Send SMS
            const smsRes = await sendSMSReminder(phone, "🌿 AyuScan: Your daily wellness tip is ready!");
            console.log(`📱 SMS to ${phone}:`, smsRes.success ? "✅ Sent" : "❌ Failed");

            // ✅ Send Email
            const emailRes = await sendEmailReminder(
                email,
                "🌿 AyuScan Daily Reminder",
                "Namaste! Check your wellness dashboard for today's Ayurvedic tips."
            );
            console.log(`📧 Email to ${email}:`, emailRes.success ? "✅ Sent" : "❌ Failed");
        }
    });
});