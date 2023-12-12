require("dotenv").config();

const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require("mongoose");

const usersRouter = require("./routes/usersRouter");
const eventsRouter = require("./routes/eventsRouter");
const subscribeRouter = require("./routes/subscribeRouter")

const app = express();
app.use(express.json());

const allowedOrigins = ['http://localhost:5173', 'https://nifes-alumni.netlify.app', 'https://cron-job.org']
const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        console.log(origin)
        if (allowedOrigins.indexOf(origin) !== -1 || origin == undefined) {
            callback(null, true)
        } 
        else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/users", usersRouter);
app.use("/events", eventsRouter);
app.use("/subscribe", subscribeRouter);


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


