'use strict'
const Mdl_Lyf_Create = require('../models/Mdl_Lyf_Create')
var validate = require("validate.js");
var fs = require('fs');
var formidable = require('formidable');
var path = require('path');
var uuid = require('uuid');
const sharp = require('sharp');
sharp.cache(false);

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

exports.Questions = async (req, res) => {
  console.log(' Save Questions ..');
  // console.log(req.body);
  let constraints = {
    questions: {
      presence: {
        message: "Agrega al menos solo una pregunta "
      },
      length: {
        minimum: 1,
        maximum: 5,
        message: " Mínimo 1 pregunta máximo 5 "
      }
    },
  };
  let status = false;
  validate.async(req.body, constraints, {
    fullMessages: false
  }).then(
    async (success) => {
      // console.info('Todo Bien');

      let condition = await this.ValidateQuestions(req.body.questions);

      if (condition) {
        console.log(' Saving questions ... ');
        // Delete Questions
        Mdl_Lyf_Create.DeleteQuestions(req.body.id).then((success) => {
          for (let index in req.body.questions) {
            Mdl_Lyf_Create.SaveQuestion(req.body.id, req.body.questions[index]);
          }
          res.json({
            status: true,
            message: 'Preguntas guardadas'
          })
        });



      } else {
        res.json({
          status,
          message: 'Preguntas no validas'
        })
      }

      // let message = '';
      // let id = null;
      // if (req.body.id) {
      //   res.json(await Mdl_Lyf_Create.Update(req.user.id, req.body));
      // } else {
      //   id = await Mdl_Lyf_Create.Create(req.user.id, req.body);
      //   status = true;
      //   message = 'Lyf guardado con exito';
      //   res.json({
      //     id,
      //     status,
      //     message
      //   })
      // }

    }, (errors) => {
      console.error(errors);
      res.json({
        status,
        message: errors
      })
    }
  );


}

exports.Images = async (req, res) => {
  console.log(' Save Images ..');
  // console.log(req.body);
  let imgTempPath = path.join(__dirname, '../../uploads/temp');
  let imgList = [];
  let imgsTemp = [];
  const form = new formidable();
  form.encoding = 'utf-8';
  form.uploadDir = imgTempPath;
  form.keepExtensions = true;
  form.maxFields = .05 * 1024 * 1024;

  let idLyf;


  form.on('field', function (field, value) {
    // console.log(field, value);
    idLyf = value;
    //receive form fields here
  });

  form.on('file', async (field, file) => {

    imgsTemp.push(file.path);

  });

  form.on('end', async () => {
    await this.MoveImages(imgsTemp);
    res.json({
      images: imgList
    });
  });

  form.parse(req);

}

exports.MoveImages = (idLyf, tempPath, imgListTemp) => {
  let imgList = [];
  let newName = 'lyf-' + idLyf + '-' + uuid.v1() + '.png';
  for (let index in imgListTemp) {
    await sharp(file.path).resize(200, 200).max().toFile(tempPath + '/' + newName).then(async (Image) => {

      console.log('Imagen redimensionada');
      // console.log(newName);
      // imgList.push(file.path);
      await fs.unlinkSync(file.path);
    });
  }

  
  imgList.push( await Mdl_Lyf_Create.SaveImage(idLyf, newName) );
}




exports.ValidateQuestions = async (questions) => {
  let constraints = {
    question: {
      presence: {
        message: "Falta la pregunta "
      },
      length: {
        minimum: 10,
        maximum: 50,
        message: "Pregunta: Mínimo 10 , Máximo 50 Caracteres"
      }
    },
    answer: {
      presence: {
        message: "Falta la respuesta "
      },
      length: {
        minimum: 5,
        maximum: 100,
        message: "Respuesta: Mínimo 5 , Máximo 100 Caracteres"
      }
    },
  };
  for (let index in questions) {

    await validate.async(questions[index], constraints, {
      fullMessages: false
    }).then(
      (success) => {}, (errors) => {
        return false;
      }
    );
  }
  return true;
}






exports.Lyfs = async (req, res) => {

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