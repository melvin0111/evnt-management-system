const { auth } = require('../controllers');
const { validateToken } = require('../midlewares');

const Router = require('express').Router();
Router.post('/login', auth.login)
Router.post('/register', auth.register)
Router.post('/event', validateToken,)



module.exports = Router;
