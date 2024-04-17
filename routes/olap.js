const { validateToken } = require('../midlewares');
const { olap } = require('../controllers');
const Router = require('express').Router();

Router.get('/upcoming', olap.upcomingEvents)
Router.get('/revenueandexpenses', validateToken, olap.revenue_and_expenses)


module.exports = Router;
