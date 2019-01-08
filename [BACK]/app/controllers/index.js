const controllers = {};

controllers.User = require('./User');
controllers.Mailer = require('./Mailer')
controllers.Survey = require('./Survey')

module.exports = controllers;