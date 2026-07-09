import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLoginSuccess } from "../auth/AdminAuthSlice";

const AdminLogin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/auth/admin/login", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const data = await response.json();
            if (response.ok) {

                dispatch(
                    adminLoginSuccess({
                        token: data.token,
                        user: data.user
                    })
                );
                navigate("/admin/admin-dashboard");

                setFormData({
                    email: "",
                    password: "",
                });

            } else {
                alert(data.message);
                return;
            }


        } catch (error) {

            alert("Login failed.Please try again ")

        }

    };

    const hadleCloseModal = () => {
        setFormData({
            email: "",
            password: "",
        })
        navigate("/");
    }

    return (

        <div className="min-h-screen bg-black relative overflow-hidden flex justify-center items-center px-6">

            {/* Background Glow */}
            <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-blue-500 opacity-20 blur-3xl rounded-full"></div>

            <div className="absolute bottom-[-120px] right-[-100px] w-[400px] h-[400px] bg-purple-500 opacity-20 blur-3xl rounded-full"></div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">

                <button
                    onClick={hadleCloseModal}
                    className="absolute top-3 right-5 text-gray-600 text-xl hover:text-white transition"
                >
                    ✕
                </button>
                {/* Title */}
                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold text-white">
                        Admin Login
                    </h1>

                    <p className="text-gray-300 mt-3">
                        Access VoltSpot management dashboard
                    </p>

                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                >

                    {/* Email */}
                    <div>

                        <label className="text-sm text-gray-300">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter admin email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="off"
                            className="w-full mt-2 bg-white/10 border border-white/20 text-white placeholder-gray-400 p-4 rounded-xl outline-none focus:border-blue-400 transition"
                            required
                        />

                    </div>

                    {/* Password */}
                    <div>

                        <label className="text-sm text-gray-300">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                            className="w-full mt-2 bg-white/10 border border-white/20 text-white placeholder-gray-400 p-4 rounded-xl outline-none focus:border-blue-400 transition"
                            required
                        />

                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="mt-4 bg-blue-400 text-black py-4 rounded-xl font-semibold hover:bg-gray-200 transition duration-300"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>

    );
};

export default AdminLogin;