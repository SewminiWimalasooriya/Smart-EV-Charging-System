const SlotDialog = ({ open, setOpen, slot, setSlot, saveSlot, editMode }) => {


    if (!open) return null;


    return (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">


            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md">


                <h2 className="text-xl font-bold mb-5">

                    {editMode ? "Edit Slot" : "Add Slot"}

                </h2>




                <div className="grid gap-4">


                    <input

                        className="bg-slate-800 p-3 rounded-xl outline-none"

                        placeholder="Slot Name"

                        value={slot.slotName}

                        onChange={
                            e =>
                            setSlot({
                                ...slot,
                                slotName:e.target.value
                            })
                        }

                    />




                    <input

                        className="bg-slate-800 p-3 rounded-xl outline-none"

                        type="date"

                        value={slot.date}

                        onChange={
                            e =>
                            setSlot({
                                ...slot,
                                date:e.target.value
                            })
                        }

                    />





                    <div className="grid grid-cols-2 gap-3">


                        <input

                            className="bg-slate-800 p-3 rounded-xl outline-none"

                            type="time"

                            value={slot.startTime}

                            onChange={
                                e =>
                                setSlot({
                                    ...slot,
                                    startTime:e.target.value
                                })
                            }

                        />



                        <input

                            className="bg-slate-800 p-3 rounded-xl outline-none"

                            type="time"

                            value={slot.endTime}

                            onChange={
                                e =>
                                setSlot({
                                    ...slot,
                                    endTime:e.target.value
                                })
                            }

                        />


                    </div>







                    <input

                        className="bg-slate-800 p-3 rounded-xl outline-none"

                        placeholder="Voltage"

                        value={slot.slotVoltage}

                        onChange={
                            e =>
                            setSlot({
                                ...slot,
                                slotVoltage:e.target.value
                            })
                        }

                    />







                    <select

                        className="bg-slate-800 p-3 rounded-xl"

                        value={slot.status}

                        onChange={
                            e =>
                            setSlot({
                                ...slot,
                                status:e.target.value
                            })
                        }

                    >


                        <option value="available">
                            Available
                        </option>


                        <option value="booked">
                            Booked
                        </option>


                        <option value="maintenance">
                            Maintenance
                        </option>


                    </select>




                </div>








                <div className="flex justify-end gap-3 mt-6">


                    <button

                        onClick={()=>setOpen(false)}

                        className="px-5 py-2 bg-slate-700 rounded-xl"

                    >

                        Cancel

                    </button>





                    <button

                        onClick={saveSlot}

                        className="px-5 py-2 bg-cyan-500 rounded-xl"

                    >

                        Save

                    </button>



                </div>





            </div>


        </div>

    )

}


export default SlotDialog;