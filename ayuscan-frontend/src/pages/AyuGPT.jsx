import React, { useState } from "react";

const AyuGPT = () => {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!input.trim()) return;
        setLoading(true);
        setResponse("");

        const prompt = `You are AyuGPT, an expert in Ayurveda. Be concise and use a warm, holistic tone. Question: ${input}`;

        try {
            const res = await fetch(
                "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyBMexJD_yrIiEJu4pV_p7Ddhe0vJC4nmDY",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                role: "user",
                                parts: [{ text: prompt }],
                            },
                        ],
                    }),
                }
            );

            const data = await res.json();
            console.log("Gemini response:", data);

            const aiReply =
                data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                "No response from AyuGPT.";

            setResponse(aiReply);
        } catch (error) {
            console.error("Error fetching Gemini response:", error);
            setResponse("Error reaching AyuGPT. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f4f7f6] text-[#2d3a2d] p-6 flex flex-col items-center">
            <h2 className="text-3xl font-semibold mb-4">🧘 Ask AyuGPT</h2>

            <div className="w-full max-w-2xl bg-white rounded-xl shadow p-6">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about your health, Ayurveda remedies, lifestyle tips..."
                    className="w-full p-3 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
                    rows={4}
                />

                <button
                    onClick={handleSubmit}
                    className="bg-[#7fa176] text-white px-6 py-2 rounded hover:bg-[#6a8f65] transition-all"
                    disabled={loading}
                >
                    {loading ? "Thinking..." : "Ask AyuGPT"}
                </button>

                {response && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-300 rounded whitespace-pre-line">
                        <strong className="text-green-700">AyuGPT says:</strong>
                        <p className="mt-2 text-[#2d3a2d]">{response}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AyuGPT;
