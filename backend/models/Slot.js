import mongoose from "mongoose";

const slotSchema = new mongoose.Schema(
  {
    station: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Apartment", 
      required: true,
    },
    slotName:{
        type:String,
        required:true,
    },
    slotVoltage:{
      type:String,
      required:true,
    },

    date: {
      type: String,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },
    status: {
        type: String,
        enum: ["booked", "maintenance", "available"],
        default: "available"
    },

    
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Slot", slotSchema);