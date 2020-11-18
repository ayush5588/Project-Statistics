const express = require('express');
const Router = express.Router();
const controller = require('./controller');


Router.route('/').get((req,res)=>{res.render('search')}).post(controller.search);

module.exports = Router;