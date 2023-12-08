require("dotenv").config();

const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require("mongoose");

const usersRouter = require("./routes/usersRouter");
const eventsRouter = require("./routes/eventsRouter");

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/users", usersRouter);
app.use("/events", eventsRouter);


app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use('/images', express.static('uploads'));


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to the database...")
    app.listen(8000, () => {
        console.log("Server is running on port 8000");
    });
})
.catch((err)=>console.log(err))


