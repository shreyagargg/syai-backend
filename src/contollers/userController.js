// Logic for getting protected data
export const is_user = (req, res) => {
  res.json({
    message: "Protected data accessed",
    uid: req.user.uid,
    email: req.user.email || null,
  });
};

// Logic for public data
export const getPublicData = (req, res) => {
  res.json({ message: "This is public data" });
};