import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import API from "../../../../api";

import { FiPlus, FiEdit, FiTrash2, FiSearch } from "react-icons/fi";

import SlotDialog from "./SlotDialog";

const SlotManagement = () => {

    const { token } = useSelector(
        state => state.stationAuth
    );

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const [slots, setSlots] = useState([]);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const defaultSlot = {

        slotName: "",
        slotVoltage: "",
        date: "",
        startTime: "",
        endTime: "",
        status: "available"

    };

    const [slot, setSlot] = useState(defaultSlot);

    // GET OWNER SLOTS

    const fetchSlots = async () => {

        try {
            const res = await API.get(
                "/slot/get-owner-slots",
                config
            );
            setSlots(res.data.slots);

        } catch (error) {
            console.log(
                error.response?.data || error.message
            );
        }
    };

    useEffect(() => {

        fetchSlots();

    }, []);

    // CREATE / UPDATE SLOT

    const saveSlot = async () => {
        try {
            if (editMode) {
                await API.put(
                    `/slot/update-owner-slot/${selectedId}`,
                    slot,
                    config
                );

            } else {

                await API.post(
                    "/slot/create-slot",
                    slot,
                    config
                );
            }

            setOpen(false);
            setSlot(defaultSlot);
            setEditMode(false);
            setSelectedId(null);
            fetchSlots();

        } catch (error) {
            console.log(
                error.response?.data || error.message
            );
        }
    };

    // DELETE SLOT

    const removeSlot = async (id) => {
        try {
            await API.delete(
                `/slot/delete-slot/${id}`,
                config
            );
            fetchSlots();
        } catch (error) {
            console.log(
                error.response?.data || error.message
            );
        }
    };

    // EDIT SLOT

    const editSlot = (item) => {
        setSlot({
            slotName: item.slotName,
            slotVoltage: item.slotVoltage,
            date: item.date,
            startTime: item.startTime,
            endTime: item.endTime,
            status: item.status || "available"
        });

        setSelectedId(item._id);
        setEditMode(true);
        setOpen(true);
    };

    const filteredSlots = slots.filter(
        item =>
            item.slotName
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
    );

    return (
        <div className="min-h-screen bg-slate-950 text-white p-5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold">
                        Slot Management
                    </h1>

                    <p className="text-slate-400">
                        Manage EV charging slots
                    </p>
                </div>

                <button
                    onClick={() => {

                        setEditMode(false);
                        setSelectedId(null);
                        setSlot(defaultSlot);
                        setOpen(true);
                    }}

                    className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-xl font-semibold"
                >

                    <FiPlus />
                    Add Slot

                </button>

            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

                <div className="flex items-center gap-3 bg-slate-800 rounded-xl px-4 mb-5">

                    <FiSearch className="text-slate-400" />

                    <input
                        className="bg-transparent outline-none w-full py-3"
                        placeholder="Search slot..."
                        value={search}
                        onChange={
                            e => setSearch(e.target.value)
                        }

                    />

                </div>


                <div className="overflow-x-auto">

                    <table className="w-full border-collapse">

                        <colgroup>
                            <col className="w-[25%]" />
                            <col className="w-[15%]" />
                            <col className="w-[20%]" />
                            <col className="w-[15%]" />
                            <col className="w-[15%]" />
                            <col className="w-[10%]" />
                        </colgroup>


                        <thead>

                            <tr className="border-b border-slate-700 text-slate-400">

                                <th className="px-4 py-3 text-left">
                                    Slot Name
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Date
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Time
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Voltage
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Status
                                </th>

                                <th className="px-4 py-3 text-center">
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>
                            {
                                filteredSlots.map(item => (
                                    <tr
                                        key={item._id}
                                        className="border-b border-slate-800 hover:bg-slate-800 transition"
                                    >
                                        <td className="px-4 py-4 text-left truncate">
                                            {item.slotName}
                                        </td>

                                        <td className="px-4 py-4 text-left">
                                            {item.date}
                                        </td>

                                        <td className="px-4 py-4 text-left">
                                            {item.startTime} - {item.endTime}
                                        </td>

                                        <td className="px-4 py-4 text-left">
                                            {item.slotVoltage}
                                        </td>

                                        <td className="px-4 py-4 text-left">

                                            <span className={`px-3 py-1 rounded-full text-sm ${item.status === "available"
                                                ?
                                                "bg-green-500/20 text-green-400"
                                                :
                                                item.status === "booked"
                                                    ?
                                                    "bg-red-500/20 text-red-400"
                                                    :
                                                    "bg-yellow-500/20 text-yellow-400"
                                                }`}>

                                                {item.status}

                                            </span>

                                        </td>

                                        <td className="px-4 py-4">

                                            <div className="flex justify-center gap-3">
                                                <button
                                                    onClick={() => editSlot(item)}
                                                    className="text-blue-400 hover:text-blue-300"
                                                >

                                                    <FiEdit />
                                                </button>


                                                <button
                                                    onClick={() => removeSlot(item._id)}
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    <FiTrash2 />

                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                ))

                            }

                        </tbody>

                    </table>


                </div>


            </div>


            <SlotDialog

                open={open}

                setOpen={setOpen}

                slot={slot}

                setSlot={setSlot}

                saveSlot={saveSlot}

                editMode={editMode}


            />

        </div>


    )



}


export default SlotManagement;