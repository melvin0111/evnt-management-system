const { event } = require('../controllers');
const { validateToken } = require('../midlewares');

const Router = require('express').Router();

Router.get('/', validateToken, event.getAllUserEvents)
Router.get('/:id', validateToken, event.getEventById)
Router.post('/', validateToken, event.create)
Router.delete('/:id', validateToken, event.del)
Router.patch('/:id', validateToken, event.updateEvent)

// EXPENSE ROUTES
// Router.post('/:id/expense', validateToken,)
// Router.get('/:id/expense', validateToken,)
// Router.patch('/:id/expense/:expense_id')
// Router.delete('/:id/expense/:expense_id', validateToken)


// TICKET ROUTES
// Router.post('/:id/ticket', validateToken,)
// Router.get('/:id/ticket', validateToken,)
// Router.patch('/:id/expense/:ticket_id', validateToken)
// Router.delete('/:id/expense/:ticket_id', validateToken)


module.exports = Router;
