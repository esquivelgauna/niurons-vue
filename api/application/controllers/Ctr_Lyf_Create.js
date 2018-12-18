'use strict'
const Mdl_Lyf_Create = require('../models/Mdl_Lyf_Create')
var validate = require("validate.js");
var fs = require('fs');
var formidable = require('formidable');
var path = require('path');
var uuid = require('uuid');
const sharp = require('sharp');
sharp.cache(false);
//Uploads
var pathImages = path.join(__dirname, '../../uploads/img/lyf');
var pathImagesThumb = path.join(__dirname, '../../uploads/img/thumbs');


exports.Generals = async (req, res) => {
  console.log(' Save Generals ..');
  // console.log(req.body);
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
      // console.info(success);
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
    res.json({
      status: true,
      images: await this.MoveImages(idLyf, imgTempPath, imgsTemp)
    });
  });

  form.parse(req);

}


exports.Packages = async (req, res) => {
  console.log(' Saving Packages..');
  console.log(req.body);

  let constraints = {
    idLyf: {
      presence: {
        message: "Falta el id del Lyf "
      },
    },
    'packages.list': {
      presence: {
        message: "Agrega al menos solo un paquete "
      },
      length: {
        minimum: 1,
        maximum: 3,
        message: " Mínimo 1 paquete máximo 3 "
      }
    },
  };

  validate.async(req.body, constraints, {
    fullMessages: false
  }).then(
    async (success) => {
      let check;
      // Check Packages
      for (let pack of req.body.packages.list) {
        // console.log(pack);
        check = await this.CheckPackage(req.body.packages[pack].package, pack);
        if (check) {
          // console.log('Valid ', pack)
        } else {
          // console.log('not Valid ', pack)
          res.json({
            status: false,
            message: 'Package not valid ' + pack,
          })
          break;
        }
      }
      if (check) {
        for (let pack of req.body.packages.list) {

          if (req.body.packages[pack].package.id) {
            console.log('Edit package');
            await Mdl_Lyf_Create.UpdatePackage(req.body.idLyf, req.body.packages[pack].package);
          } else {
            console.log('New package');
            await Mdl_Lyf_Create.SavePackage(req.body.idLyf, req.body.packages[pack].package).then((idPackage) => {
              req.body.packages[pack].package.id = idPackage;
            }, (error) => {

              console.log('Catch error', error);
              res.json({
                status: false,
                message: 'Error al guardar el packete:' + pack,
              });
            });
          }

        }
        res.json({
          status: true,
          packages: req.body.packages,
        })

      }
    }, (errors) => {
      console.error(errors);
      res.json({
        status: true,
        message: errors
      })
    }
  );

}

exports.AddExtra = async (req, res) => {
  console.log(' Saving Extra..');
  console.log(req.body);

  let constraints = {
    idLyf: {
      presence: {
        message: "Falta el id del Lyf "
      },
    },
    'extra.title': {
      presence: {
        message: "Falta el título "
      },
      length: {
        minimum: 5,
        maximum: 100,
        message: "Título: Mínimo 5 Caracteres, Máximo 100 "
      }
    },
    'extra.desc': {
      presence: {
        message: "Falta la descripción "
      },
      length: {
        minimum: 5,
        maximum: 400,
        message: "Descripción: Mínimo 5 Caracteres, Máximo 400 "
      }
    },
    'extra.cost': {
      presence: {
        message: "Falta el precio"
      },
      numericality: {
        greaterThanOrEqualTo: 5,
        lessThanOrEqualTo: 100,
        notLessThanOrEqualTo: "Costo: Máximo $100 ",
        notGreaterThanOrEqualTo: "Costo: Mínimo $5 ",

      },
    },
  };
  validate.async(req.body, constraints, {
    fullMessages: false
  }).then(async (success) => {
    Mdl_Lyf_Create.AddExtra(req.body.idLyf, req.body.extra).then((idExtra) => {
      res.json({
        status: true,
        id: idExtra,
      })

    }, (error) => {
      console.log(error);
      res.json({
        status: false,
        message: 'No se guardo , intenta de nuevo.',
      })

    });


  }, (errors) => {
    console.error(errors);
    res.json({
      status: true,
      message: errors
    })
  });

}

exports.DeleteExtra = async (req, res) => {
  console.log(' Delete extra...');
  console.log(req.query);

  let constraints = {
    idLyf: {
      presence: {
        message: "Falta el id del Lyf "
      },
    },
    idExtra: {
      presence: {
        message: "Falta el id del extra "
      },
    }


  };

  validate.async(req.query, constraints, {
    fullMessages: false
  }).then(
    async (success) => {
      console.log('Deleting extra ..');
      Mdl_Lyf_Create.DeleteExtra(req.query.idLyf, req.query.idExtra).then((success) => {

        res.json({
          status: true,
          message: success,
        });

      }, (error) => {

        res.json({
          status: false,
          message: error,
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
exports.GetLyf = async (req, res) => {
  console.log(' Geting Lyf...');
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
      // let progress = 16
      // console.log('Deleting extra ..');
      Mdl_Lyf_Create.GetGenerals(req.user.id, req.query.idLyf).then((generals) => {
        // console.log(generals);
        Mdl_Lyf_Create.GetQuestions(req.query.idLyf).then((questions) => {
          // console.log(questions);
          Mdl_Lyf_Create.GetImages(req.query.idLyf).then((images) => {
            console.log(images);
            Mdl_Lyf_Create.GetPackages(req.query.idLyf).then((lyfPackages) => {
              console.log(lyfPackages);

              Mdl_Lyf_Create.GetExtras(req.query.idLyf).then((extras) => {
                console.log(extras);
                res.json({
                  status: true,
                  progress: 75,
                  generals: generals,
                  questions: questions,
                  images: images,
                  packages: lyfPackages,
                  extras: extras,
                });

              }, (error) => {
                res.json({
                  status: true,
                  progress: 72,
                  generals: generals,
                  questions: questions,
                  images: images,
                  packages: lyfPackages,
                });
              });
            }, (error) => {
              res.json({
                status: true,
                progress: 56,
                generals: generals,
                questions: questions,
                images: images,
              });
            });
          }, (error) => {
            console.log(error);
            res.json({
              status: true,
              progress: 40,
              generals: generals,
              questions: questions,
            });
          });
        }, (error) => {
          console.log(error);

          res.json({
            status: true,
            progress: 24,
            generals: generals,
          });
        });
      }, (error) => {
        console.log(error);

        res.json({
          status: false,
          message: error,
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


exports.CheckPackage = (pack) => {
  console.log(pack);
  let constraints = {
    description: {
      presence: {
        message: "Descripción: Recuerda Agregar la descripción "
      },
      length: {
        minimum: 10,
        maximum: 200,
        message: "Descripción: Mínimo 10 caracteres , máximo 5 "
      }
    },
    cost: {
      presence: {
        message: "Costo: Recurda agregar el precio "
      },
      numericality: {
        greaterThanOrEqualTo: 5,
        lessThanOrEqualTo: 20,
        notValid: "Costo: Mínimo $5 imagen máximo $20 "
      }
    },
    time: {
      presence: {
        message: "Entrega: Recuerda agregar el tiempo de entrega "
      },
      numericality: {
        greaterThanOrEqualTo: 1,
        lessThanOrEqualTo: 30,
        notValid: "Entrega: Mínimo 1 días , máximo 30  "
      }
    },
    revisions: {
      presence: {
        message: "Revisiones: Agrega el numero de revisiones  "
      },
      numericality: {
        greaterThanOrEqualTo: 1,
        lessThanOrEqualTo: 10,
        notValid: "Revisiones: Mínimo 1 revisión , máximo 10 "
      }
    },
    subtitle: {
      presence: {
        message: "Subtitulo: Recuerda agregar el titulo  "
      },
      length: {
        minimum: 5,
        maximum: 50,
        message: "Subtitulo: Mínimo 5 caracteres , máximo 50 "
      }
    },

  };
  return validate.async(pack, constraints, {
    fullMessages: false
  }).then(
    (success) => {
      return true;
    }, (errors) => {
      return false;
    }
  );
}


exports.DeletePackage = async (req, res) => {
  console.log(' Delete Package...');
  console.log(req.query);

  let constraints = {
    idLyf: {
      presence: {
        message: "Falta el id del Lyf "
      },
    },
    idPackage: {
      presence: {
        message: "Falta el id del paquete "
      },
    }


  };

  validate.async(req.query, constraints, {
    fullMessages: false
  }).then(
    async (success) => {
      console.log('Deleting package ..');
      await Mdl_Lyf_Create.DeletePackage(req.query.idLyf, req.query.idPackage).then((success) => {

        res.json({
          status: true,
          message: 'Packete borrado',
        });

      }, (error) => {

        res.json({
          status: false,
          message: 'Packete no borrado',
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


exports.MoveImages = async (idLyf, tempPath, imgListTemp) => {
  //Create foldres
  if (!fs.existsSync(pathImages)) {
    fs.mkdirSync(pathImages);
  }
  if (!fs.existsSync(pathImagesThumb)) {
    fs.mkdirSync(pathImagesThumb);
  }
  let lyfPath = pathImages + '/lyf-' + idLyf;
  if (!fs.existsSync(lyfPath)) {
    fs.mkdirSync(lyfPath);
  }

  let imgList = [];
  //Read aaray images
  var firstimage;
  await Mdl_Lyf_Create.GetRowsImages(idLyf).then().catch((noRows) => {
    firstimage = true
  })
  for (let index in imgListTemp) {
    // console.log(index);
    //Set name image
    let nameImage = 'lyf-' + idLyf + '-' + uuid.v1() + '.png';
    //Resise image max 1000 X 1000
    await sharp(imgListTemp[index]).resize(1000, 1000).max().toFile(lyfPath + '/' + nameImage).then(async (Image) => {
      // console.log(Image)
      // Do Thumb 200 X 200
      await sharp(lyfPath + '/' + nameImage).resize(200, 200).max().toFile(pathImagesThumb + '/' + nameImage).then(async (Image) => {
        // console.log(' Do Thumb ');
        if (firstimage && index == 0) {
          imgList.push(await Mdl_Lyf_Create.SaveImage(idLyf, nameImage, 1));
        } else {
          imgList.push(await Mdl_Lyf_Create.SaveImage(idLyf, nameImage, 0));
        }
      });
      // console.log('Imagen redimensionada');
    });
    // Delete Temp images
    await fs.unlinkSync(imgListTemp[index]);
  }
  return imgList;

}

exports.DeleteImage = async (req, res) => {
  console.log(' Delete Image ..');

  let constraints = {
    idLyf: {
      presence: {
        message: "Agrega al menos solo una pregunta "
      },
    },
    idImage: {
      presence: {
        message: "Agrega al menos solo una pregunta "
      },
    }

  };
  let status = false;
  validate.async(req.body, constraints, {
    fullMessages: false
  }).then(
    async (success) => {

      Mdl_Lyf_Create.GetImage(req.body.idLyf, req.body.idImage).then(async (Image) => {

        Mdl_Lyf_Create.DeleteImage(req.body.idLyf, req.body.idImage);

        // console.log('Deleting image:', Image);
        // console.log(pathImages + '/' + Image['url_img'])
        // Delete Image 
        fs.unlinkSync(path.join(pathImages, `lyf-${req.body.idLyf}`, Image['url_img']));
        // Delete Thumb
        fs.unlinkSync(pathImagesThumb + '/' + Image['url_img']);
        res.json({
          status: true,
          message: 'Imagen eliminada con exito',
        })

      }, (errors) => {
        console.error(errors);
        res.json({
          status,
          message: errors
        })
      });
    }
  );

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
