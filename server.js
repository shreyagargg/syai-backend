import 'dotenv/config';
import {app} from "./src/app.js";
import { testDB } from './src/config/db.js';

const PORT = process.env.PORT;

// start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// test DB connection
testDB();