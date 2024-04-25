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

const highest_attendance = async (req, res) => {
    try {
        const [result] = await knex.raw(`SELECT e.name, COUNT(*) AS attendance
        FROM events e
        INNER JOIN orders o ON e.id = o.event_id
        where
        e.user_id = ${req.user.id}
        GROUP BY e.name
        ORDER BY attendance DESC
        LIMIT 1;`)
        return success(result, res, "200", "Success");
    } catch (error) {
        console.error("Error creating event:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}
const most_selling_ticket = async (req, res) => {
    try {
        const [result] = await knex.raw(`select event_name , ticket_type from (
            SELECT e.name as event_name , t.ticket_type as ticket_type,count( o.quantity ) as quantity , RANK() over (partition by e.name ORDER BY count( o.quantity )) as ranking
            FROM events e
            INNER JOIN tickets t ON e.id = t.event_id
            INNER JOIN orders o ON e.id = o.event_id
            where e.user_id = ${req.user.id}
            GROUP BY e.name,t.ticket_type) as temp where temp.ranking =1;`)
        return success(result, res, "200", "Success");
    } catch (error) {
        console.error("Error creating event:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}
const most_revenue_ticket = async (req, res) => {
    try {
        const [result] = await knex.raw(`select event_name , ticket_type from (
            SELECT e.name as event_name , t.ticket_type as ticket_type,SUM( o.total_amount ) as amount , RANK() over (partition by e.name ORDER BY SUM( o.total_amount ) ) as ranking
            FROM events e
            INNER JOIN tickets t ON e.id = t.event_id
            INNER JOIN orders o ON e.id = o.event_id
            where e.user_id = ${req.user.id}
            GROUP BY e.name,t.ticket_type) as temp where temp.ranking =1;`)
        return success(result, res, "200", "Success");
    } catch (error) {
        console.error("Error creating event:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}

const calender_anaylysis = async (req, res) => {
    try {
        const [result] = await knex.raw(`SELECT YEAR(e.start_date) AS year, MONTH(e.start_date) AS month, COUNT(*) AS num_events, SUM(o.total_amount) AS total_revenue
        FROM events e
        JOIN orders o ON e.id = o.event_id
        where e.user_id = ${req.user.id}
        GROUP BY YEAR(e.start_date), MONTH(e.start_date)
        ORDER BY year, month;`)
        return success(result, res, "200", "Success");
    } catch (error) {
        console.error("Error creating event:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}

const location_analysis = async (req, res) => {
    try {
        const [result] = await knex.raw(`SELECT location->>"$.city" AS City, 
        COUNT(distinct e.id ) AS NumberOfEvents,
        COALESCE(SUM(ex.amount), 0) AS TotalExpenses
        FROM events e
        LEFT JOIN expense ex ON e.id = ex.event_id
        where e.user_id = ${req.user.id}
        GROUP BY location->>"$.city" 
        ORDER BY NumberOfEvents DESC;`)
        return success(result, res, "200", "Success");
    } catch (error) {
        console.error("Error creating event:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}

const avg_ticket_price = async (req, res) => {
    try {
        const [result] = await knex.raw(`SELECT e.name AS EventName, 
        AVG(t.price) AS AverageTicketPrice
      FROM events e
      JOIN tickets t ON e.id = t.event_id
      GROUP BY e.name
      ORDER BY AverageTicketPrice DESC;`)
        return success(result, res, "200", "Success");
    } catch (error) {
        console.error("Error creating event:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}



module.exports = {
    upcomingEvents,
    revenue_and_expenses,
    highest_attendance,
    most_selling_ticket,
    most_revenue_ticket,
    calender_anaylysis,
    location_analysis,
    avg_ticket_price
}