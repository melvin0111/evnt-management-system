const Joi = require('@hapi/joi');
const HTTP_ERRORS = require('../utils/rest_errors');
const knex = require('../db')
const { failedResponse, success } = require('../utils/reply')
const _ = require('lodash');


const create = async (req, res) => {
    // Define the schema for validating the request body
    const schema = Joi.object({
        description: Joi.string().max(255).required(),
        event_id: Joi.number().integer().required(),
        ticket_type: Joi.string().max(255).required(),
        quantity: Joi.number().integer().required(),
        price: Joi.number().required(),
    });

    // Validate the request body
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return failedResponse(res, new HTTP_ERRORS.BadRequestError(validationResult.error.details[0].message));
    }

    const newTicket = validationResult.value; // Extract validated data

    try {
        // Insert the new ticket into the database
        const [ticketId] = await knex('tickets').insert(newTicket);

        // Return a success response with the created ticket ID
        return success({ id: ticketId }, res, "200", "Ticket Created Successfully");
    } catch (error) {
        console.error("Error creating ticket:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}
const getEventTickets = async (req, res) => {
    const eventId = req.params.id;

    // Validation (optional)
    if (!eventId) {
        return failedResponse(res, new HTTP_ERRORS.BadRequestError("Missing event ID"));
    }

    try {
        const tickets = await knex('tickets')
            .where('event_id', eventId)
            .select('*');  // Select all columns

        return success(tickets, res, "200");
    } catch (error) {
        console.error("Error getting tickets:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError("Failed to get tickets"));
    }
};


const update = async (req, res) => {
    const ticketId = req.params.id;

    // Define the schema for validating the request body
    const schema = Joi.object({
        description: Joi.string().max(255).optional(),
        event_id: Joi.number().integer().optional(),
        ticket_type: Joi.string().max(255).optional(),
        quantity: Joi.number().integer().optional(),
        price: Joi.number().optional(),
    });

    // Validate the request body
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return failedResponse(res, new HTTP_ERRORS.BadRequestError(validationResult.error.details[0].message));
    }

    const updatedTicket = validationResult.value; // Extract validated data

    try {
        // Update the ticket in the database
        const result = await knex('tickets')
            .where({ id: ticketId })
            .update(updatedTicket);

        // Return a success response
        return success(result, res, "200", "Ticket Updated Successfully");
    } catch (error) {
        console.error("Error updating ticket:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}

const del = async (req, res) => {
    const ticketId = req.params.id;

    try {
        // Delete the ticket from the database
        const result = await knex('tickets')
            .where({ id: ticketId })
            .del();

        // Return a success response
        return success(result, res, "200", "Ticket Deleted Successfully");
    } catch (error) {
        console.error("Error deleting ticket:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
}



module.exports = {
    create,
    getEventTickets,
    update,
    del
}


