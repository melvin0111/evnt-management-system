/* eslint-disable max-classes-per-file */
const _ = require('lodash');

class BaseError extends Error {
    constructor(message) {
        super(message);
        // this.name = this.constructor.name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = new Error(message).stack;
        }
    }
}

exports.BaseError = BaseError;

class HTTPResponseError extends BaseError {
    constructor(message, type, status) {
        super(message);

        this.message = message;
        this.type = type;
        this.code = status;
        this.status = false;
        this.statusCode = status;
    }
}

/**
 * Class representing a 400 Bad Request Error
 *
 * @augments HTTPResponseError
 */
class BadRequestError extends HTTPResponseError {
    /**
     * Create a 400 Bad Request Error Class.
     *
     * @param {string} msg - Error message
     */
    constructor(msg = 'The server cannot or will not process the request due to something that is perceived to be a client error.') {
        super(msg, 'Bad Request', 400);
        this.name = 'BadRequestError';
    }
}
exports.BadRequestError = BadRequestError;

/**
 * Class representing a 401 Unauthorized Error
 *
 * @augments HTTPResponseError
 */
class UnauthorizedError extends HTTPResponseError {
    /**
     * Create a 401 Unauthorized Error Class.
     *
     * @param {string} msg - Error message
     */
    constructor(msg = 'The request has not been applied because it lacks valid authorization for the target resource.') {
        super(msg, 'Unauthorized', 401);
        this.name = 'Unauthorized';
    }
}
exports.UnauthorizedError = UnauthorizedError;

/**
 * Class representing a 403 Forbidden Error
 *
 * @augments HTTPResponseError
 */
class ForbiddenError extends HTTPResponseError {
    /**
     * Create a Forbidden Error Class.
     *
     * @param {string} msg - Error message
     */
    constructor(msg = 'The server understood the request but refuses to authorize it.') {
        super(msg, 'Forbidden', 403);
        this.name = 'Forbidden';
    }
}
exports.ForbiddenError = ForbiddenError;

/**
 * Class representing a 500 Internal Server Error
 *
 * @augments HTTPResponseError
 */
class InternalServerError extends HTTPResponseError {
    /**
     * Create a Internal Server Error.
     *
     * @param {string} msg - Error message
     */
    constructor(msg = 'The server encountered an unexpected condition that prevented it from fulfilling the request.') {
        super(msg, 'Internal Server Error', 500);
        this.name = 'InternalServerError';
    }
}
exports.InternalServerError = InternalServerError;

/**
 * Class representing a 503 Service Unavailable Error
 *
 * @augments HTTPResponseError
 */
class ServiceUnavailableError extends HTTPResponseError {
    /**
     * Create a Service Unavailable Error.
     *
     * @param {string} msg - Error message
     */
    constructor(
        msg = 'The server is currently unable to handle the request due to a temporary overload or scheduled maintenance, which will likely be alleviated after some delay.'
    ) {
        super(msg, 'Service Unavailable', 503);
        this.name = 'ServiceUnavailableError';
    }
}
exports.ServiceUnavailableError = ServiceUnavailableError;

/**
 * Class representing a 404 Not Found Error.
 *
 * @augments HTTPResponseError
 */
class NotFoundError extends HTTPResponseError {
    /**
     * Create a Not Found Error.
     *
     * @param {string} msg - Error message
     */
    constructor(msg = 'Resource not found') {
        super(msg, 'Not Found', 404);
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;

/**
 * Class representing a 400 Validation Errors
 *
 * @augments HTTPResponseError
 */
class ValidationError extends BadRequestError {
    /**
     * Create a Validation Error.
     *
     * @param {string} module_name
     * @param {object} errs
     */
    constructor(errs = {}) {
        super('Validation Failed.', 'ValidationError', 400);
        this.name = 'ValidationError';

        if (!_.isEmpty(errs)) this.errors = errs;
    }
}
exports.ValidationError = ValidationError;

/**
 * Class representing a 400 Validation Errors
 *
 * @augments HTTPResponseError
 */
class CustomValidationError extends BadRequestError {
    /**
     * Create a Custom Validation Error.
     *
     * @param {object} errs
     */
    constructor(errs = []) {
        super('Validation Failed.', 'ValidationError', 400);
        this.name = 'CustomValidationError';

        if (!_.isEmpty(errs)) this.errors = errs;
    }
}
exports.CustomValidationError = CustomValidationError;

/**
 * Class representing a 401 Authentication Errors
 *
 * @augments UnauthorizedError
 */
class AuthenticationError extends UnauthorizedError {
    /**
     * Create a 401 Authentication Error Class.
     *
     * @param {string} msg - Error message
     */
    constructor(msg = 'Authentication failed') {
        super(msg);

        this.name = 'AuthenticationError';
    }
}
exports.AuthenticationError = AuthenticationError;

/**
 * Class representing a 409 Conflict Error
 *
 * @augments HTTPResponseError
 */
class ConflictError extends HTTPResponseError {
    /**
     * Create a 409 Conflict Error Class.
     *
     * @param {string} msg - Error message
     */
    constructor(
        msg = 'The request could not be completed due to a conflict with the current state of the target resource. This code is used in situations where the user might be able to resolve the conflict and resubmit the request.'
    ) {
        super(msg, 'Conflict', 409);

        this.name = 'ConflictError';
    }
}
exports.ConflictError = ConflictError;

/**
 * Class representing a 415 Unsupported Media Type Error.
 *
 * @augments HTTPResponseError
 */
class UnsupportedMediaTypeError extends HTTPResponseError {
    /**
     * Create a Unsupported Media Type Error.
     *
     * @param {string} msg - Error message
     */
    constructor(msg = 'The origin server is refusing to service the request because the payload is in a format not supported by this method on the target resource.') {
        super(msg, 'Unsupported Media Type', 415);

        this.name = 'UnsupportedMediaTypeError';
    }
}
exports.UnsupportedMediaTypeError = UnsupportedMediaTypeError;

/**
 * Class representing a 405 Method Not Allowed Error.
 *
 * @augments HTTPResponseError
 */
class MethodNotAllowed extends HTTPResponseError {
    /**
     * Create a Unsupported Media Type Error.
     *
     * @param {string} msg - Error message
     */
    constructor(msg = 'The method received in the request-line is known by the origin server but not supported by the target resource.') {
        super(msg, 'Method Not Allowed', 405);

        this.name = 'MethodNotAllowed';
    }
}
exports.MethodNotAllowed = MethodNotAllowed;

/**
 * Class representing a 405 Service Unavailable Error.
 *
 * @augments HTTPResponseError
 */
class MaintenanceError extends HTTPResponseError {
    /**
     * Create a Service Unavailable Error.
     *
     * @param {string} msg - Error message
     */
    constructor(
        msg = 'The server is currently unable to handle the request due to a temporary overload or scheduled maintenance, which will likely be alleviated after some delay.'
    ) {
        super(msg, 'Service Unavailable', 503);

        this.name = 'MaintenanceError';
    }
}
exports.MaintenanceError = MaintenanceError;

/**
 * Class representing a 422 Unprocessable Entity Error.
 *
 * @augments HTTPResponseError
 */
class UnprocessableEntityError extends HTTPResponseError {
    /**
     * Create a Unprocessable Entity Error.
     *
     * @param {string} msg - Error message
     */
    constructor(msg = 'The request was well-formed but was unable to be followed due to semantic errors.') {
        super(msg, 'Unprocessable Entity', 422);

        this.name = 'UnprocessableEntityError';
    }
}
exports.UnprocessableEntityError = UnprocessableEntityError;

/**
 * Class representing a 501 Not Implemented Error.
 *
 * @augments HTTPResponseError
 */
class NotImplementedError extends HTTPResponseError {
    /**
     * Create a Not Implemented Error.
     *
     * @param {string} msg - Error message
     */
    constructor(msg = 'The server does not support the functionality required to fulfill the request.') {
        super(msg, 'Not Implemented', 501);

        this.name = 'NotImplementedError';
    }
}
exports.NotImplementedError = NotImplementedError;

module.exports.API_ERRORS = [
    ValidationError,
    BadRequestError,
    NotFoundError,
    ForbiddenError,
    UnauthorizedError,
    InternalServerError,
    ServiceUnavailableError,
    AuthenticationError,
    ConflictError,
    UnsupportedMediaTypeError,
    MethodNotAllowed,
    MaintenanceError,
    UnprocessableEntityError,
    NotImplementedError,
    CustomValidationError
];
