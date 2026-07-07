import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
    stationLoginStart,
    stationLoginSuccess,
    stationLoginFailure
} from "./StationAUthSlice"
import { useLocation } from "react-router-dom";
import API from "../../api";


const StationAuth = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const stationName =
        location.state?.stationName
            ? location.state.stationName.toUpperCase()
            : "STATION";


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [openModal, setOpenModal] = useState(false);

    //for handle registration
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {

            const res = await API.post(
                "/auth/register",
                {
                    username: formData.userName,
                    email: formData.email,
                    password: formData.password,
                    apartment: id,
                }
            );
            console.log(res.data);

            alert("Registration successful!");

            setOpenModal(false);

            setFormData({
                userName: "",
                email: "",
                password: ""
            });


        } catch (error) {

            alert(
                error.response?.data?.message || "Registration failed"
            );

        }
    };

    const handleSignUpCloseModal = () => {
        setOpenModal(false);
        setFormData({
            username: "",
            email: "",
            password: ""
        });
    }

    //login handler
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            dispatch(stationLoginStart());


            const res = await API.post(
                "/auth/login",
                {
                    email,
                    password,
                    apartment: id
                }
            );


            dispatch(
                stationLoginSuccess(res.data)
            );


            // save token
            localStorage.setItem(
                "token",
                res.data.token
            );


            // save user data
            localStorage.setItem(
                "stationAuth",
                JSON.stringify(res.data)
            );



            if (res.data.user.role === "owner") {

                navigate(
                    `/dashboard/owner/${id}`
                );

            } else {

                navigate(
                    `/dashboard/user/${id}`
                );

            }


        } catch (error) {

            dispatch(
                stationLoginFailure(
                    error.response?.data?.message ||
                    "Login failed"
                )
            );

            alert(
                error.response?.data?.message ||
                "Login failed"
            );

        }

    };
    //close login model
    const handleCloseModal = () => {
        navigate(`/view-stations`);
        setEmail("");
        setPassword("");
    }




    return (

        <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center px-4">


            {/* Glow Effects */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-400/20 blur-3xl rounded-full"></div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <button
                    onClick={() => handleCloseModal()}
                    className="absolute top-3 right-5 text-gray-600 text-xl"
                >
                    ✕
                </button>
                <div className="p-6 md:p-8">

                    {/* Header */}
                    <div className="mb-8">

                        <h2 className="text-4xl font-bold text-white mb-2">
                            WELCOME TO <span className="text-blue-400">{stationName}</span> ..!
                        </h2>



                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        autoComplete="off"
                        className="space-y-3">

                        <div>
                            <label className="block mb-2 text-sm text-gray-400">
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-900/70 border border-gray-700 focus:border-blue-500 outline-none rounded-xl px-5 py-3 transition"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm text-gray-400">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                autoComplete="new-password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full mb-5 bg-gray-900/70 border border-gray-700 focus:border-blue-500 outline-none rounded-xl px-5 py-3 transition"
                            />
                        </div>



                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 bg-blue-500 hover:bg-blue-600"
                        >
                            Login
                        </button>

                        <div className="flex items-center justify-center text-sm">

                            <p className="text-gray-400">
                                Don't have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => setOpenModal(true)} className="text-blue-400 hover:text-blue-300">
                                    Sign up
                                </button>
                            </p>

                        </div>


                    </form>
                    {openModal && (
                        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

                            <div className="bg-white w-[90%] max-w-md rounded-2xl p-6 relative text-black">

                                {/* CLOSE BUTTON */}
                                <button
                                    onClick={handleSignUpCloseModal}
                                    className="absolute top-3 right-5 text-gray-600 text-xl hover:text-black"
                                >
                                    ✕
                                </button>

                                {/* TITLE */}
                                <h2 className="text-2xl font-bold mb-6 text-center">
                                    User Registration
                                </h2>

                                {/* FORM */}
                                <form
                                    onSubmit={handleRegister}
                                    className="space-y-4"
                                    autoComplete="off"
                                >

                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        name="userName"
                                        value={formData.userName}
                                        onChange={handleInputChange}
                                        className="w-full p-3 rounded-lg border outline-none focus:border-blue-500"
                                        required
                                    />

                                    <input
                                        type="email"
                                        placeholder="Email"
                                        name="email"
                                        autoComplete="off"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full p-3 rounded-lg border outline-none focus:border-blue-500"
                                        required
                                    />

                                    <input
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={formData.password}
                                        autoComplete="new-password"
                                        onChange={handleInputChange}
                                        className="w-full p-3 rounded-lg border outline-none focus:border-blue-500"
                                        required
                                    />

                                    <button
                                        type="submit"
                                        className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition w-full font-semibold"
                                    >
                                        Register
                                    </button>

                                </form>

                            </div>

                        </div>
                    )}

                    {/* Footer */}
                    <p className="text-center text-gray-500 mt-8 text-sm">
                        powered by <span className="text-blue-400 font-semibold">VoltSlot</span>
                    </p>

                </div>

            </div>
        </div>
    );
};

export default StationAuth;