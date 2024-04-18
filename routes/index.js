const Router = require('express').Router();
Router.use("/auth", require('./auth'))
Router.use("/event", require('./event'))
Router.use("/order", require('./order'))
Router.use("/salary", require('./salary'))
Router.use("/expense", require('./expense'))
Router.use("/olap", require('./olap'))

module.exports = Router;