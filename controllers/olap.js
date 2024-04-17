const Joi = require('@hapi/joi');
const HTTP_ERRORS = require('../utils/rest_errors');
const knex = require('../db')
const { failedResponse, success } = require('../utils/reply')
const _ = require('lodash');


const upcomingEvents = async (req, res) => {
    try {
        const [result] = await knex.raw(`SELECT * FROM events WHERE start_date > CURDATE();`)
        return success(result, res, "200", "Success");
    } catch (error) {
        console.error("Error creating event:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}
const revenue_and_expenses = async (req, res) => {
    try {
        const [result] = await knex.raw(`
        SELECT e.id,e.name, 
               SUM(o.total_amount) AS revenue, 
               SUM(ex.amount) AS expenses
        FROM events e
        LEFT JOIN orders o ON e.id = o.event_id
        LEFT JOIN expense ex ON e.id = ex.event_id
        where e.user_id = ${req.user.id}
        GROUP BY e.id,e.name
        ORDER BY e.name;`)
        return success(result, res, "200", "Success");
    } catch (error) {
        console.error("Error creating event:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}
const query = async (req, res) => {
    try {
        const result = await knex.raw(`SQL
        SELECT e.name, 
               SUM(o.total_amount) AS revenue, 
               SUM(ex.amount) AS expenses
        FROM events e
        LEFT JOIN orders o ON e.id = o.event_id
        LEFT JOIN expense ex ON e.id = ex.event_id
        where user_id = ${req.user.id}
        GROUP BY e.name
        ORDER BY e.name;`)
        return success(result, res, "200", "Success");
    } catch (error) {
        console.error("Error creating event:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}
module.exports = {
    upcomingEvents,
    revenue_and_expenses
}