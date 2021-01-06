const userRouter = require('express').Router();
const userServices = require('../services/user');

userRouter.post('/', userServices.createUser);
userRouter.get('/', userServices.getAllUsers);

module.exports = userRouter;
