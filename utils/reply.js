const _ = require('lodash');

const failedResponse = (reply, error, extraProps) => {
    try {
        let code = _.isNumber(error.code) ? error.code : 500;
        code = code === 11000 ? 400 : code;
        const response = {
            status: code,
            message: error.message,
            errors: error?.errors,
            stack: ['LOCAL', 'DEV'].includes(process.env.NODE_ENV) ? error.stack : undefined,
            ...extraProps
        };

        reply.status(code);
        reply.type('application/json');
        reply.send(response);
        return reply;
    } catch (e) {
        reply.status(500);
        reply.type('application/json');
        reply.send({ error: e });
        return reply;
    }
};

const success = (data, reply, code, message) => {
    const response = {
        status: code,
        message: message ?? 'Success!',
        success: data.success ?? true
    };

    if (data) {
        if (data.data) {
            response.data = data.data;
        } else {
            response.data = data
        }
        if (data.token) {
            response.token = data.token;
        }
        if (data.total !== null && data.total > -1) {
            response.total = data.total;
        }

    }

    reply.status(code);
    reply.type('application/json');
    reply.send(response);
    return reply;
};

module.exports = {
    failedResponse,
    success
};
