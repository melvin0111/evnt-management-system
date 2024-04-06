const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const HTTP_ERRORS = require('../utils/rest_errors');
const knex = require('../db')
const { failedResponse } = require('../utils/reply')
const validateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) throw new HTTP_ERRORS.UnauthorizedError('No Auth Token Provided');
        let tokens = token.split(' ');
        let user;
        user = decodeToken(tokens[tokens.length - 1]);
        const isExist = await knex('users').select('*').where({ email: user.email }).first()
        if (!isExist) throw new HTTP_ERRORS.UnauthorizedError('Bad Auth Token');
        req.user = isExist
        next();
    } catch (error) {
        return failedResponse(res, error);
    }
};

const decodeToken = (token) => {
    try {
        return jwt.verify(token, process.env.SECRET);
    } catch (e) {
        throw new HTTP_ERRORS.UnauthorizedError('Bad Auth Token');
    }
};
module.exports = {
    validateToken
}