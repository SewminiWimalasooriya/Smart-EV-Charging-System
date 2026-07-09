import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
    FiHome,
    FiUser,
    FiMail,
    FiMapPin,
    FiSearch,
    FiSlash,
    FiCheckCircle
} from "react-icons/fi";

import toast from "react-hot-toast";

import API from "../../../../api";


const ActiveStations = () => {


    const { token } = useSelector(
        state => state.adminAuth
    );


    const [loading,setLoading] = useState(true);


    const [stations,setStations] = useState([]);


    const [search,setSearch] = useState("");


    const [blockingId,setBlockingId] = useState(null);


    const [showModal,setShowModal] = useState(false);


    const [selectedStation,setSelectedStation] = useState(null);



    // ==========================
    // GET ACTIVE STATIONS
    // ==========================

    const getStations = async()=>{

        try{

            setLoading(true);


            const config={

                headers:{

                    Authorization:`Bearer ${token}`

                }

            };


            const res = await API.get(

                "/apartment/",

                config

            );


            setStations(res.data);


        }
        catch(error){

            console.log(error);


            toast.error(
                "Failed to load stations"
            );

        }
        finally{

            setLoading(false);

        }

    };





    // ==========================
    // OPEN MODAL
    // ==========================

    const handleBlock = (station)=>{


        setSelectedStation(station);


        setShowModal(true);


    };





    // ==========================
    // CONFIRM BLOCK
    // ==========================

    const confirmBlockStation = async()=>{


        try{


            setBlockingId(
                selectedStation._id
            );



            const config={

                headers:{

                    Authorization:
                    `Bearer ${token}`

                }

            };



            const res = await API.put(

                `/apartment/blocked/${selectedStation._id}`,

                {},

                config

            );



            toast.success(
                res.data.message
            );



            setShowModal(false);


            setSelectedStation(null);



            getStations();



        }
        catch(error){


            toast.error(

                error.response?.data?.message ||

                "Failed to block station"

            );


        }
        finally{


            setBlockingId(null);


        }


    };





    useEffect(()=>{


        if(token){

            getStations();

        }


    },[token]);





    const filteredStations =
    stations.filter((station)=>


        station.name
        ?.toLowerCase()
        .includes(
            search.toLowerCase()
        )

        ||

        station.ownerName
        ?.toLowerCase()
        .includes(
            search.toLowerCase()
        )

        ||

        station.email
        ?.toLowerCase()
        .includes(
            search.toLowerCase()
        )


    );



    return (


        <div className="space-y-8">



            {/* HEADER */}

            <div className="
                flex
                justify-between
                items-center
            ">


                <div>


                    <h1 className="
                        text-4xl
                        font-bold
                        text-white
                    ">

                        Active Stations ⚡

                    </h1>


                    <p className="
                        text-slate-400
                        mt-2
                    ">

                        Manage approved EV charging stations

                    </p>


                </div>



                <div className="
                    bg-cyan-400/10
                    border
                    border-cyan-400/20
                    px-6
                    py-4
                    rounded-2xl
                ">


                    <p className="
                        text-slate-400
                        text-sm
                    ">

                        Total Active

                    </p>


                    <h2 className="
                        text-3xl
                        font-bold
                        text-cyan-400
                    ">

                        {filteredStations.length}

                    </h2>


                </div>


            </div>





            {/* SEARCH */}

            <div className="
                bg-[#0F1B2D]
                border
                border-white/10
                rounded-2xl
                p-5
            ">


                <div className="relative">


                    <FiSearch

                        className="
                            absolute
                            left-4
                            top-4
                            text-slate-400
                        "

                    />


                    <input


                        type="text"

                        placeholder="Search station..."

                        value={search}

                        onChange={
                            e=>setSearch(e.target.value)
                        }


                        className="
                            w-full
                            bg-[#07111F]
                            border
                            border-white/10
                            rounded-xl
                            py-3
                            pl-12
                            text-white
                            outline-none
                            focus:border-cyan-400
                        "

                    />


                </div>


            </div>
                        {/* CONTENT */}

            {
                loading ? (

                    <div className="
                        flex
                        justify-center
                        items-center
                        h-72
                    ">

                        <div className="
                            w-14
                            h-14
                            rounded-full
                            border-4
                            border-cyan-400
                            border-t-transparent
                            animate-spin
                        " />

                    </div>


                ) : filteredStations.length === 0 ? (


                    <div className="
                        bg-[#0F1B2D]
                        border
                        border-dashed
                        border-cyan-400/30
                        rounded-3xl
                        p-16
                        text-center
                    ">


                        <FiCheckCircle

                            size={70}

                            className="
                                mx-auto
                                text-cyan-400
                                mb-5
                            "

                        />


                        <h2 className="
                            text-2xl
                            font-bold
                            text-white
                        ">

                            No Active Stations

                        </h2>


                        <p className="
                            text-slate-400
                            mt-3
                        ">

                            Approved stations will appear here.

                        </p>


                    </div>



                ) : (


                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        xl:grid-cols-3
                        gap-6
                    ">


                        {
                            filteredStations.map(
                                station=>(


                                    <div

                                        key={station._id}

                                        className="
                                            bg-[#0F1B2D]
                                            border
                                            border-white/10
                                            rounded-3xl
                                            p-6
                                            hover:border-cyan-400/40
                                            transition-all
                                        "

                                    >


                                        {/* TITLE */}


                                        <div className="
                                            flex
                                            justify-between
                                            items-start
                                            mb-6
                                        ">


                                            <h2 className="
                                                text-xl
                                                font-bold
                                                text-white
                                                flex
                                                gap-2
                                                items-center
                                            ">


                                                <FiHome

                                                    className="
                                                        text-cyan-400
                                                    "

                                                />


                                                {station.name}


                                            </h2>



                                            <span className="
                                                text-xs
                                                px-3
                                                py-1
                                                rounded-full
                                                bg-green-500/10
                                                text-green-400
                                                border
                                                border-green-400/20
                                            ">

                                                ACTIVE

                                            </span>


                                        </div>




                                        {/* DETAILS */}


                                        <div className="
                                            space-y-4
                                        ">



                                            <div className="
                                                flex
                                                gap-3
                                                items-center
                                            ">


                                                <FiUser

                                                    className="
                                                        text-cyan-400
                                                    "

                                                />


                                                <div>


                                                    <p className="
                                                        text-xs
                                                        text-slate-400
                                                    ">

                                                        Owner

                                                    </p>


                                                    <p className="
                                                        text-white
                                                    ">

                                                        {
                                                            station.ownerName
                                                        }

                                                    </p>


                                                </div>


                                            </div>





                                            <div className="
                                                flex
                                                gap-3
                                                items-center
                                            ">


                                                <FiMail

                                                    className="
                                                        text-cyan-400
                                                    "

                                                />


                                                <div>


                                                    <p className="
                                                        text-xs
                                                        text-slate-400
                                                    ">

                                                        Email

                                                    </p>


                                                    <p className="
                                                        text-white
                                                        break-all
                                                    ">

                                                        {
                                                            station.email
                                                        }

                                                    </p>


                                                </div>


                                            </div>





                                            <div className="
                                                flex
                                                gap-3
                                                items-center
                                            ">


                                                <FiMapPin

                                                    className="
                                                        text-cyan-400
                                                    "

                                                />


                                                <div>


                                                    <p className="
                                                        text-xs
                                                        text-slate-400
                                                    ">

                                                        Address

                                                    </p>


                                                    <p className="
                                                        text-white
                                                    ">

                                                        {
                                                            station.address
                                                        }

                                                    </p>


                                                </div>


                                            </div>



                                        </div>





                                        {/* ACTION */}


                                        <div className="
                                            border-t
                                            border-white/10
                                            mt-6
                                            pt-6
                                        ">



                                            <button

                                                onClick={()=>handleBlock(station)}

                                                disabled={
                                                    blockingId === station._id
                                                }


                                                className="
                                                    w-full
                                                    flex
                                                    items-center
                                                    justify-center
                                                    gap-2
                                                    py-3
                                                    rounded-xl
                                                    bg-red-500/10
                                                    border
                                                    border-red-400/20
                                                    text-red-400
                                                    hover:bg-red-500
                                                    hover:text-white
                                                    transition
                                                "

                                            >


                                                <FiSlash />


                                                {
                                                    blockingId === station._id

                                                    ?

                                                    "Blocking..."

                                                    :

                                                    "Block Station"

                                                }


                                            </button>



                                        </div>



                                    </div>


                                )

                            )
                        }


                    </div>


                )

            }






            {/* CONFIRMATION MODAL */}


            {
                showModal && (


                    <div className="
                        fixed
                        inset-0
                        bg-black/60
                        backdrop-blur-sm
                        flex
                        items-center
                        justify-center
                        z-[999]
                    ">


                        <div className="
                            bg-[#0F1B2D]
                            border
                            border-white/10
                            rounded-3xl
                            p-8
                            w-[420px]
                        ">



                            <div className="
                                text-center
                            ">



                                <div className="
                                    w-16
                                    h-16
                                    mx-auto
                                    rounded-full
                                    bg-red-500/10
                                    flex
                                    items-center
                                    justify-center
                                    text-red-400
                                    text-3xl
                                ">

                                    <FiSlash />

                                </div>




                                <h2 className="
                                    text-2xl
                                    font-bold
                                    text-white
                                    mt-5
                                ">


                                    Block Station?


                                </h2>




                                <p className="
                                    text-slate-400
                                    mt-3
                                ">


                                    Are you sure you want to block


                                    <span className="
                                        text-white
                                        font-semibold
                                        mx-1
                                    ">

                                        {selectedStation?.name}

                                    </span>


                                    ?


                                </p>





                                <div className="
                                    flex
                                    gap-4
                                    mt-8
                                ">



                                    <button


                                        onClick={()=>{

                                            setShowModal(false);

                                            setSelectedStation(null);

                                        }}


                                        className="
                                            flex-1
                                            py-3
                                            rounded-xl
                                            bg-white/10
                                            text-white
                                        "

                                    >

                                        Cancel


                                    </button>





                                    <button


                                        onClick={confirmBlockStation}


                                        className="
                                            flex-1
                                            py-3
                                            rounded-xl
                                            bg-red-500
                                            text-white
                                            hover:bg-red-400
                                        "

                                    >

                                        Yes, Block


                                    </button>



                                </div>



                            </div>



                        </div>



                    </div>


                )
            }



        </div>

    );


};


export default ActiveStations;