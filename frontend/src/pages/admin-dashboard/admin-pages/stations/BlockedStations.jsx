import {
    useEffect,
    useState
} from "react";

import {
    useSelector
} from "react-redux";


import {
    FiHome,
    FiUser,
    FiMail,
    FiMapPin,
    FiSearch,
    FiUnlock,
    FiShieldOff
} from "react-icons/fi";


import toast from "react-hot-toast";

import API from "../../../../api";



const BlockedStations = () => {


    const { token } = useSelector(
        state => state.adminAuth
    );


    const [stations,setStations] = useState([]);

    const [loading,setLoading] = useState(true);

    const [search,setSearch] = useState("");

    const [selectedStation,setSelectedStation] = useState(null);

    const [showModal,setShowModal] = useState(false);

    const [unblockLoading,setUnblockLoading] = useState(false);






    // ==============================
    // GET BLOCKED STATIONS
    // ==============================


    const getBlockedStations = async()=>{


        try{


            setLoading(true);


            const config = {

                headers:{
                    Authorization:`Bearer ${token}`
                }

            };



            const res = await API.get(

                "/apartment/blockedApartments",

                config

            );


            setStations(res.data);



        }
        catch(error){


            console.log(error);


            toast.error(
                "Failed to load blocked stations"
            );


        }
        finally{

            setLoading(false);

        }


    };









    // ==============================
    // OPEN CONFIRM MODAL
    // ==============================


    const openModal = (station)=>{


        setSelectedStation(station);

        setShowModal(true);


    };









    // ==============================
    // UNBLOCK STATION
    // ==============================


    const handleUnblock = async()=>{


        try{


            setUnblockLoading(true);



            const config={

                headers:{
                    Authorization:`Bearer ${token}`
                }

            };



            const res = await API.put(

                `/apartment/unblocked/${selectedStation._id}`,

                {},

                config

            );



            toast.success(
                res.data.message
            );



            setShowModal(false);

            setSelectedStation(null);



            getBlockedStations();



        }
        catch(error){


            console.log(error);


            toast.error(

                error.response?.data?.message ||

                "Failed to unblock station"

            );


        }
        finally{


            setUnblockLoading(false);


        }


    };









    useEffect(()=>{


        if(token){

            getBlockedStations();

        }


    },[token]);









    const filteredStations = stations.filter(

        station =>

        station.name
        ?.toLowerCase()
        .includes(search.toLowerCase())

        ||

        station.ownerName
        ?.toLowerCase()
        .includes(search.toLowerCase())

        ||

        station.email
        ?.toLowerCase()
        .includes(search.toLowerCase())


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

                        Blocked Stations

                    </h1>


                    <p className="
                        text-slate-400
                        mt-2
                    ">

                        Manage suspended EV charging stations

                    </p>


                </div>





                <div className="
                    bg-red-500/10
                    border
                    border-red-400/30
                    rounded-2xl
                    px-6
                    py-4
                ">


                    <p className="
                        text-slate-400
                        text-sm
                    ">

                        Blocked Stations

                    </p>


                    <h2 className="
                        text-3xl
                        font-bold
                        text-red-400
                    ">

                        {stations.length}

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
                            text-slate-500
                        "

                    />


                    <input

                        type="text"

                        placeholder="Search blocked station..."

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









            {
                loading ?


                (

                    <div className="
                        flex
                        justify-center
                        items-center
                        h-60
                    ">


                        <div className="
                            w-14
                            h-14
                            border-4
                            border-cyan-400
                            border-t-transparent
                            rounded-full
                            animate-spin
                        " />


                    </div>


                )


                :


                filteredStations.length===0 ?


                (

                    <div className="
                        bg-[#0F1B2D]
                        border
                        border-white/10
                        rounded-3xl
                        p-16
                        text-center
                    ">


                        <FiShieldOff

                            size={70}

                            className="
                                mx-auto
                                text-cyan-400
                                mb-5
                            "

                        />


                        <h2 className="
                            text-2xl
                            text-white
                            font-bold
                        ">


                            No Blocked Stations


                        </h2>


                        <p className="
                            text-slate-400
                            mt-2
                        ">


                            All stations are active


                        </p>


                    </div>


                )



                :


                (


                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-3
                    gap-6
                ">


                {


                filteredStations.map(station=>(


                    <div

                    key={station._id}

                    className="
                        bg-[#0F1B2D]
                        border
                        border-white/10
                        rounded-3xl
                        p-6
                        hover:border-cyan-400/40
                        transition
                    "

                    >




                        <div className="
                            flex
                            justify-between
                            items-start
                        ">


                            <h2 className="
                                text-xl
                                font-bold
                                text-white
                            ">


                                <FiHome

                                className="
                                    inline
                                    text-cyan-400
                                    mr-2
                                "

                                />


                                {station.name}


                            </h2>



                            <span className="
                                bg-red-500/10
                                text-red-400
                                px-3
                                py-1
                                rounded-full
                                text-xs
                            ">


                                BLOCKED


                            </span>


                        </div>








                        <div className="
                            mt-6
                            space-y-4
                        ">


                            <p className="text-slate-300">

                                <FiUser className="
                                    inline
                                    text-cyan-400
                                    mr-2
                                "/>


                                {station.ownerName}

                            </p>




                            <p className="text-slate-300">


                                <FiMail className="
                                    inline
                                    text-cyan-400
                                    mr-2
                                "/>


                                {station.email}


                            </p>




                            <p className="text-slate-300">


                                <FiMapPin className="
                                    inline
                                    text-cyan-400
                                    mr-2
                                "/>


                                {station.address}


                            </p>


                        </div>







                        <button

                        onClick={()=>openModal(station)}

                        className="
                            mt-7
                            w-full
                            py-3
                            rounded-xl
                            bg-cyan-400/10
                            border
                            border-cyan-400/30
                            text-cyan-300
                            hover:bg-cyan-400
                            hover:text-black
                            transition
                            flex
                            justify-center
                            items-center
                            gap-2
                        "

                        >


                            <FiUnlock/>

                            Unblock Station


                        </button>




                    </div>


                ))


                }


                </div>


                )

            }













            {/* CONFIRM MODAL */}



            {
                showModal &&

                <div className="
                    fixed
                    inset-0
                    bg-black/60
                    backdrop-blur-sm
                    flex
                    items-center
                    justify-center
                    z-50
                ">



                    <div className="
                        bg-[#0F1B2D]
                        border
                        border-white/10
                        rounded-3xl
                        p-8
                        w-[420px]
                    ">



                        <div className="text-center">


                            <div className="
                                w-16
                                h-16
                                rounded-full
                                bg-cyan-400/10
                                mx-auto
                                flex
                                items-center
                                justify-center
                                text-cyan-400
                                text-3xl
                            ">


                                <FiUnlock/>


                            </div>




                            <h2 className="
                                text-2xl
                                font-bold
                                text-white
                                mt-5
                            ">


                                Unblock Station?


                            </h2>




                            <p className="
                                text-slate-400
                                mt-3
                            ">


                                Are you sure you want to unblock


                                <span className="
                                    text-white
                                    font-bold
                                    mx-1
                                ">


                                    {selectedStation?.name}


                                </span>


                                station?


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

                                onClick={handleUnblock}

                                disabled={unblockLoading}

                                className="
                                    flex-1
                                    py-3
                                    rounded-xl
                                    bg-cyan-400
                                    text-black
                                    font-bold
                                "

                                >


                                    {
                                        unblockLoading
                                        ?
                                        "Updating..."
                                        :
                                        "Yes, Unblock"
                                    }


                                </button>




                            </div>



                        </div>




                    </div>


                </div>


            }





        </div>


    );


};


export default BlockedStations;