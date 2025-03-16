const express = require("express");
const db = require("../db");
const router = express.Router();

// Generate Recommendations Based on Diagnostics
router.post("/get-recommendations", (req, res) => {
    const { diagnostic_id, email, symptoms } = req.body;

    // Example recommendation logic (Replace with AI/GPT logic later)
    let remedies = "Maintain hydration and good sleep.";

    if (symptoms.includes("stress")) {
        remedies = "Try Ashwagandha, meditation, and deep breathing.";
    } else if (symptoms.includes("fatigue")) {
        remedies = "Consume Chyawanprash and practice Sun Salutations.";
    }

    // Store recommendations in MySQL
    db.query(
        "INSERT INTO recommendations (user_email, diagnostic_id, remedies) VALUES (?, ?, ?)",
        [email, diagnostic_id, remedies],
        (err, result) => {
            if (err) return res.status(500).json({ message: "Database error", error: err });
            res.status(201).json({ message: "Recommendations generated!", remedies });
        }
    );
});

// Get Recommendations for a User
router.get("/get-user-recommendations/:email", (req, res) => {
    const { email } = req.params;

    db.query(
        "SELECT * FROM recommendations WHERE user_email = ?",
        [email],
        (err, results) => {
            if (err) return res.status(500).json({ message: "Database error", error: err });
            res.status(200).json(results);
        }
    );
});

module.exports = router;
