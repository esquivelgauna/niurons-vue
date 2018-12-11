'use strict'
const Mdl_Lyfs = require('../models/Mdl_Lyfs')


exports.Lyfs = async (req, res) => {
  console.log(' Lyfs - Buscando Lyfs..');
  let lyfs = [];
  if (!isNaN(req.body.idLyf)) {

  } else {
    lyfs = await Mdl_Lyfs.getLyfs(req.user.id, null);
  }
  return res.json({
    lyfs
  });
}
exports.LyfsCategorie = async (req, res) => {
  console.log(' Lyfs - Buscando Lyfs..');

  let lyfs = await Mdl_Lyfs.getLyfsCategorie( null , req.query.id);
  return res.json({
    lyfs
  });
}


exports.ProfileLyfs = async (req, res) => {
  console.log(' profile- Buscando Lyfs..');


  let lyfs = [];
  if (!isNaN(req.body.idLyf)) {

  } else {
    lyfs = await Mdl_Lyfs.getTopLyfs(req.user.id);
  }
  return res.json({
    lyfs
  });
}
