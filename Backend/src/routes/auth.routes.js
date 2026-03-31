const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authmiddleware = require("../middlewares/auth.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get('/get-me', authmiddleware.authuser, authController.getMe)
router.post("/logout", authController.logout);

module.exports = router;