import Navbar from "../../components/Navbar";
import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api"

import spark from '../../assets/Sparkles Animation.json'

const AllStations = () => {

    const navigate = useNavigate();
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await API.get("/apartment/");
                const data = response.data;
                setStations(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        }
        fetchStations();
    }, []);

    //clickable stations
    const handleStationClick = (id, name) => {
        navigate(`/auth/station/${id}`, {
            state: {
                stationName: name,
                stationID: id
            }
        });
    }



    return (

        <div className="min-h-screen bg-black text-white relative">
            <div className="relative z-20">
                <Navbar />
            </div>

            <div className="relative z-10  px-20">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-400 pb-8">
                    Available EV Stations
                </h1>
                {/* loading */}
                {loading && (
                    <div className="text-center text-lg">
                        Loading stations...
                    </div>
                )}

                {/* error */}
                {error && (
                    <div className="text-center text-red-500">
                        {error}
                    </div>
                )}
                {!loading && !error && (

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pb-20">
                        {stations.map((station) => (
                            <div onClick={() => handleStationClick(station._id, station.name)} key={station._id} className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition">

                                <img
                                    src={station.image}
                                    alt={station.name}
                                    className="w-full h-48 object-cover"
                                />

                                <div className="p-4">
                                    <h2 className="text-xl font-bold">{station.name}</h2>
                                    <p className="text-gray-400">{station.address}</p>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllStations;