import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState({ email: "", age: "", phone: "" });
    const [updated, setUpdated] = useState(false);
    const [profilePic, setProfilePic] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem("session"));
        if (session) {
            setUser(session);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
        setUpdated(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProfilePic(file);
        setPreview(URL.createObjectURL(file));
        setUpdated(true);
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append("email", user.email);
            formData.append("age", user.age);
            formData.append("phone", user.phone);
            if (profilePic) formData.append("profilePic", profilePic);

            const res = await fetch("http://localhost:5000/api/update-profile", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                alert("Profile updated successfully!");
                localStorage.setItem("session", JSON.stringify(user));
                setUpdated(false);
            } else {
                alert(data.message || "Update failed.");
            }
        } catch (err) {
            console.error(err);
            alert("Server error.");
        }
    };

    return (
        <div className="min-h-screen bg-[#f2f7f3] p-6">
            <h2 className="text-2xl font-semibold text-[#3d5240] mb-6">👤 Your Profile</h2>

            <div className="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto space-y-4">
                {/* Profile Picture Upload */}
                <div className="text-center mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-2 border border-green-400">
                        <img
                            src={preview || "https://via.placeholder.com/100"}
                            alt="Profile"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-2 file:border file:rounded file:border-green-500 file:text-sm file:bg-white file:text-green-700 hover:file:bg-green-100"
                    />
                </div>

                {/* Profile Form */}
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="w-full border p-2 rounded bg-gray-100"
                    />
                </div>

                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={user.age}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label>Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <button
                    disabled={!updated}
                    onClick={handleSave}
                    className={`w-full py-2 rounded text-white ${updated ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
                        }`}
                >
                    Save Changes
                </button>
            </div>

            {/* Back to Dashboard Button */}
            <Link
                to="/dashboard"
                className="block text-center mt-6 text-[#5b8a72] hover:underline"
            >
                ← Back to Dashboard
            </Link>
        </div>
    );
};

export default Profile;
