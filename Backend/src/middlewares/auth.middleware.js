const usermodel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const blacklistmodel = require("../models/blacklist.model");
const redis=require('../config/cache')

async function authuser(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const isBlacklisted = await redis.get(token)
    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }


    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = {
    authuser
}