const express = require("express");
const dotenv = require("@dotenvx/dotenvx");
const connectDB = require("./utils/db");
const cors = require("cors");
const router = require('./routers/routes')

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());


app.use(router);


connectDB();

const PORT = process.env.PORT || 2233;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
