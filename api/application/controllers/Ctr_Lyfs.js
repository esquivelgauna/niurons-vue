'use strict'
const Mdl_Lyfs = require('../models/Mdl_Lyfs')
var validate = require("validate.js");

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

  let lyfs = await Mdl_Lyfs.getLyfsCategorie(null, req.query.id);
  return res.json({
    lyfs
  });
}
exports.LyfSearchCategories = async (req, res) => {
  console.log(' Lyf Searching Categories ..');
  console.log(req.query.data);
  if (req.query.data.categories) {
    var constraints = {
      min: {
        presence: true
      },
      max: {
        presence: true
      },
      words: {
        presence: true
      },
      categories: {
        presence: true
      }
    };
    validate.async(req.query.data, constraints).then(async (success) => {
      let lyfs = await Mdl_Lyfs.searchLyfsCategories(null, req.query.data);
      return res.json({
        lyfs
      });
    }, (error) => {
      console.log(error);
      return res.json([]);
    });
  } else {
    var constraints = {
      min: {
        presence: true
      },
      max: {
        presence: true
      },
      words: {
        presence: true
      },
    };
    validate.async(req.query.data, constraints).then(async (success) => {
      let lyfs = await Mdl_Lyfs.searchLyfsCategories(null, req.query.data);
      return res.json({
        lyfs
      });
    }, (error) => {
      console.log(error);
      return res.json([]);
    });
  }







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
 

exports.GetLyf = async (req, res) => {
  console.log(' LYF - Buscando Lyf.....');
  console.log(req.query);
  let constraints = {
    idLyf: {
      presence: {
        message: "Falta el id del Lyf "
      },
    },
  };

  validate.async(req.query, constraints, {
    fullMessages: false
  }).then(
    async (success) => {

      console.log('Geting LYF ....' , req.query.idLyf );
      await Mdl_Lyfs.GetLyf(req.query.idLyf ).then(( lyf ) => {

        res.json({
          status: true,
          lyf: lyf ,
        });

      }, (error) => {

        res.json({
          status: false,
          message: 'Lyf no ecnontrado',
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


