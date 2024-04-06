const Router = require('express').Router();
Router.use("/auth", require('./auth'))
Router.use("/event", require('./event'))

module.exports = Router;