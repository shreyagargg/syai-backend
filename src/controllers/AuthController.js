// // Logic for getting protected data
// export const is_user = (req, res) => {
//   if (!req.user) {
//     return res.status(401).json({ message: "User not authenticated" });
//   }

//   res.json({
//     message: "Protected data accessed",
//     uid: req.user.uid,
//     email: req.user.email || null,
//   });
// };

// // Logic for public data
// export const getPublicData = (req, res) => {
//   res.json({ message: "This is public data" });
// };

// // export const User = (req, res) => {
// //   console.log("working")
// // }