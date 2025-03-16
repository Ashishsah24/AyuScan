import React, { useEffect, useState } from "react";

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [recommendations, setRecommendations] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem("session"));
        if (!session) {
            alert("Please log in to view reports.");
            return;
        }

        fetch(`http://localhost:5000/api/get-diagnostics/${session.email}`)
            .then((res) => res.json())
            .then((data) => {
                setReports(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to fetch reports.");
                setLoading(false);
            });
    }, []);

    const handleGetRecommendations = async (diagnostic) => {
        try {
            const res = await fetch("http://localhost:5000/api/get-recommendations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: diagnostic.user_email,
                    diagnostic_id: diagnostic.id,
                    symptoms: diagnostic.symptoms,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                setRecommendations((prev) => ({ ...prev, [diagnostic.id]: data.remedies }));
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
            <h2 className="text-2xl font-semibold text-[#3d5240] mb-6">📊 My Reports</h2>

            {loading ? (
                <p>Loading reports...</p>
            ) : reports.length === 0 ? (
                <p>No diagnostic records found.</p>
            ) : (
                <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
                    {reports.map((report, index) => (
                        <div key={index} className="p-4 border-b border-gray-200">
                            <p><strong>Date:</strong> {new Date(report.created_at).toLocaleDateString()}</p>
                            <p><strong>Pulse Rate:</strong> {report.pulse_rate} bpm</p>
                            <p><strong>Symptoms:</strong> {report.symptoms}</p>
                            <p><strong>Diagnosis:</strong> {report.diagnosis}</p>

                            <button
                                onClick={() => handleGetRecommendations(report)}
                                className="bg-green-600 text-white px-4 py-2 rounded mt-4"
                            >
                                View Recommendations
                            </button>

                            {recommendations[report.id] && (
                                <div className="bg-green-50 p-4 border border-green-300 rounded mt-4">
                                    <strong className="text-green-700">Recommended Remedies:</strong>
                                    <p className="mt-2 text-[#2d3a2d]">{recommendations[report.id]}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Reports;