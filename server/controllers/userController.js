const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// In-memory token storage (use a database in production)
let refreshTokens = [];

const create = async (req, res, next) => {

    try {
        const { name, email, password, isPremiumMember, mobile, role } = req.body;
        const isUserExists = await User.findOne({email: email , role: role});
        if(isUserExists) {
            return res.status(400).json({
                message: "User already exists",
                success: false 
            }); 
        }
         // remove this hashing if pre.save enable in userModel.js
         const hashpassword = bcrypt.hashSync(password, 10);

         const user = new User({ name, email, password: hashpassword, isPremiumMember, mobile, role });
         await user.save();

        //  const token = generateToken(email);

         // Perform user authentication here
        const tokens = generateAllTokens(user);
        refreshTokens.push(tokens.refreshToken)
        const token = tokens.accessToken;

        //  res.cookie('token', token); 
 
         return res.status(200).send({
             message: "User created successfully",
             success: true,
             data: user,
             token: token,
             refreshToken :tokens.refreshToken
         })


    } catch (error) {
        res.status(400).json(error)
    }
}

const login = async (req, res, next) => {
    const { email, password, role } = req.body;
   
    try {
        const isUserExists = await User.findOne({ email: email });
        if (!isUserExists) {
            return res.status(400).json({
                message: "user not exits"
            })
        }
        const passwordMatch = bcrypt.compareSync(password, isUserExists.password);
        
         if (!passwordMatch) {
            return res.status(400).json({ message: "User login failed" ,  success: false});
        }
        //const token = jwt.sign( { data: email }, process.env.JWT_SECRET)
        // const token = generateToken(email);
 
         // Perform user authentication here
         const tokens = generateAllTokens(isUserExists);
         refreshTokens.push(tokens.refreshToken)
         const token = tokens.accessToken;

        //  console.log(token)
        // res.cookie('token', token); // instead of cookie we can use localstorage
        res.setHeader('Authorization', token)
        return res.status(200).json({
            message: "User login successfully",
            data: isUserExists,
            token: token,
            refreshToken :tokens.refreshToken,
            success: true
        })
        // res.json({ token });

    } catch (error) {
        res.status(400).json(error)
    }
}


const refreshtoken = async (req, res, next) => {
    const { token } = req.body;

    if (!token) {
        return res.status(401).json({ message: 'Refresh token is required' });
    }

    if (!refreshTokens.includes(token)) {
        return res.status(403).json({ message: 'Invalid refresh token' });
    }

    try {
        const user = jwt.verify(token, REFRESH_SECRET_KEY);
        const tokens = generateTokens(user);
        // Replace the old refresh token with the new one
        refreshTokens = refreshTokens.filter((t) => t !== token);
        refreshTokens.push(tokens.refreshToken);
        res.json(tokens);
    } catch (error) {
        res.status(403).json({ message: 'Invalid refresh token' });
    }
}

const logout =  async (req, res, next)  => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter((t) => t !== token);
    res.json({ message: 'Logged out successfully' });
}

const generateToken = (userId) => {
    return jwt.sign( { data: userId }, process.env.JWT_SECRET, {expiresIn:"1h"})
    
}
const generateRefreshToken = (userId) => {
    return jwt.sign( { data: userId }, process.env.REFRESH_SECRET_KEY, {expiresIn:"2h"})    
}

// Helper function to generate access and refresh tokens
const generateAllTokens = (user) => {
    // const accessToken = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '15m' });
    // const refreshToken = jwt.sign({ id: user.id, username: user.username }, REFRESH_SECRET_KEY, { expiresIn: '7d' });

    const accessToken = jwt.sign({ id: user._id, email: user.email, role:user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user._id, email: user.email , role:user.role}, process.env.REFRESH_SECRET_KEY, { expiresIn: '7d' });
 
    return { accessToken, refreshToken };
};


module.exports = { create, login , refreshtoken, logout }