const express = require("express");
const db = require("../db");
const router = express.Router();

// Save Diagnostic Result
router.post("/save-diagnostic", (req, res) => {
    const { email, pulse_rate, symptoms, diagnosis } = req.body;

    db.query(
        "INSERT INTO diagnostics (user_email, pulse_rate, symptoms, diagnosis) VALUES (?, ?, ?, ?)",
        [email, pulse_rate, symptoms, diagnosis],
        (err, result) => {
            if (err) return res.status(500).json({ message: "Database error", error: err });
            res.status(201).json({ message: "Diagnostic result saved successfully!" });
        }
    );
});

// Get Diagnostic History
router.get("/get-diagnostics/:email", (req, res) => {
    const { email } = req.params;

    db.query("SELECT * FROM diagnostics WHERE user_email = ? ORDER BY created_at DESC", [email], (err, results) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        res.status(200).json(results);
    });
});

module.exports = router;
