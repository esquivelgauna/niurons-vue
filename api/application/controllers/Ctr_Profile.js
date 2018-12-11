'use strict'
const Mdl_Profile = require('../models/Mdl_Profile')

 
exports.GetProfile = async (req, res) => {
  console.log(' Profile - Searching profile..');

  let profile = await Mdl_Profile.GetProfile( req.query.nickanme);
  return res.json({
    profile
  });
}

 