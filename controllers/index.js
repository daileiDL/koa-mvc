const router = require('koa-simple-router');
const IndexController = require('./IndexController.js');

let indexclr = new IndexController();

module.exports = (app) => {
    app.use(router(_ => {
        _.get('/', indexclr.actionIndex())
        _.post('/add', indexclr.actionAdd())
    }))
};