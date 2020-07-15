module.exports = (req, res, next) => {
  const { user } = req;

  if (!user || user.role != "admin") {
    return res.status(403).json({
      success: false,
      message: "You don't have access to this route",
    });
  } else {
    next();
  }
};
