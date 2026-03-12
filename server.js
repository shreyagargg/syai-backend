const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");

// Initialize Firebase Admin
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());
app.use(express.json());

/* ===============================
   AUTH MIDDLEWARE
=================================*/
async function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

   const idToken = header.split(" ")[1];

    // Verify token with Firebase
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Attach user info to request
    req.user = decodedToken;

    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

/* ===============================
   PUBLIC ROUTE (No Auth)
=================================*/
app.get("/public", (req, res) => {
  res.json({ message: "This is public data" });
});

/* ===============================
   PROTECTED ROUTE (Auth Required)
=================================*/
app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected data accessed",
    uid: req.user.uid,
    email: req.user.email || null,
  });
});

/* ===============================
   START SERVER
=================================*/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});