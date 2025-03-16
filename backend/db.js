const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root", // replace with your MySQL user
    password: "", // replace with your MySQL password
    database: "ayuscan",
});

db.connect((err) => {
    if (err) throw err;
    console.log("✅ Connected to MySQL Database");
});

module.exports = db;
