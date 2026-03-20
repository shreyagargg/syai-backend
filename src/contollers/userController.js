// Logic for getting protected data
exports.getProtectedData = (req, res) => {
  res.json({
    message: "Protected data accessed",
    uid: req.user.uid,
    email: req.user.email || null,
  });
};

// Logic for public data
exports.getPublicData = (req, res) => {
  res.json({ message: "This is public data" });
};