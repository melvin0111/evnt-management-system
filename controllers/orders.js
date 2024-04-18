const Joi = require('@hapi/joi');
const HTTP_ERRORS = require('../utils/rest_errors');
const knex = require('../db')
const { failedResponse, success } = require('../utils/reply')
const _ = require('lodash');

const createOrder = async (req, res) => {
    // Define the schema for validating the request body
    const schema = Joi.object({
        event_id: Joi.number().integer().required(),
        ticket_id: Joi.number().integer().optional(),
        quantity: Joi.number().integer().required(),
        total_amount: Joi.number().required(),
        status: Joi.number().integer().optional(),
    });

    // Validate the request body
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return failedResponse(res, new HTTP_ERRORS.BadRequestError(validationResult.error.details[0].message));
    }

    const newOrder = validationResult.value; // Extract validated data

    try {
        // Insert the new order into the database
        const [orderId] = await knex('orders').insert({ ...newOrder, user_id: req.user.id });

        // Return a success response with the created order ID
        return success({ id: orderId }, res, "200", "Order Created Successfully");
    } catch (error) {
        console.error("Error creating order:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}

const getOrders = async (req, res) => {
    try {
        const id = req.user.id
        // Retrieve all orders from the database
        const orders = await knex('orders').select('*').where({
            user_id: id
        });

        // Return a success response with the orders
        return success(orders, res, "200", "Orders Retrieved Successfully");
    } catch (error) {
        console.error("Error retrieving orders:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}

const getOrdersbyEvent = async (req, res) => {
    try {
        const id = req.params.id
        // Retrieve all orders from the database
        const orders = await knex('orders').select('*').where({
            event_id: id
        });

        // Return a success response with the orders
        return success(orders, res, "200", "Orders Retrieved Successfully");
    } catch (error) {
        console.error("Error retrieving orders:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}

const getOrdersbyId = async (req, res) => {
    try {
        const id = req.params.id
        // Retrieve all orders from the database
        const orders = await knex('orders').select('*').where({
            id
        });

        // Return a success response with the orders
        return success(orders, res, "200", "Orders Retrieved Successfully");
    } catch (error) {
        console.error("Error retrieving orders:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}
const updateOrder = async (req, res) => {
    const orderId = req.params.id;

    // Define the schema for validating the request body
    const schema = Joi.object({
        user_id: Joi.number().integer().optional(),
        event_id: Joi.number().integer().optional(),
        ticket_id: Joi.number().integer().optional(),
        quantity: Joi.number().integer().optional(),
        total_amount: Joi.number().optional(),
        status: Joi.number().integer().optional(),
    });

    // Validate the request body
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return failedResponse(res, new HTTP_ERRORS.BadRequestError(validationResult.error.details[0].message), validationResult.error.details[0].message);
    }

    const updatedOrder = validationResult.value; // Extract validated data

    try {
        // Update the order in the database
        await knex('orders')
            .where({ id: orderId })
            .update(updatedOrder);

        // Return a success response
        return success({}, res, "200", "Order Updated Successfully");
    } catch (error) {
        console.error("Error updating order:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error), "Failed to update order");
    }
}

const deleteOrder = async (req, res) => {
    const orderId = req.params.id;

    try {
        // Delete the order from the database
        await knex('orders')
            .where({ id: orderId })
            .del();

        // Return a success response
        return success({}, res, "200", "Order Deleted Successfully");
    } catch (error) {
        console.error("Error deleting order:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error), "Failed to delete order");
    }
}

module.exports = {
    createOrder,
    getOrders,
    updateOrder,
    deleteOrder,
    getOrdersbyEvent,
    getOrdersbyId

}
