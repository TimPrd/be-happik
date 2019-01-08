const controllers = {};

controllers.User = require('./User');
controllers.Mailer = require('./Mailer')
controllers.Question = require('./Question')
controllers.Survey = require('./Survey')
module.exports = controllers;
