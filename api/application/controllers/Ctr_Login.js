'use strict'
const Mdl_Landing = require('../models/Mdl_Login')


exports.Login = async (req, res) => {
  console.log('Login en proceso');
  console.log(req.body);

  let token = await Mdl_Landing.Login(req.body.email, req.body.password);



  return res.json(token);
  // return  res(  )  ;
}
