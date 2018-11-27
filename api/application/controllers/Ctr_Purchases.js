'use strict'
var validate = require("validate.js");
const Mdl_Purchases = require('../models/Mdl_Purchases');

exports.Purchase = async (req, res) => {
  var constraints = {
    id: {
      presence: true
    }
  };
  validate.async(req.query, constraints).then(async (success) => {
    let purchase = await Mdl_Purchases.getPurchase(req.user.id, req.query.id)
    return res.json({
      purchase
    });
  }, (error) => {
    req.end();
  });
}

exports.Purchases = async (req, res) => {
  let purchases = await Mdl_Purchases.getPurchases(req.user.id, req.query.id);
  return res.json({
    purchases
  });
}
