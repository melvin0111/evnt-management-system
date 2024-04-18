const Joi = require('@hapi/joi');
const HTTP_ERRORS = require('../utils/rest_errors');
const knex = require('../db')
const { failedResponse, success } = require('../utils/reply')
const _ = require('lodash');

const createSalary = async (req, res) => {
    // Define the schema for validating the request body
    const schema = Joi.object({
        event_id: Joi.number().integer().required(),
        name: Joi.string().max(255).required(),
        hourly_rate: Joi.number().required(),
        total_amount: Joi.number().required(),
        paid_at: Joi.date().iso().optional(),
    });

    // Validate the request body
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return failedResponse(res, new HTTP_ERRORS.BadRequestError(validationResult.error.details[0].message));
    }

    const newSalary = validationResult.value; // Extract validated data

    try {
        // Insert the new salary into the database
        const [salaryId] = await knex('salaries').insert(newSalary);

        // Return a success response with the created salary ID
        return success({ id: salaryId }, res, "200", "Salary Created Successfully");
    } catch (error) {
        console.error("Error creating salary:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}

const getSalaries = async (req, res) => {
    try {
        const eventid = req.params.id
        // Retrieve all salaries from the database
        const salaries = await knex('salaries').select('*').where({ event_id: eventid });

        // Return a success response with the salaries
        return success(salaries, res, "200", "salaries Retrieved Successfully");
    } catch (error) {
        console.error("Error retrieving salaries:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}

const updateSalary = async (req, res) => {
    const salaryId = req.params.id;

    // Define the schema for validating the request body
    const schema = Joi.object({
        event_id: Joi.number().integer().optional(),
        name: Joi.string().max(255).optional(),
        hourly_rate: Joi.number().optional(),
        total_amount: Joi.number().optional(),
        paid_at: Joi.date().iso().optional(),
    });

    // Validate the request body
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return failedResponse(res, new HTTP_ERRORS.BadRequestError(validationResult.error.details[0].message));
    }

    const updatedSalary = validationResult.value; // Extract validated data

    try {
        // Update the salary in the database
        await knex('salaries')
            .where({ id: salaryId })
            .update(updatedSalary);

        // Return a success response
        return success({}, res, "200", "Salary Updated Successfully");
    } catch (error) {
        console.error("Error updating salary:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}

const deleteSalary = async (req, res) => {
    const salaryId = req.params.id;

    try {
        // Delete the salary from the database
        await knex('salaries')
            .where({ id: salaryId })
            .del();

        // Return a success response
        return success({}, res, "200", "Salary Deleted Successfully");
    } catch (error) {
        console.error("Error deleting salary:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}

module.exports = {
    createSalary,
    getSalaries,
    updateSalary,
    deleteSalary
}
