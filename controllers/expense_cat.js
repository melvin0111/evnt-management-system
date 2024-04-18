
const Joi = require('@hapi/joi');
const HTTP_ERRORS = require('../utils/rest_errors');
const knex = require('../db')
const { failedResponse, success } = require('../utils/reply')
const _ = require('lodash');


const createExpenseCategory = async (req, res) => {
    // Define the schema for validating the request body
    const schema = Joi.object({
        name: Joi.string().max(255).required(),
        description: Joi.string().max(255).optional(),
    });

    // Validate the request body
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return failedResponse(res, new HTTP_ERRORS.BadRequestError(validationResult.error.details[0].message));
    }

    const newExpenseCategory = validationResult.value; // Extract validated data

    try {
        // Insert the new expense category into the database
        const [categoryId] = await knex('expense_categories').insert(newExpenseCategory);

        // Return a success response with the created category ID
        return success({ id: categoryId }, res, "200", "Expense Category Created Successfully");
    } catch (error) {
        console.error("Error creating expense category:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}

const getExpenseCategories = async (req, res) => {
    try {
        // Retrieve all expense categories from the database
        const categories = await knex('expense_categories').select('*');

        // Return a success response with the categories
        return success(categories, res, "200", "Expense Categories Retrieved Successfully");
    } catch (error) {
        console.error("Error retrieving expense categories:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}

const updateExpenseCategory = async (req, res) => {
    const categoryId = req.params.id;

    // Define the schema for validating the request body
    const schema = Joi.object({
        name: Joi.string().max(255).optional(),
        description: Joi.string().max(255).optional(),
    });

    // Validate the request body
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return failedResponse(res, new HTTP_ERRORS.BadRequestError(validationResult.error.details[0].message));
    }

    const updatedExpenseCategory = validationResult.value; // Extract validated data

    try {
        // Update the expense category in the database
        await knex('expense_categories')
            .where({ id: categoryId })
            .update(updatedExpenseCategory);

        // Return a success response
        return success({}, res, "200", "Expense Category Updated Successfully");
    } catch (error) {
        console.error("Error updating expense category:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}

const deleteExpenseCategory = async (req, res) => {
    const categoryId = req.params.id;

    try {
        // Delete the expense category from the database
        await knex('expense_categories')
            .where({ id: categoryId })
            .del();

        // Return a success response
        return success({}, res, "200", "Expense Category Deleted Successfully");
    } catch (error) {
        console.error("Error deleting expense category:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}

module.exports = {
    createExpenseCategory,
    getExpenseCategories,
    updateExpenseCategory,
    deleteExpenseCategory
}
