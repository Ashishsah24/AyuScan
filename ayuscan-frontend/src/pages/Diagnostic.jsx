import React, { useState } from "react";

const Diagnostic = () => {
    const [pulseRate, setPulseRate] = useState(72); // Replace with real sensor data
    const [symptoms, setSymptoms] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [isDiagnosed, setIsDiagnosed] = useState(false);

    const handleDiagnosis = () => {
        if (!symptoms) {
            alert("Please enter your symptoms.");
            return;
        }

        // Example AI logic (replace with real AyuGPT response)
        const generatedDiagnosis =
            symptoms.toLowerCase().includes("fatigue")
                ? "Possible stress-related fatigue. Recommended meditation & Ashwagandha."
                : "No major concerns detected. Maintain a balanced lifestyle.";

        setDiagnosis(generatedDiagnosis);
        setIsDiagnosed(true);
    };

    const handleSaveDiagnostic = async () => {
        const session = JSON.parse(localStorage.getItem("session"));
        if (!session) {
            alert("Please log in to save results.");
            return;
        }

        const payload = {
            email: session.email,
            pulse_rate: pulseRate,
            symptoms: symptoms,
            diagnosis: diagnosis,
        };

        try {
            const res = await fetch("http://localhost:5000/api/save-diagnostic", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (res.ok) {
                alert("Diagnostic saved successfully!");
            } else {
                alert("Error: " + data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Server error.");
        }
    };

    return (
        <div className="min-h-screen bg-[#f2f7f3] p-6">
            <h2 className="text-2xl font-semibold text-[#3d5240] mb-6">🩺 Health Diagnostic</h2>

            <div className="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto space-y-4">
                {/* Pulse Rate */}
                <div>
                    <label>Pulse Rate:</label>
                    <input
                        type="number"
                        value={pulseRate}
                        readOnly
                        className="w-full border p-2 rounded bg-gray-100"
                    />
                </div>

                {/* Symptoms Input */}
                <div>
                    <label>Enter Your Symptoms:</label>
                    <input
                        type="text"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        placeholder="e.g., Fatigue, headache"
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* Diagnose Button */}
                <button
                    onClick={handleDiagnosis}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Start Diagnosis
                </button>

                {/* Diagnosis Result */}
                {isDiagnosed && (
                    <div className="bg-green-50 p-4 border border-green-300 rounded">
                        <strong className="text-green-700">Diagnosis:</strong>
                        <p className="mt-2 text-[#2d3a2d]">{diagnosis}</p>

                        {/* Save Button */}
                        <button
                            onClick={handleSaveDiagnostic}
                            className="w-full bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
                        >
                            Save Diagnostic Result
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Diagnostic;
