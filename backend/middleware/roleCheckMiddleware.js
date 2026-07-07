export const ownerOnly = (req, res, next) => {
    if (req.user.role !== "owner") {
        return res.status(403).json({
            message: "Access denied. Owner only access"
        });
    }

    next();
};

export const userOnly = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({
      success: false,
      message: "Access denied. User only.",
    });
  }

  next();
};