const { validateToken } = require('../midlewares');
const { salary } = require('../controllers');
const Router = require('express').Router();

Router.get('/:id', validateToken, salary.getSalaries)
Router.post('/', validateToken, salary.createSalary)
Router.delete('/:id', validateToken, salary.deleteSalary)
Router.patch('/:id', validateToken, salary.updateSalary)



module.exports = Router;
