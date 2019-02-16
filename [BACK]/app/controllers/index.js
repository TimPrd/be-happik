const controllers = {};

controllers.User = require('./User');
controllers.Mailer = require('./Mailer')
controllers.Question = require('./Question')
controllers.Survey = require('./Survey')
controllers.Team = require('./Team')
controllers.Mood = require('./Mood')
controllers.Analytic = require('./Analytic')
module.exports = controllers;
