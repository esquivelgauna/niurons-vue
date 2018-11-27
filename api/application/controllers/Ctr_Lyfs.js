'use strict'
const Mdl_Lyfs = require('../models/Mdl_Lyfs')


exports.Lyfs = async (req, res) => {
  console.log('Buscando Lifs..');
  // console.log(req.user);
  let lyfs = [];
  if (!isNaN(req.body.idLyf)) {

  } else {
    lyfs = await Mdl_Lyfs.getTopLyfs(req.user.id);
  }
  return res.json({
    lyfs
  });
}
