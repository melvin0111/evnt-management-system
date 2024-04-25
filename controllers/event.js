const Joi = require('@hapi/joi');
const HTTP_ERRORS = require('../utils/rest_errors');
const knex = require('../db')
const { failedResponse, success } = require('../utils/reply')
const _ = require('lodash');

const create = async (req, res) => {
    // Define the schema for validating the request body
    const schema = Joi.object({
        name: Joi.string().max(255).required(),
        description: Joi.string().max(255).required(),
        start_date: Joi.date().required(),
        end_date: Joi.date().required().greater(Joi.ref('start_date')), // Ensure end date is after start date
        location: Joi.object().required(),
        user_id: Joi.number().integer().optional(),
        capacity: Joi.number().integer().required(),
    });

    // Validate the request body
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return failedResponse(res, new HTTP_ERRORS.BadRequestError(validationResult.error.details[0].message), validationResult.error.details[0].message);
    }

    const newEvent = validationResult.value; // Extract validated data
    if (!newEvent.user_id) newEvent.user_id = req.user.id
    try {
        // Insert the new event into the database
        const [eventId] = await knex('events').insert(newEvent);

        // Return a success response with the created event ID
        return success({ id: eventId }, res, "200", "Event Created Succesfully");
    } catch (error) {
        console.error("Error creating event:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error), "Failed to create event");
    }
}
const del = async (req, res) => {
    // Define route parameter for event ID
    const eventId = req.params.id;

    // Validation (optional)
    if (!eventId) {
        return failedResponse(res, new HTTP_ERRORS.BadRequestError("Missing event ID in params"));
    }

    try {
        // Delete the event with the specified ID
        const deletedCount = await knex('events')
            .where('id', eventId)
            .del();

        if (deletedCount === 0) {
            // Event not found
            return failedResponse(res, new HTTP_ERRORS.NotFoundError("Event not found"), "Event not found");
        }

        // Event deleted successfully
        return success({ message: "Event deleted successfully" }, res, "200");
    } catch (error) {
        console.error("Error deleting event:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError(error));
    }
};
const getAllUserEvents = async (req, res) => {
    // Define route parameter for user ID (optional)
    const userId = req.user.id;

    // Validation (optional)
    if (!userId) {
        return failedResponse(res, new HTTP_ERRORS.BadRequestError("Missing user ID"));
    }

    try {
        // Query events for the specified user
        const events = await knex('events')
            .where('user_id', userId)
            .select('*');  // Select all columns

        // Return the user's events
        return success(events, res, "200");
    } catch (error) {
        console.error("Error getting user events:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError("Failed to get user events"));
    }
};
const getEventById = async (req, res) => {
    // Define route parameter for event ID
    const eventId = req.params.id;

    // Validation (optional)
    if (!eventId) {
        return failedResponse(res, HTTP_ERRORS.BadRequestError("Missing event ID"));
    }

    try {
        // Query event with the specified ID
        const event = await knex('events')
            .where('id', eventId)
            .first();  // Select the first matching row

        if (!event) {
            // Event not found
            return failedResponse(res, new HTTP_ERRORS.NotFoundError("Event not found"));
        }

        // Return the retrieved event
        return success(event, res, "200");
    } catch (error) {
        console.error("Error getting event by ID:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError("Failed to get event"));
    }
};
const updateEvent = async (req, res) => {
    // Define route parameter for event ID
    const eventId = req.params.id;

    // Validation (optional)
    if (!eventId) {
        return failedResponse(res, new HTTP_ERRORS.BadRequestError("Missing event ID"));
    }

    // Extract update data from request body
    const updateData = req.body;

    // Validation (optional)
    if (Object.keys(updateData).length === 0) {
        return failedResponse(res, new HTTP_ERRORS.BadRequestError("Missing update data"));
    }

    try {
        // Update the event with the specified ID
        const updatedCount = await knex('events')
            .where('id', eventId)
            .update(updateData);

        if (updatedCount === 0) {
            // Event not found
            return failedResponse(res, new HTTP_ERRORS.NotFoundError("Event not found"));
        }

        // Event updated successfully
        return success({ message: "Event updated successfully" }, res, "200");
    } catch (error) {
        console.error("Error updating event:", error);
        return failedResponse(res, new HTTP_ERRORS.InternalServerError("Failed to update event"));
    }
};

module.exports = {
    create,
    del,
    getAllUserEvents,
    getEventById,
    updateEvent
}