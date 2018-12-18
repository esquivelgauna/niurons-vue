'use strict'
const Mdl_Profile = require('../models/Mdl_Profile');
var validate = require("validate.js");

exports.GetProfile = async (req, res) => {
  console.log(' Profile - Searching profile..');

  let profile = await Mdl_Profile.GetProfile(req.query.nickanme);
  return res.json({
    profile
  });
}

exports.GetUser = async (req, res) => {

  let profile = await Mdl_Profile.GetUser(req.query.nickanme);
  return res.json({
    profile
  });
}

exports.GetUser = async (req, res) => {
  console.log(' USER - Searching USER..');
  console.log(req.query);
  let constraints = {
    idUser: {
      presence: {
        message: "Falta el id del Lyf "
      },
    },
  };

  validate.async(req.query, constraints, {
    fullMessages: false
  }).then(
    async (success) => {
      console.log('Geting user ....', req.query.idUser);
      await Mdl_Profile.GetUser(req.query.idUser).then((profile) => {
        res.json({
          status: true,
          profile: profile,
        });
      }, (error) => {
        res.json({
          status: false,
          message: 'Perfil no ecnontrado',
        });
      });
    }, (errors) => {
      console.error(errors);
      res.json({
        status: false,
        message: errors
      })
    }
  );

}
