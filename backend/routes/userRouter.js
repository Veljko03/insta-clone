const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");

router.get("/", controller.getAllUsers);

router.post("/", controller.searchUsers);
router.get("/:id", controller.fetchUserProgile);
router.post("/follow", controller.followUser);
router.post("/isFollowing", controller.isFollowing);

module.exports = router;
