require("dotenv").config();

const app = require("./src/app");
const { testDB } = require("./src/config/db");

const PORT = process.env.PORT || 3000;

// start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// test DB connection
testDB();