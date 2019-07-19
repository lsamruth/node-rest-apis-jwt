const express = require('express');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
const config = require('./config');

const checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, config.secretKey, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(400).send({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};


const login = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB
    let mockedUsername = 'admin';
    let mockedPassword = 'admin';

    if (username && password) {
        if (username === mockedUsername && password === mockedPassword) {
            let token = jwt.sign({ username: username },
                config.secretKey,
                {
                    expiresIn: '24h' // expires in 24 hours
                }
            );
            // return the JWT token for the future API calls
            return res.json({
                success: true,
                message: 'Authentication successful!',
                token: token
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'Incorrect username or password'
            });
        }
    } else {
        return res.status(400).send({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
}

module.exports = {
    checkToken: checkToken,
    login: login
}