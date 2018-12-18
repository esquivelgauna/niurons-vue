const mysql = require('../heplers/database');



exports.Update = async (iduser, generals) => {

  return new Promise(async (resolve, reject) => {
    mysql.update({
      table: 't_dat_lyf',
      details: {
        titulo: generals.title,
        descripcion: generals.description,
        instrucciones: generals.req,
        tag: generals.tags.toString(),
        f_id_subcat: generals.subcat,
      },
      conditions: {
        f_id_usuario: iduser,
        id_lyf: generals.id,
      },
      show_query: false,
    }, (err, result, number_of_changed_rows) => {

      if (err) {
        resolve({
          updated: true,
          status: false,
          message: 'Error al editar ',
        });
      } else {
        resolve({
          updated: true,
          status: true,
          message: ' Se editó correctamente '
        });
      }

    });
  });

}

exports.Create = async (iduser, generals) => {
  return new Promise(async (resolve, reject) => {

    mysql.insert({
      table: 't_dat_lyf',
      details: {
        f_id_usuario: iduser,
        f_id_subcat: generals.subcat,
        titulo: generals.title,
        descripcion: generals.description,
        fecha_publicacion: new Date(),
        instrucciones: generals.req,
        tag: generals.tags.toString(),
        clasificacion: 0,
        status: 'incompleto'
      },
      show_query: false,
    }, (err, result, inserted_id) => {
      if (err) reject(err);
      resolve(inserted_id);
    });

  });
}


exports.DeleteQuestions = async (idLyf) => {
  return new Promise(async (resolve, reject) => {

    mysql.delete({
      table: 't_dat_lyf_faq',
      conditions: {
        f_id_lyf: idLyf,
      },
      show_query: false,
    }, (err, result, number_of_changed_rows) => {
      if (err) console.log('Error , delete questions');
      console.log(' Deleted questions', number_of_changed_rows);
      resolve(true);
    });

  });
}

exports.SaveQuestion = async (idLyf, question) => {
  mysql.insert({
    table: 't_dat_lyf_faq',
    details: {
      f_id_lyf: idLyf,
      pregunta: question.question,
      respuesta: question.answer,
    },
    show_query: false,
  }, (err, result, inserted_id) => {
    if (err) console.error('Error , SaveQuestion');
    // console.log(' SaveQuestion', inserted_id);
  });

}


exports.SaveImage = async (idLyf, img, cover) => {
  return new Promise(async (resolve, reject) => {
    mysql.insert({
      table: 't_dat_lyf_galeria',
      details: {
        f_id_lyf: idLyf,
        url_img: img,
        bool_cover: cover,
      },
      show_query: false,
    }, (err, result, inserted_id) => {
      if (err) console.error('Error , Save Image');
      // console.log(' Save Image', inserted_id);
      resolve({
        id: inserted_id,
        url: img,
        status: false,
      })
    });
  })
}

exports.GetRowsImages = async (idLyf) => {
  return new Promise((resolve, reject) => {
    mysql.native_query({
        query: `SELECT COUNT(*) FROM t_dat_lyf_galeria WHERE f_id_lyf = ${idLyf} AND bool_cover = 1 `
      },
      (err, result) => {
        console.log('GetRowsImages ', result)
        if (err) reject('Error , Geting Image');
        if (result[0]['COUNT(*)'] > 0) {
          resolve(true);
        } else {
          reject(false);
        }
      });
  })
}

exports.GetImage = async (idLyf, idImage) => {
  return new Promise((resolve, reject) => {
    mysql.select({
      table: 't_dat_lyf_galeria',
      conditions: {
        id_img_galeria: idImage,
        f_id_lyf: idLyf,
      },
      limit: 1,
      show_query: true,
    }, (err, result) => {
      if (err) console.error('Error , Geting Image');
      // console.log(' Get Image', result[0]);
      resolve(result[0])
    });
  })
}
exports.DeleteImage = async (idLyf, idImage) => {
  mysql.delete({
    table: 't_dat_lyf_galeria',
    conditions: {
      id_img_galeria: idImage,
      f_id_lyf: idLyf,
    },
    limit: 1,
    show_query: false,
  }, (err, result) => {
    if (err) console.error('Error , Delete Image ');
    console.log(' DeleteImage');
    this.GetRowsImages(idLyf).then((succes) => {}, (error) => {
      this.PauseLyf(idLyf)
    })
  });
}


exports.UpdatePackage = async (idLyf, pack) => {
  return new Promise((resolve, reject) => {
    mysql.update({
      table: 't_dat_paquetes',
      details: {
        // f_id_lyf: idLyf,
        // f_id_tipopaquete: pack.type,
        titulo: pack.subtitle,
        descripcion: pack.description,
        costo: pack.cost,
        tiempo_entrega: pack.time,
        revisiones: pack.revisions,
      },
      conditions: {
        id_paquete: pack.id,
      },
      limit: 1,
      show_query: false,
    }, (err, result, inserted_id) => {
      if (err) reject(err);
      resolve(inserted_id);
      this.ActiveLyf(idLyf);
      // console.log(' SaveQuestion', inserted_id);
    });
  });
}

exports.SavePackage = async (idLyf, pack) => {
  return new Promise((resolve, reject) => {
    mysql.insert({
      table: 't_dat_paquetes',
      details: {
        f_id_lyf: idLyf,
        f_id_tipopaquete: pack.type,
        titulo: pack.subtitle,
        descripcion: pack.description,
        costo: pack.cost,
        tiempo_entrega: pack.time,
        revisiones: pack.revisions,
      },
      show_query: false,
    }, (err, result, inserted_id) => {
      if (err) reject(err);
      resolve(inserted_id);
      this.ActiveLyf(idLyf);
      // console.log(' SaveQuestion', inserted_id);
    });
  });
}

exports.AddExtra = async (idLyf, extra) => {
  return new Promise((resolve, reject) => {
    mysql.insert({
      table: 't_dat_extras',
      details: {
        f_id_lyf: idLyf,
        titulo: extra.title,
        descripcion: extra.desc,
        costo: extra.cost,
      },
      show_query: true,
    }, (err, result, inserted_id) => {
      if (err) reject('Error al guardar.');
      resolve(inserted_id);
    });
  });
}

exports.ActiveLyf = (idLyf) => {
  return new Promise((resolve, reject) => {

    mysql.update({
      table: 't_dat_lyf',
      details: {
        status: 'activo',
      },
      conditions: {
        id_lyf: idLyf,
      },
      show_query: false,
    }, (err, result, number_of_changed_rows) => {
      if (err) console.log('Error , Active Lyf ');
      console.log(' Lyf Activated  ');
      resolve(true);
    });

  });
}

exports.DeleteExtra = async (idLyf, idExtra) => {
  return new Promise(async (resolve, reject) => {
    mysql.delete({
      table: 't_dat_extras',
      conditions: {
        f_id_lyf: idLyf,
        id_extra: idExtra,
      },
      limit: 1,
      show_query: false,
    }, (err, result, number_of_changed_rows) => {
      if (err) reject('Error al eliminaer el Extra');
      resolve('Extra Eliminado');
    });

  });
}

exports.DeletePackage = async (idLyf, idPack) => {
  return new Promise(async (resolve, reject) => {
    mysql.delete({
      table: 't_dat_paquetes',
      conditions: {
        f_id_lyf: idLyf,
        id_paquete: idPack,
      },
      limit: 1,
      show_query: false,
    }, (err, result, number_of_changed_rows) => {
      if (err) console.log('Error , Delete Package');
      console.log(' Deleted Package', number_of_changed_rows);
      this.IncompletLyf(idLyf);
      resolve(true);
    });

  });
}

exports.IncompletLyf = async (idLyf) => {
  mysql.select({
    table: 't_dat_paquetes',
    conditions: {
      f_id_lyf: idLyf,
    },
    limit: 3,
    show_query: false,
  }, (err, result) => {
    if (err) console.log('Error , Pause LYF ');
    console.log(result.length);
    if (result.length < 1) {
      console.log(' Pausing Lyf ...');
      this.PauseLyf(idLyf);
    }

    // if()

  });
}

exports.PauseLyf = (idLyf) => {
  return new Promise((resolve, reject) => {

    mysql.update({
      table: 't_dat_lyf',
      details: {
        status: 'pausado',
      },
      conditions: {
        id_lyf: idLyf,
      },
      show_query: false,
    }, (err, result, number_of_changed_rows) => {
      if (err) console.log('Error , Pause Lyf ');
      console.log(' Lyf Paused ');
      resolve(true);
    });

  });
}

// Get ALL LYF
exports.GetGenerals = async (idUser, idLyf) => {
  return new Promise((resolve, reject) => {
    mysql.select({
      table: 'v_lyf_complete',
      conditions: {
        id: idLyf,
        id_user: idUser,
      },
      limit: 1,
      show_query: true,
    }, (err, result) => {
      if (err) reject('Lyf no encontrado');
      resolve(result[0])
    });
  })
}

exports.GetQuestions = async (idLyf) => {
  return new Promise((resolve, reject) => {
    mysql.select({
      table: 'v_lyf_faqs',
      conditions: {
        id_lyf: idLyf,
      },
      limit: 5,
      show_query: true,
    }, (err, result) => {
      if (err) reject('Error en las preguntas');
      console.log(result);
      if (result) {
        if (result.length > 0) {
          resolve(result)
        } else {
          reject('Lyf sin pregutnas');
        }
      } else {
        reject('Lyf sin pregutnas');
      }


    });
  })
}

exports.GetImages = async (idLyf) => {
  return new Promise((resolve, reject) => {
    mysql.select({
      table: 'v_lyf_images',
      conditions: {
        id_lyf: idLyf,
      },
      show_query: true,
    }, (err, result) => {
      if (err) reject('Lyf no encontrado');
      if (result) {
        if (result.length > 0) {
          resolve(result)
        } else {
          reject('Lyf sin imagenes ');
        }

      } else {
        reject('Lyf sin imagenes ');
      }
    });
  })
}


exports.GetPackages = async (idLyf) => {
  return new Promise((resolve, reject) => {
    mysql.select({
      table: 'v_lyf_packages',
      conditions: {
        id_lyf: idLyf,
      },
      limit: 3,
      show_query: true,
    }, (err, result) => {
      if (err) reject('Lyf no encontrado');
      // console.log();
      if (result) {
        if (result.length > 0) {
          resolve(result)
        } else {
          reject('Lyf sin paquetes');
        }
      } else {
        reject('Lyf sin paquetes');
      }
    });
  })
}


exports.GetExtras = async (idLyf) => {
  return new Promise((resolve, reject) => {
    mysql.select({
      table: 'v_lyf_extras',
      conditions: {
        id_lyf: idLyf,
      },
      limit: 5,
      show_query: true,
    }, (err, result) => {
      if (result) {
        if (result.length > 0) {
          resolve(result)
        } else {
          reject('Lyf sin extras');
        }
      } else {
        reject('Lyf sin extras');
      }

    });
  })
}
