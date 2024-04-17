const { validateToken } = require('../midlewares');
const { order } = require('../controllers');
const Router = require('express').Router();

Router.get('/', validateToken, order.getOrders)
Router.get('/:id', validateToken, order.getOrdersbyId)
Router.get('/event/:id', validateToken, order.getOrdersbyEvent)
Router.post('/', validateToken, order.createOrder)
Router.delete('/:id', validateToken, order.deleteOrder)
Router.patch('/:id', validateToken, order.updateOrder)



module.exports = Router;
