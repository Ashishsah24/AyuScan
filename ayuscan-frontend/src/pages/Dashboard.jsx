import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiActivity, FiMessageCircle, FiFileText, FiShoppingBag } from "react-icons/fi";
import { FaUserCircle } from 'react-icons/fa';
import "../App.css"

const Dashboard = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem("session"));
        if (!session) {
            navigate("/");
        } else {
            setUserEmail(session.email);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("session");
        navigate("/");
    };

    const features = [
        {
            title: "Diagnostic",
            icon: <FiActivity className="text-3xl text-[#4d6652]" />,
            description: "Analyze your current health state using pulse & symptoms.",
            link: "/diagnostic",
        },
        {
            title: "AyuGPT",
            icon: <FiMessageCircle className="text-3xl text-[#4d6652]" />,
            description: "Chat with our Ayurvedic AI for personalized guidance.",
            link: "/ayugpt",
        },
        {
            title: "View Report",
            icon: <FiFileText className="text-3xl text-[#4d6652]" />,
            description: "Get insights on your dosha balance and wellness journey.",
            link: "/reports",
        },
        {
            title: "Recommendations",
            icon: <FiShoppingBag className="text-3xl text-[#4d6652]" />,
            description: "Personalized herbs, diet, yoga & tips tailored to you.",
            link: "/recommendations",
        },
    ];

    return (
        <div className="min-h-screen bg-[#edf4ee] p-6 flex flex-col">
            {/* Top Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', alignItems: 'flex-start' }} className="flex justify-between items-center mb-6">
                {/* Left: Profile */}
                <div className="text-sm text-gray-600">
                    Profile -  <FaUserCircle className="inline-block text-xl text-green-1500" />
                </div>

                {/* Center: Welcome Message */}
                <h1 className="text-2xl font-semibold text-[#3d5240] text-center flex-grow">
                    Welcome to AyuScan 🌿
                </h1>

                {/* Right: Logout */}
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                    Logout
                </button>
            </div>

            {/* Horizontally aligned Feature Cards */}
            <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', gap: '16px', paddingBottom: '16px', paddingLeft: '8px', paddingRight: '8px' }}/*className="flex flex-row overflow-x-auto gap-4 pb-4 px-1"*/>
                {features.map((feature, index) => (
                    <div
                        key={index}
                        style={{ border: '1px solid grey', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'space-around', alignItems: 'space-around', height: '300px' }}
                        className="min-w-[260px] bg-white border border-green-200 rounded-xl shadow-sm hover:shadow-md p-5 flex-shrink-0 transition-transform transform hover:scale-105"
                    >
                        <div className="flex items-center gap-4 mb-3">
                            <div className="bg-green-100 p-3 rounded-full">{feature.icon}</div>
                            <h3 className="text-lg font-semibold text-[#4d6652]">{feature.title}</h3>
                        </div>
                        <p className="text-sm text-gray-700">{feature.description}</p>
                        <Link
                            to={feature.link}
                            className="inline-block mt-4 text-green-700 text-sm font-medium hover:underline"
                        >
                            <button style={{ width: '50%' }}>
                                Go
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;