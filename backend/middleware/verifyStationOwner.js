import Apartment from "../models/Apartment.js";

export const verifyStationOwner = async (req, res, next) => {
  try {
    if (!req.user.apartment) {
      return res.status(403).json({
        success: false,
        message: "No station assigned to this owner",
      });
    }

    const station = await Apartment.findById(req.user.apartment);

    if (!station) {
      return res.status(404).json({
        success: false,
        message: "Station not found",
      });
    }

    req.station = station;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};