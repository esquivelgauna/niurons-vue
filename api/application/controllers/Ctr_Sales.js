'use strict'
var Mdl_Sales = require('../models/Mdl_Sales');
var validate = require("validate.js");
exports.Sale = async (req, res) => {
  var constraints = {
    id: {
      presence: true, 
    }
  };

  validate.async(req.query, constraints).then(async (success) => {
  let sale = await Mdl_Sales.getSale(req.user.id, req.query.id );
  return res.json({
    sale
  });
  }, (error) => {
    console.log(error);
  });
}

exports.Sales = async (req, res) => {
  // console.log( req.query );
  let sales = await Mdl_Sales.getSales(req.user.id, req.query.id );
  return res.json({
    sales
  });
}
