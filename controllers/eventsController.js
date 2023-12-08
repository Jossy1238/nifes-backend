const Event = require("../models/Event");
const User = require("../models/User");


//Create Event
const createEvent = async (req, res)=>{
    try {

        const {name, category, date, venue, description, createdBy} = req.body;

        const image = req?.file?.filename;

        if(!name || !category || !date || !venue || !description || !createdBy){
            return res.status(400).json({message: "Please fill all required fields"});
        }

        //Check if createdBy is an existing user
        let existingUser = await User.findById(createdBy);
        if(!existingUser){
            return res.status(400).json({message: "User does not exist"});
        }

        const event = new Event(
            {
                name,
                category,
                date,
                venue,
                description,
                image,
                createdBy
            }
        );

        await event.save();

        const populatedEvent = await Event.findById(event._id).populate("createdBy", "fullName");
        res.status(201).json({
            message: "Event created successfully", 
            event: populatedEvent
        });


    } catch (err) {
        console.log(err);
    }
}

//Get All Events
const getAllEvents = async (req, res)=>{
    try {
        const events = await Event.find().populate("createdBy", "fullName")
        res.status(200).json({events});
    } catch (error) {
        res.status(400).send(error);
    }
}

//Update An Event
const updateEvent = async (req, res)=>{
    try {
        const {id} = req.params;
        const {name, category, date, venue, description} = req.body;

        const image = req?.file?.filename;


        const event = await Event.findByIdAndUpdate(id, 
            {
                name,
                category,
                date,
                venue,
                description,
                image,
            }, {new: true});

        res.status(201).json({message: "Event updated successfully", event});
    } catch (error) {
        res.status(400).send(error);
    }
}

//Delete An Event
const deleteEvent = async (req, res)=>{
    try {
        const {id} = req.params;
        const event = await Event.findByIdAndDelete(id);
        res.status(200).json({message: "Event deleted successfully", event});
    } catch (error) {
        res.status(400).send(error);
    }
}

//My Events 
const myEvents = async (req, res)=>{
    try {

        const {userId} = req.body;

        const events = await Event.find({createdBy: userId});
        res.status(200).json({events});
    } catch (error) {
        res.status(400).send(error);
    }
}

const getUpcomingEvents = async(req, res)=>{
    try {
        const events = await Event.find({date: {$gte: new Date()}}).populate("createdBy", "fullName");
        res.status(200).json({events});
    } catch (error) {
        res.status(400).send(error);
    }

}

const getEvent = async(req, res)=>{
    try {
        const {id} = req.params;
        const event = await Event.findById(id).populate("createdBy", "fullName");
        res.status(200).json({event});
    } catch (error) {
        res.status(400).send(error);
    }

}


module.exports = {
    createEvent, 
    getAllEvents, 
    updateEvent, 
    deleteEvent, 
    myEvents, 
    getUpcomingEvents,
    getEvent
}