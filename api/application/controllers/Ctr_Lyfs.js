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
exports.LyfSearchSubcategories = async (req, res) => {
  console.log(' Lyf Searching Subcategories ..');
  console.log(req.query.search);
  let constraints = {
    idSubcat: {
      presence: {
        message: "ID: Recurda agregar el ID "
      }
    },
    min: {
      presence: {
        message: "Costo mínimo : Recurda agregar el precio "
      },
      numericality: {
        greaterThanOrEqualTo: 5,
        lessThanOrEqualTo: 200,
        notLessThanOrEqualTo: "Costo mínimo: Máximo $200 ",
        notGreaterThanOrEqualTo: "Costo mínimo: Mínimo $5 ",
      }
    },
    min: {
      presence: {
        message: "Costo maximo : Recurda agregar el precio "
      },
      numericality: {
        greaterThanOrEqualTo: 5,
        lessThanOrEqualTo: 20,
        notLessThanOrEqualTo: "Costo maximo: Máximo $200 ",
        notGreaterThanOrEqualTo: "Costo maximo: Mínimo $5 ",
      }
    },
    time: {
      presence: {
        message: "Entrega: Recuerda agregar el tiempo de entrega "
      },
      numericality: {
        greaterThanOrEqualTo: 1,
        lessThanOrEqualTo: 30,
        notLessThanOrEqualTo: "Entrega: Máximo 30 días ",
        notGreaterThanOrEqualTo: "Entrega: Mínimo  1 día ",
      }
    },
    order: {
      presence: {
        message: "Subtitulo: Recuerda agregar el titulo "
      },
      inclusion: {
        within: {
          "top": "top",
          "best": "best",
        },
        message: "^Orden no soportado:  %{value}"
      }
    },

  };
  validate.async(req.query.search, constraints).then(async (success) => {
    // let lyfs = await Mdl_Lyfs.searchLyfsCategories(null, req.query.data);
    res.json({
      status: true,
      message: success
    })
  }, (error) => {
    res.json({
      status: false,
      message: errors
    })
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

      console.log('Geting LYF ....', req.query.idLyf);
      await Mdl_Lyfs.GetLyf(req.query.idLyf).then((lyf) => {

        res.json({
          status: true,
          lyf: lyf,
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
