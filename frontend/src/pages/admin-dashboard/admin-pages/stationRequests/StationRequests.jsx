import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
    FiSearch,
    FiClock,
    FiHome,
    FiRefreshCw,
    FiCheckCircle,
    FiXCircle
} from "react-icons/fi";

import toast from "react-hot-toast";
import API from "../../../../api";

const StationRequests = () => {

    const { token } = useSelector(
        state => state.adminAuth
    );

    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState([]);
    const [search, setSearch] = useState("");
    const [processingId, setProcessingId] = useState(null);

    // ===========================
    // GET PENDING REQUESTS
    // ===========================

    const getRequests = async () => {

        try {
            setLoading(true);
            const config = {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            };

            const res = await API.get(

                "/apartment/pending",

                config

            );

            setRequests(res.data);

        }

        catch (error) {

            console.log(error);
            toast.error("Failed to load requests");

        }

        finally {
            setLoading(false);
        }

    };
    // APPROVE

    const approveRequest = async (id) => {

        try {

            setProcessingId(id);
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const res = await API.put(
                `/apartment/approve/${id}`,
                {},
                config
            );

            toast.success(res.data.message);
            getRequests();

        }

        catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Approve failed"
            );
        }

        finally {
            setProcessingId(null);
        }

    };

    // REJECT

    const rejectRequest = async (id) => {

        try {
            setProcessingId(id);
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const res = await API.put(
                `/apartment/reject/${id}`,
                {},
                config
            );

            toast.success(res.data.message);
            getRequests();

        }
        catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Reject failed"
            );

        }
        finally {
            setProcessingId(null);
        }
    };



    useEffect(() => {

        if (token) {

            getRequests();

        }

    }, [token]);



    const filteredRequests = requests.filter((item) =>

        item.name.toLowerCase().includes(search.toLowerCase()) || item.ownerName.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase())

    );



    return (

        <div className="space-y-8">

            {/* Header */}

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold text-white">
                        Pending Station Requests
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Review and approve EV charging station registrations.
                    </p>

                </div>

                <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-2xl px-6 py-4">
                    <p className="text-slate-400 text-sm">
                        Pending Requests
                    </p>

                    <h2 className="text-3xl font-bold text-cyan-400">
                        {filteredRequests.length}
                    </h2>

                </div>

            </div>



            {/* Search */}

            <div className="bg-[#0F1B2D] border border-white/10 rounded-2xl p-5">
                <div className="relative">
                    <FiSearch
                        className="absolute left-4 top-4 text-slate-500"
                        size={20}

                    />

                    <input

                        type="text"

                        placeholder="Search station, owner or email..."

                        value={search}

                        onChange={(e) =>

                            setSearch(e.target.value)

                        }

                        className="w-full bg-[#07111F] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-cyan-400"

                    />

                </div>

            </div>
                        {/* Loading */}

            {
                loading ? (

                    <div className="
                        flex
                        justify-center
                        items-center
                        h-72
                    ">

                        <div className="
                            animate-spin
                            w-14
                            h-14
                            border-4
                            border-cyan-500
                            border-t-transparent
                            rounded-full
                        " />

                    </div>

                ) : filteredRequests.length === 0 ? (

                    <div className="
                        bg-[#0F1B2D]
                        border
                        border-dashed
                        border-cyan-400/20
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
                            text-white
                            font-bold
                        ">

                            No Pending Requests

                        </h2>

                        <p className="
                            text-slate-400
                            mt-3
                        ">

                            All station requests have been reviewed.

                        </p>

                    </div>

                ) : (

                    <div className="
                        grid
                        grid-cols-1
                        sm:grid-cols-1
                        lg:grid-cols-3
                        gap-6
                    ">

                        {

                            filteredRequests.map((item) => (

                                <div
                                    key={item._id}
                                    className="
                                        bg-[#0F1B2D]
                                        border
                                        border-white/10
                                        rounded-3xl
                                        p-6
                                        hover:border-cyan-400/40
                                        transition-all
                                        duration-300
                                    "
                                >

                                    {/* Top */}

                                    <div className="
                                        flex
                                        justify-between
                                        items-start
                                    ">

                                        <div>

                                            <h2 className="
                                                text-2xl
                                                font-bold
                                                text-white
                                            ">

                                                <FiHome className="inline mr-2 text-cyan-400" />

                                                {item.name}

                                            </h2>

                                            <p className="
                                                text-slate-400
                                                mt-2
                                            ">

                                                Requested by

                                                <span className="text-white ml-2">

                                                    {item.ownerName}

                                                </span>

                                            </p>

                                        </div>

                                        <span className="
                                            px-4
                                            py-2
                                            rounded-full
                                            text-xs
                                            font-semibold
                                            bg-yellow-400/10
                                            text-yellow-400
                                            border
                                            border-yellow-400/20
                                        ">

                                            <FiClock className="inline mr-1" />

                                            {item.status}

                                        </span>

                                    </div>

                                    {/* Divider */}

                                    <div className="
                                        border-t
                                        border-white/10
                                        my-5
                                    " />

                                    {/* Details */}

                                    <div className="space-y-3">

                                        <div className="flex justify-between">

                                            <span className="text-slate-400">

                                                Address

                                            </span>

                                            <span className="text-white">

                                                {item.address}

                                            </span>

                                        </div>

                                        <div className="flex justify-between">

                                            <span className="text-slate-400">

                                                Email

                                            </span>

                                            <span className="text-cyan-400">

                                                {item.email}

                                            </span>

                                        </div>

                                        <div className="flex justify-between">

                                            <span className="text-slate-400">

                                                Phone

                                            </span>

                                            <span className="text-white">

                                                {item.phone}

                                            </span>

                                        </div>

                                        <div className="flex justify-between">

                                            <span className="text-slate-400">

                                                Requested

                                            </span>

                                            <span className="text-white">

                                                {

                                                    new Date(item.createdAt)

                                                        .toLocaleDateString()

                                                }

                                            </span>

                                        </div>

                                    </div>

                                    {/* Buttons */}

                                    <div className="
                                        grid
                                        grid-cols-2
                                        gap-4
                                        mt-8
                                    ">

                                        <button

                                            disabled={processingId === item._id}

                                            onClick={() =>
                                                approveRequest(item._id)
                                            }

                                            className="
                                                bg-cyan-500
                                                hover:bg-cyan-400
                                                text-white
                                                py-3
                                                rounded-xl
                                                font-semibold
                                                transition
                                                disabled:opacity-60
                                            "
                                        >

                                            <FiCheckCircle className="inline mr-2" />

                                            {

                                                processingId === item._id

                                                    ? "Approving..."

                                                    : "Approve"

                                            }

                                        </button>

                                        <button

                                            disabled={processingId === item._id}

                                            onClick={() =>
                                                rejectRequest(item._id)
                                            }

                                            className="
                                                bg-red-500
                                                hover:bg-red-400
                                                text-white
                                                py-3
                                                rounded-xl
                                                font-semibold
                                                transition
                                                disabled:opacity-60
                                            "
                                        >

                                            <FiXCircle className="inline mr-2" />

                                            {

                                                processingId === item._id

                                                    ? "Rejecting..."

                                                    : "Reject"

                                            }

                                        </button>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

};

export default StationRequests;