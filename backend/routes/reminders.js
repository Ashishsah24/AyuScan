const express = require("express");
const db = require("../db");
const router = express.Router();

// Save Reminder
router.post("/add-reminder", (req, res) => {
    const { email, reminder_type, reminder_time } = req.body;

    db.query(
        "INSERT INTO reminders (user_email, reminder_type, reminder_time) VALUES (?, ?, ?)",
        [email, reminder_type, reminder_time],
        (err, result) => {
            if (err) return res.status(500).json({ message: "Database error", error: err });
            res.status(201).json({ message: "Reminder added successfully!" });
        }
    );
});

// Get User Reminders
router.get("/get-reminders/:email", (req, res) => {
    const { email } = req.params;

    db.query(
        "SELECT * FROM reminders WHERE user_email = ? ORDER BY reminder_time",
        [email],
        (err, results) => {
            if (err) return res.status(500).json({ message: "Database error", error: err });
            res.status(200).json(results);
        }
    );
});

// Delete Reminder
router.delete("/delete-reminder/:id", (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM reminders WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        res.status(200).json({ message: "Reminder deleted successfully!" });
    });
});

module.exports = router;