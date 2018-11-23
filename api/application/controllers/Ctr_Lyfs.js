'use strict'
const Mdl_Lyfs= require('../models/Mdl_Login')


exports.Lyfs = async (req, res) => {
  console.log('Buscando Lifs..');
  console.log(req.body);
  if(req.body.idLyf){

  }else{
    let myLyfs = await Mdl_Lyfs.Lyfs( );
  }
  



  return res.json(myLyfs); 
}
