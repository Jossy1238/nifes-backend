const express = require("express");
const {signup, login, getUsers, updateUser, getUser, deleteUser, getCurrentUser, logout} = require("../controllers/usersController");
const upload = require("../utils/upload")

const router = express.Router();

router.post("/", upload.single('image'), signup);
router.post("/login", login);
router.get("/", getUsers);
router.put("/:id", upload.single('image'), updateUser);
router.delete("/:id", deleteUser);
router.get("/me/:token", getCurrentUser);
router.get("/logout", logout);
router.get("/:id", getUser);




module.exports = router;
