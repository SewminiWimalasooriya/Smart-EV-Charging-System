import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../../api";

const StationsMap = () => {
    const [stations, setStations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStations = async () => {
            const res = await API.get("/apartment/");
            setStations(res.data);
        };

        fetchStations();
    }, []);

    return (
        <MapContainer
            center={[6.9271, 79.8612]}
            zoom={12}
            style={{ height: "100vh", width: "100%" }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {stations
                .filter(s => s.location?.lat && s.location?.lng)
                .map((station) => {

                    const fixedImage = station.image?.replace(/\\/g, "/");

                    return (
                        <Marker
                            key={station._id}
                            position={[
                                station.location.lat,
                                station.location.lng
                            ]}

                            //  CLICK EVENT ADDED HERE
                            eventHandlers={{
                                click: () =>
                                    navigate(`/auth/station/${station._id}`, {
                                        state: {
                                            stationName: station.name
                                        }
                                    })
                            }}
                        >
                            {/*  ALWAYS VISIBLE LABEL */}
                            <Tooltip permanent direction="top" offset={[0, -10]}>
                                <div style={{ textAlign: "center" }}>

                                    <b>{station.name}</b>
                                    <br />

                                    {fixedImage && (
                                        <img
                                            src={fixedImage}
                                            alt="station"
                                            style={{
                                                width: "80px",
                                                height: "50px",
                                                objectFit: "cover",
                                                borderRadius: "6px",
                                                marginTop: "5px"
                                            }}
                                        />
                                    )}

                                </div>
                            </Tooltip>

                        </Marker>
                    );
                })}
        </MapContainer>
    );
};

export default StationsMap;