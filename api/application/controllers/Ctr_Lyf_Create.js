'use strict'
const Mdl_Lyf_Create = require('../models/Mdl_Lyf_Create')
var validate = require("validate.js");


exports.Generals = async (req, res) => {
  console.log(' Save Generals ..');
  console.log(req.body);
  let constraints = {
    title: {
      presence: {
        message: "Falta el Título "
      },
      length: {
        minimum: 10,
        maximum: 50,
        message: "Título: Mínimo 10  , Máximo 50 Caracteres"
      }
    },
    categorie: {
      presence: {
        message: "Recuerda seleccionar una Categoría "
      },
    },
    subcat: {
      presence: {
        message: "Recuerda seleccionar una Subcategoría "
      },
    },
    description: {
      presence: {
        message: "Falta la descripción "
      },
      length: {
        minimum: 30,
        maximum: 500,
        message: "Descripción: Mínimo 30  , Máximo 500 Caracteres"
      }
    },
    tags: {
      presence: {
        message: "Faltan las palabras clave "
      },
      length: {
        minimum: 2,
        maximum: 10,
        message: "Palabras clave: Mínimo 2 , Máximo 10 "
      }
    },
    req: {
      presence: {
        message: "Faltan los requerimientos "
      },
      length: {
        minimum: 20,
        maximum: 500,
        message: "Requerimientos : Mínimo 20 , Máximo 500 Caracteres"
      }
    }

  };
  validate.async(req.body, constraints, {
    fullMessages: false
  }).then(
    async (success) => {
      console.info('Todo Bien');
      console.info(success);
      let status = false;
      let message = '';
      let id = null;
      if (req.body.id) {
        res.json(await Mdl_Lyf_Create.Update(req.user.id, req.body));
      } else {
        id = await Mdl_Lyf_Create.Create(req.user.id, req.body);
        status = true;
        message = 'Lyf guardado con exito';
        res.json({
          id,
          status,
          message
        })
      }

    }, (errors) => {
      console.error(errors);
      res.json({
        status,
        message: errors
      })
    }
  );


}

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
