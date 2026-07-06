import Slot from "../models/Slot.js";
import Apartment from "../models/Apartment.js";

export const createSlot = async (req, res) => {
    try {
        const { slotName, date, startTime, endTime, status } = req.body;

        //validation
        if (!slotName || !date || !startTime || !endTime || !status) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //logged owner's station. get the station id from the logged in user (owner)
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

//get all slots
export const getOwnerSlots = async (req, res) => {
    try {
        const stationId = req.user.apartment;

        const slots = await Slot.find({
            station: stationId,
        }).sort({
            date: 1,
            startTime: 1,
        });

        if (!slots || slots.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No slots found for this station yet"
            })
        } else {
            return res.status(200).json({
                success: true,
                count: slots.length,
                slots,
            });
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//update slot
export const updateSlot = async (req, res) => {
    try {
        const stationId = req.user.apartment;
    

        const slot = await Slot.findById(req.params.id);

        
        if (!slot) {
            return res.status(404).json({
                success: false,
                message: "Slot not found",
            });
        }

        if (slot.station.toString() !== stationId.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const {
            slotName,
            date,
            startTime,
            endTime,
            status,
            isBooked,
        } = req.body;

        slot.slotName = slotName || slot.slotName;
        slot.date = date || slot.date;
        slot.startTime = startTime || slot.startTime;
        slot.endTime = endTime || slot.endTime;
        slot.status = status || slot.status;

        if (typeof isBooked === "boolean") {
            slot.isBooked = isBooked;
        }

        await slot.save();

        res.status(200).json({
            success: true,
            message: "Slot updated successfully",
            slot,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//slot delete
export const deleteSlot = async (req,res) =>{
    try{
        const stationId = req.user.apartment;
        const slot = await Slot.findById(req.params.id);

        if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Slot not found",
      });
    }

    if (slot.station.toString() !== stationId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

     if (slot.isBooked) {
      return res.status(400).json({
        success: false,
        message: "Booked slot cannot be deleted",
      });
    }

    await Slot.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Slot deleted successfully",
    });


    }catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}