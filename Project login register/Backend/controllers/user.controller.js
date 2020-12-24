const user = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config.json');
const fs = require('fs');
const path = require('path');

exports.getUsers = async function(req, res) {
    try {
        let users = await user.find();
        res.send(users);
    }
    catch(err) {
        res.status(400).json({ message: err.message })
    }
}

async function authenticate({ name, password }) {
    const users = await user.findOne({ name });
    if (users && bcrypt.compareSync(password, users.hash)) {
        const token = jwt.sign({ sub: users.id }, config.secret, { expiresIn: '1d' });
        return {
            ...users.toJSON(),
            token
        };
    }
}

exports.authenticateUser = function(req, res, next) {
    authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => 
            next(err));
}

exports.createUser = async function(req, res) {
    try {
        if (await user.findOne({ name: req.body.name })) {
            throw new Error('Username "' + req.body.name + '" is already taken');
        }
        const users = new user(req.body);
        if (req.body.password) {
            users.hash = bcrypt.hashSync(req.body.password, 10);
        }
    
        await users.save();
        res.send({ message: "User registered" });
    }
    catch(err) {
        res.status(400).json({ message: err.message })
    }

}

exports.deleteUser = async function(req, res) {
    const id = req.params.id;
    try {
        await user.findByIdAndDelete(id);
        res.send({ message: "User Deleted" })
    }
    catch(err) {
        res.status(400).json({ message: err.message })
    }
    
}