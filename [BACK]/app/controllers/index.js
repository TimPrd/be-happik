const controllers = {};

controllers.User = require('./User');
controllers.Mailer = require('./Mailer')
controllers.Question = require('./Question')
controllers.Survey = require('./Survey')
controllers.Answer = require('./Answer')
// controllers.Team = require('./Team')

module.exports = controllers;
