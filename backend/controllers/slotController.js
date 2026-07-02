import Slot from "../models/Slot.js";
import Apartment from "../models/Apartment.js";

export const createSlot = async (req, res) => {
    try {
        const { slotName, date, startTime, endTime, status } = req.body;

        //validation
        if (!slotName || !date || !startTime || !endTime || !status) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //logged owner's station
        const stationId = req.user.apartment;

        const station = await Apartment.findById(stationId);
        if (!station) {
            return res.status(404).json({ message: "Station not found" });
        }

        //check duplicate slot
        const existingSlot = await Slot.findOne({
            station: stationId,
            date,
            startTime,
            endTime,
            status,
            slotName
        });

        if (existingSlot) {
            return res.status(400).json({
                message: "Slot already exits for this date and time"
            });
        }

        const slot = await Slot.create({
            station: stationId,
            slotName,
            date,
            startTime,
            endTime,
            status,
        });
        res.status(201).json({
            success: true,
            message: "Slot created successfully",
            slot,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}