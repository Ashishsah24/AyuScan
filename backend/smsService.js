// smsService.js
const axios = require("axios");

async function sendSMSReminder(phoneNumber, message) {
    try {
        const response = await axios.post("https://textbelt.com/text", {
            phone: phoneNumber,
            message: message,
            key: "textbelt", // Free key for testing (1 SMS/day)
        });

        console.log("SMS Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("SMS sending error:", error.message);
        return null;
    }
}

module.exports = sendSMSReminder;