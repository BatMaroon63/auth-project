const bcrypt = require("bcrypt");
const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
const signup = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields required"
        });
    }

    const existingUsers = await User.findOne({
        email
    });

    if (existingUsers) {
        return res.status(409).json({
            message: "User already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(
        password,
        10
    );

    const newUser = new User({
        name,
        email,
        password: hashedPassword
    });

    await newUser.save();


    res.status(201).json({
        message: "User Registered Successfully",
    });
};

const login = async(req, res) =>
{
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({
            message: "Invalid Email or Password."
        });
    }
    
    const user = await User.findOne({
        email
    });

    if(!user) {
        return res.status(404).json({
            message: "User Does not EXIST"
        });
    }
    
    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if(!isMatch) {
        return res.status(401).json({
            message:"Password is Invalid."
        });

    };

    const token = jwt.sign(
        {
            userID: user._id,
            email: user.email
        },
        process.env.JWT_Secret,
        {
            expiresIn: "1h"
        }
    );
   
    return res.status(200).json({
        message: "Login Successful",
        token
    })
};

const profile = async (req, res) => {
    const user = await User.findById(
        req.user.userID
    ).select("-password");
    res.status(200).json(user);
}

module.exports = {
    signup,
    login,
    profile
};