const express = require("express");
const {getAllEvents, createEvent, updateEvent, deleteEvent, myEvents, getUpcomingEvents, getEvent} = require("../controllers/eventsController");
const upload = require("../utils/upload")

const router = express.Router();

router.post("/", upload.single('image'), createEvent);

router.get("/", getAllEvents);
router.put("/:id", upload.single('image'), updateEvent);
router.delete("/:id", deleteEvent);
router.post("/my-events", myEvents);
router.get("/upcoming", getUpcomingEvents);
router.get("/:id", getEvent);

module.exports = router;
