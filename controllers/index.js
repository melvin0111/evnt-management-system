const auth = require('./auth.js')
const event = require('./event.js')
const tickets = require('./tickets.js')
const order = require('./orders.js')
const salary = require('./salaries.js')
const expense_cat = require('./expense_cat.js')
const expense = require('./expenses.js')
const olap = require('./olap.js')
module.exports = {
    auth,
    event,
    tickets,
    order,
    salary,
    expense,
    expense_cat,
    olap
}