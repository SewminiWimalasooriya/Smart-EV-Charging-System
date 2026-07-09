import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";

import ringanimation from "../assets/lines1.json";
import spark from "../assets/Sparkles Animation.json";


const FirstInterface = () => {

    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState(false);
    const [image, setImage] = useState(null);

    const fileInputRef = useRef(null);


    const initialForm = {
        apartmentName: "",
        ownerName: "",
        email: "",
        address: "",
        phoneNo: "",
        lat: "",
        lng: "",
    };


    const [formData, setFormData] = useState(initialForm);



    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };



    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            const sendData = new FormData();


            sendData.append("name", formData.apartmentName);
            sendData.append("ownerName", formData.ownerName);
            sendData.append("email", formData.email);
            sendData.append("address", formData.address);
            sendData.append("phone", formData.phoneNo);

            sendData.append("location[lat]", formData.lat);
            sendData.append("location[lng]", formData.lng);


            if (image) {
                sendData.append("image", image);
            }



            const response = await fetch(
                "http://localhost:5000/api/apartment/create",
                {
                    method: "POST",
                    body: sendData,
                }
            );


            const data = await response.json();


            if (response.ok) {

                setFormData(initialForm);
                setImage(null);


                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }


                setOpenModal(false);

            }


        } catch (error) {

            alert("Error sending request : " + error.message);

        }

    };



    const resetForm = () => {

        setFormData(initialForm);
        setImage(null);


        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

    };



    const handleCloseModal = () => {

        setOpenModal(false);
        resetForm();

    };




    return (

        <div className="relative w-screen h-[calc(100vh-64px)] bg-black overflow-hidden">


            <Player
                autoplay
                loop
                src={ringanimation}
                className="absolute inset-0 w-full h-full opacity-70"
            />


            <Player
                autoplay
                loop
                src={spark}
                className="absolute inset-0 w-full h-full opacity-60"
            />



            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">


                <h1 className="text-3xl md:text-5xl font-bold text-blue-400 mb-6">
                    Your Journey. Your Charge. Your Time.
                </h1>


                <h2 className="text-xl md:text-3xl text-green-400 font-semibold mb-5">
                    Smart EV Charging Reservation Platform
                </h2>


                <p className="text-white max-w-3xl text-base md:text-lg mb-10">
                    Locate nearby charging stations, check real-time availability,
                    reserve your charging slot and enjoy a seamless EV charging experience.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5  max-w-4xl">


                    <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl text-white">

                        <h3 className="font-bold text-lg">
                            ⚡ Real-Time Availability
                        </h3>

                        <p className="text-sm mt-2">
                            Check available charging slots instantly.
                        </p>

                    </div>



                    <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl text-white">

                        <h3 className="font-bold text-lg">
                            📅 Easy Reservation
                        </h3>

                        <p className="text-sm mt-2">
                            Book your charging time before arrival.
                        </p>

                    </div>



                    <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl text-white">

                        <h3 className="font-bold text-lg">
                            📍 Nearby Stations
                        </h3>

                        <p className="text-sm mt-2">
                            Find EV stations using smart location.
                        </p>

                    </div>


                </div>



                <div className="flex gap-4 flex-wrap justify-center mt-12">


                    <button
                        onClick={() => navigate("/view-stations")}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
                    >
                        Find Charging Stations
                    </button>



                    <button
                        onClick={() => navigate("/stations-map")}
                        className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition font-semibold"
                    >
                        Find Nearest Station
                    </button>



                    <button
                        onClick={() => setOpenModal(true)}
                        className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition font-semibold"
                    >
                        Station Owner? Join Us
                    </button>


                </div>



                


            </div>
                        {
                openModal && (

                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">


                        <div className="bg-white w-[90%] max-w-md rounded-2xl p-6 relative">


                            <button
                                onClick={handleCloseModal}
                                className="absolute right-5 top-3 text-xl text-gray-600 hover:text-black"
                            >
                                ✕
                            </button>



                            <h2 className="text-2xl font-bold text-center mb-5">
                                Station Registration Request
                            </h2>




                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-3"
                            >


                                <input
                                    type="text"
                                    name="apartmentName"
                                    placeholder="Station Name"
                                    value={formData.apartmentName}
                                    onChange={handleChange}
                                    className="border p-2 rounded-lg outline-none"
                                    required
                                />



                                <input
                                    type="text"
                                    name="ownerName"
                                    placeholder="Owner Name"
                                    value={formData.ownerName}
                                    onChange={handleChange}
                                    className="border p-2 rounded-lg outline-none"
                                    required
                                />



                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="border p-2 rounded-lg outline-none"
                                    required
                                />



                                <textarea
                                    name="address"
                                    placeholder="Station Location"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows="2"
                                    className="border p-2 rounded-lg outline-none"
                                    required
                                />



                                <div className="grid grid-cols-2 gap-3">


                                    <input
                                        type="number"
                                        name="lat"
                                        placeholder="Latitude"
                                        value={formData.lat}
                                        onChange={handleChange}
                                        className="border p-2 rounded-lg outline-none"
                                        required
                                    />



                                    <input
                                        type="number"
                                        name="lng"
                                        placeholder="Longitude"
                                        value={formData.lng}
                                        onChange={handleChange}
                                        className="border p-2 rounded-lg outline-none"
                                        required
                                    />


                                </div>




                                <input
                                    type="number"
                                    name="phoneNo"
                                    placeholder="Contact Number"
                                    value={formData.phoneNo}
                                    onChange={handleChange}
                                    className="border p-2 rounded-lg outline-none"
                                    required
                                />



                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={(e) => setImage(e.target.files[0])}
                                    className="border p-2 rounded-lg outline-none"
                                />



                                <button
                                    type="submit"
                                    className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition font-semibold"
                                >
                                    Send Request
                                </button>



                            </form>



                        </div>


                    </div>

                )
            }


        </div>

    );

};


export default FirstInterface;