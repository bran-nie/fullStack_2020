const loginRouter = require('express').Router();
const LoginServices = require('../services/login');

loginRouter.post('/', LoginServices.login);

module.exports = loginRouter;
