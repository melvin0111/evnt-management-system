const { validateToken } = require('../midlewares');
const { expense_cat } = require('../controllers');
const Router = require('express').Router();


// EXPENSE CATTEGORY
Router.get('/cattegory', validateToken, expense_cat.getExpenseCategories)
Router.post('/cattegory', validateToken, expense_cat.createExpenseCategory)
Router.delete('/cattegory/:id', validateToken, expense_cat.deleteExpenseCategory)
Router.patch('/cattegory/:id', validateToken, expense_cat.updateExpenseCategory)


module.exports = Router;
