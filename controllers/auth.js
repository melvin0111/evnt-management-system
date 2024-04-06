const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const HTTP_ERRORS = require('../utils/rest_errors');
const knex = require('../db')
const { failedResponse, success } = require('../utils/reply')
const _ = require('lodash');


const createJWTToken = async (jsonObj) => jwt.sign(jsonObj, process.env.SECRET);

const login = async (req, res) => {
    try {
        const schema = Joi.object({
            email: Joi.string().required().email(),
            password: Joi.string().required()
        });
        const { value: validationValue, error: validationError } = schema.validate(req.body, { abortEarly: false });
        if (!_.isUndefined(validationError)) throw new HTTP_ERRORS.ValidationError(validationError);
        // Extract validated values
        const { email, password } = validationValue;

        // Check if the user exists in the database
        const user = await knex('users').where({ email }).first();
        if (!user) {
            throw new HTTP_ERRORS.UnauthorizedError('Invalid email or password');
        }

        // Validate password
        if (password !== user.password) { // Example: Replace with your actual password hashing and validation logic
            throw new HTTP_ERRORS.UnauthorizedError('Invalid email or password');
        }

        // Generate JWT token
        const token = await createJWTToken({ user_id: user.id, email: user.email });

        // Send success response with JWT token
        res.status(200).json({ success: true, token });

    } catch (e) {
        return failedResponse(res, e);
    }
}
const register = async (req, res) => {
    try {
        // Validate request body
        const schema = Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            phone_number: Joi.string().allow(null).allow(''),
            password: Joi.string().required()
        });
        const { value: validationValue, error: validationError } = schema.validate(req.body, { abortEarly: false });
        if (validationError) {
            throw new HTTP_ERRORS.ValidationError(validationError);
        }

        // Extract validated values
        const { username, email, phone_number, password } = validationValue;

        // Check if the email already exists in the database
        const existingUser = await knex('users').where({ email }).first();
        if (existingUser) {
            throw new HTTP_ERRORS.ConflictError('Email already registered');
        }

        // Create new user
        const newUser = {
            username,
            email,
            phone_number,
            role: 'admin', // Set role as 'admin'
            password,
            created_at: new Date(),
            updated_at: new Date()
        };

        // Insert new user into the database
        const [userId] = await knex('users').insert(newUser);

        // Return success response with the newly created user's ID
        return success({ user_id: userId }, res, "200", 'User Registered Successfully');

    } catch (error) {
        // Handle validation or other errors
        return failedResponse(res, error);
    }
}

module.exports = {
    login,
    register
}