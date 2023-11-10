const bcrypt = require('bcrypt');
const usersModel = require('../models/userModel');
const { authSchema } = require('./validationSchemas.js');

/**
 * Registers a new user with the provided email and password.
 * 
 * @param {Object} req - The request object
 * @param {string} req.body.email - The email of the user
 * @param {string} req.body.password - The password of the user
 * @param {Object} res - The response object
 * @returns {Object} JSON response indicating the result of the registration
 * @throws {Object} JSON object indicating the error that occurred
 */
const register = async (req, res) => {
    const validationResult = authSchema.validate(req.body);

    if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error.details[0].message });
    }

    if (await usersModel.findOne({ email: req.body.email })) {
        return res.status(409).json({ error: `Email already exists` });
    }

    const newUser = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    };

    try {
        await usersModel.create(newUser);
        return res.status(201).json({ message: `New user created!` });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

/**
 * Logs in a user with the provided email and password.
 * 
 * @param {Object} req - The request object.
 * @param {string} req.body.email - The email of the user
 * @param {string} req.body.password - The password of the user
 * @param {Object} res - The response object.
 * @returns {Object} JSON response indicating the result of the login attempt.
 * @throws {Object} JSON object indicating the error that occurred
 */
const login = async (req, res) => {
    const validationResult = authSchema.validate(req.body);

    if (validationResult.error) {
        return res.status(400).json({ error: validationResult.error.details[0].message });
    }

    try {
        const user = await usersModel.findOne({
            email: req.body.email,
        });

        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(200).json({ message: `Login successful!` });
        } else {
            return res.status(401).json({ error: `Invalid email or password` });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    register,
    login,
};
