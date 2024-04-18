const { event, tickets, expense } = require('../controllers');
const { validateToken } = require('../midlewares');

const Router = require('express').Router();

Router.get('/', validateToken, event.getAllUserEvents)
Router.get('/:id', validateToken, event.getEventById)
Router.post('/', validateToken, event.create)
Router.delete('/:id', validateToken, event.del)
Router.patch('/:id', validateToken, event.updateEvent)

// EXPENSE ROUTES
Router.post('/expense', validateToken, expense.createExpense)
Router.get('/:id/expense', validateToken, expense.getExpenses)
Router.patch('/expense/:id', validateToken, expense.updateExpense)
Router.delete('/expense/:id', validateToken, expense.deleteExpense)


// TICKET ROUTES
Router.get('/:id/ticket', validateToken, tickets.getEventTickets)
Router.post('/ticket', validateToken, tickets.create)
Router.patch('/ticket/:id', validateToken, tickets.update)
Router.delete('/ticket/:id', validateToken, tickets.del)


module.exports = Router;
