const Joi = require('@hapi/joi');
const HTTP_ERRORS = require('../utils/rest_errors');
const knex = require('../db')
const { failedResponse, success } = require('../utils/reply')
const _ = require('lodash');
const createExpense = async (req, res) => {
    // Define the schema for validating the request body
    const schema = Joi.object({
        event_id: Joi.number().integer().required(),
        category_id: Joi.number().integer().required(),
        description: Joi.string().max(255).required(),
        amount: Joi.number().required(),
        paid_at: Joi.date().iso().optional(),
        receipt_url: Joi.string().max(255).optional(),
    });

    // Validate the request body
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return failedResponse(res, new HTTP_ERRORS.BadRequestError(validationResult.error.details[0].message));
    }

    const newExpense = validationResult.value; // Extract validated data

    try {
        // Insert the new expense into the database
        const [expenseId] = await knex('expense').insert(newExpense);

        // Return a success response with the created expense ID
        return success({ id: expenseId }, res, "200", "Expense Created Successfully");
    } catch (error) {
        console.error("Error creating expense:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}

const getExpenses = async (req, res) => {
    try {
        const event_id = req.params.id
        // Retrieve all expenses from the database
        const expenses = await knex('expense').select('*').where({ event_id });

        // Return a success response with the expenses
        return success(expenses, res, "200", "Expenses Retrieved Successfully");
    } catch (error) {
        console.error("Error retrieving expenses:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}

const updateExpense = async (req, res) => {
    const expenseId = req.params.id;
    // Define the schema for validating the request body
    const schema = Joi.object({
        event_id: Joi.number().integer().optional(),
        category_id: Joi.number().integer().optional(),
        description: Joi.string().max(255).optional(),
        amount: Joi.number().optional(),
        paid_at: Joi.date().iso().optional(),
        receipt_url: Joi.string().max(255).optional(),
    });

    // Validate the request body
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return failedResponse(res, new HTTP_ERRORS.BadRequestError(validationResult.error.details[0].message));
    }

    const updatedExpense = validationResult.value; // Extract validated data

    try {
        // Update the expense in the database
        await knex('expense')
            .where({ id: expenseId })
            .update(updatedExpense);

        // Return a success response
        return success({}, res, "200", "Expense Updated Successfully");
    } catch (error) {
        console.error("Error updating expense:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}

const deleteExpense = async (req, res) => {
    const expenseId = req.params.id;

    try {
        // Delete the expense from the database
        await knex('expense')
            .where({ id: expenseId })
            .del();

        // Return a success response
        return success({}, res, "200", "Expense Deleted Successfully");
    } catch (error) {
        console.error("Error deleting expense:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}

module.exports = {
    createExpense,
    getExpenses,
    updateExpense,
    deleteExpense
}
