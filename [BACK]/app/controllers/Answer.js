const jwt = require('jsonwebtoken');
const passport = require('passport');
const Utils = require('./Utils');
const bcrypt = require('bcrypt-nodejs');
const models = require('../../models/');


exports.getAnswer = async function (req, res) {
    models.Survey.findAll({where: {AuthorId: 1}})
                 .then(data => {
                     return res.status(200).json({
                         data:data
                     })
                 })
    // await passport.authenticate('jwt', {session: false}, (err, user, info) => {
    //     if (err || !user) {
    //         return res.status(400).json({
    //             message: err,
    //             user: user
    //         });
    //     }
    //
    //     // else {
    //          models.Survey.findAll({where: {userId: userId}})
    //              .then(data => {
    //                  return res.status(200).json({
    //                      data:data
    //                  })
    //              })
    //         //  models.usersurzveys.find(
    //         //     {
    //         //         where: {id: 1}
    //         //     }
    //         // ).then(data => {
    //         //     return res.status(200).json({
    //         //         msg: data
    //         //     })
    //         // })
    //         //     .catch(err => {
    //         //         return res.status(400).json({
    //         //             err: err
    //         //         })
    //         //     })
    //         // return res.status(200).json({
    //         //             msg: 11
    //         // })
    //     ;
    //     // }
    // })(req, res);
};