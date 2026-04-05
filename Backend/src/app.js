const express=require('express');
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const cors = require("cors");
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

const songRouter=require("./routes/song.routes");
app.use("/api/songs",songRouter);

app.use(express.json());

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

module.exports=app;