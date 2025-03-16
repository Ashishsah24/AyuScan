const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
    const { email, password, age, phone } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (results.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(
            "INSERT INTO users (email, password, age, phone) VALUES (?, ?, ?, ?)",
            [email, hashedPassword, age, phone],
            (err, result) => {
                if (err) return res.status(500).json({ message: "DB error", error: err });
                res.status(201).json({ message: "User created", user: { email, age, phone } });
            }
        );
    });
});

// Login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) return res.status(500).json({ message: "DB error", error: err });
        if (results.length === 0) return res.status(400).json({ message: "User not found" });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET || "secret123", {
            expiresIn: "1h",
        });

        res.status(200).json({
            message: "Login successful",
            token,
            user: { email: user.email, age: user.age, phone: user.phone },
        });
    });
});
router.post("/update-profile", (req, res) => {
    const { email, age, phone } = req.body;

    db.query(
        "UPDATE users SET age = ?, phone = ? WHERE email = ?",
        [age, phone, email],
        (err, result) => {
            if (err) return res.status(500).json({ message: "Database error", error: err });
            res.status(200).json({ message: "Profile updated" });
        }
    );
});


module.exports = router;
