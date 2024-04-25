const { validateToken } = require('../midlewares');
const { olap } = require('../controllers');
const Router = require('express').Router();

Router.get('/upcoming', olap.upcomingEvents)
Router.get('/revenueandexpenses', validateToken, olap.revenue_and_expenses)
Router.get('/eventwithhighestattendance', validateToken, olap.highest_attendance)
Router.get('/mostsellingticket', validateToken, olap.most_selling_ticket)
Router.get('/mostsrevenuegeneratingticket', validateToken, olap.most_revenue_ticket)
Router.get('/calender_analysis', validateToken, olap.calender_anaylysis)
Router.get('/location_analysis', validateToken, olap.location_analysis)
Router.get('/avg_ticket_price', validateToken, olap.avg_ticket_price)


module.exports = Router;
