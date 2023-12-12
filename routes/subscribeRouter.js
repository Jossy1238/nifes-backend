const express = require("express");
const {subscribe} = require('../controllers/subscribersController')

const router = express.Router();

router.post("/", subscribe);

module.exports = router;