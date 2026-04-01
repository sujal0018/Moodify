const usermodel=require("../models/user.model");
const bcrypt=require("bcryptjs");
const jwt = require("jsonwebtoken");  
// const blacklistmodel = require("../models/blacklist.model");
const redis=require('../config/cache')

async function register(req, res) {
    const { username, email, password } = req.body;
    const isuserExists = await usermodel.findOne({
        $or:[{username},{email}]
    })

    if(isuserExists){
        return res.status(400).json({message:"User already exists"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user=await usermodel.create({
        username,
        email,
        password:hashedPassword
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully", user: {
            id: user._id,
            username: user.username,
            email: user.email,
            token
        }
    })

}

async function login(req, res) {
    const { email, password} = req.body;
    const user = await usermodel.findOne({ email }).select("+password")

    if(!user){
        return res.status(400).json({message:"Invalid credentials"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token);

    res.status(200).json({
        message: "Login successful",
        user: {
            id: user._id,
            email: user.email,
        }
    });
}

async function getMe(req, res) {
    const user = await usermodel.findById(req.user.id)
    res.status(200).json({
        message:"User fetched successfully",user
    })
    
}

async function logout(req, res) {
    const token = req.cookies.token;

    res.clearCookie("token");
    // await blacklistmodel.create({token})
    await redis.set(token, Date.now().toString(),"EX",60*60);
    
    res.status(200).json({message:"Logout successful"})
}

module.exports = {register,login,getMe,logout}