import React, { useState, useEffect } from "react";

const Reminders = () => {
    const [reminders, setReminders] = useState([]);
    const [reminderType, setReminderType] = useState("Yoga");
    const [reminderTime, setReminderTime] = useState("");

    useEffect(() => {
        fetchReminders();
    }, []);

    const fetchReminders = async () => {
        const session = JSON.parse(localStorage.getItem("session"));
        if (!session) {
            alert("Please log in to view reminders.");
            return;
        }

        try {
            const res = await fetch(`http://localhost:5000/api/get-reminders/${session.email}`);
            const data = await res.json();
            setReminders(data);
        } catch (err) {
            console.error(err);
            alert("Failed to fetch reminders.");
        }
    };

    const handleAddReminder = async () => {
        const session = JSON.parse(localStorage.getItem("session"));
        if (!session) {
            alert("Please log in to set reminders.");
            return;
        }

        const payload = {
            email: session.email,
            reminder_type: reminderType,
            reminder_time: reminderTime,
        };

        try {
            const res = await fetch("http://localhost:5000/api/add-reminder", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (res.ok) {
                fetchReminders(); // Refresh reminders list
                alert("Reminder added!");
            } else {
                alert("Error: " + data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Server error.");
        }
    };

    const handleDeleteReminder = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/delete-reminder/${id}`, { method: "DELETE" });
            fetchReminders();
        } catch (err) {
            console.error(err);
            alert("Failed to delete reminder.");
        }
    };

    return (
        <div className="min-h-screen bg-[#f2f7f3] p-6">
            <h2 className="text-2xl font-semibold text-[#3d5240] mb-6">🔔 My Reminders</h2>

            <div className="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto">
                <label>Reminder Type:</label>
                <select
                    value={reminderType}
                    onChange={(e) => setReminderType(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                >
                    <option value="Yoga">Yoga</option>
                    <option value="Meditation">Meditation</option>
                    <option value="Herbs">Herbal Remedies</option>
                    <option value="Hydration">Drink Water</option>
                </select>

                <label>Time:</label>
                <input
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                />

                <button
                    onClick={handleAddReminder}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Add Reminder
                </button>
            </div>

            <h3 className="text-xl mt-6">📋 Scheduled Reminders:</h3>
            {reminders.length === 0 ? (
                <p>No reminders set.</p>
            ) : (
                reminders.map((reminder) => (
                    <div key={reminder.id} className="p-4 border-b border-gray-200">
                        <p>
                            <strong>{reminder.reminder_type}</strong> at{" "}
                            {reminder.reminder_time}
                        </p>
                        <button
                            onClick={() => handleDeleteReminder(reminder.id)}
                            className="text-red-500 hover:underline"
                        >
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Reminders;