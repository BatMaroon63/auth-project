const express = require("express")

const {
    signup,
    login,
    profile
} = require("../controllers/auth_controllers");
const users = require("../models/user_model");
const authMiddleware = require("../middleware/auth_middleware");

const router = express.Router();


router.post("/signup", signup);
router.post("/login", login)
router.get("/users", (req, res) => {
    res.json(users);
});
router.get("/profile",
     authMiddleware,
    profile
);

module.exports = router;