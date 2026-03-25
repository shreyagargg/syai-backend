import admin from 'firebase-admin';
import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync(new URL("../../serviceAccountKey.json", import.meta.url))
);
// import serviceAccount from "../../serviceAccountKey.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;