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
        status: 'incompleto'
      },
      show_query: true,
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

exports.SaveImage = async (idLyf, img) => {
  return new Promise((resolve, reject) => {
    mysql.insert({
      table: 't_dat_lyf_galeria',
      details: {
        f_id_lyf: idLyf,
        url_img: img,
      },
      show_query: true,
    }, (err, result, inserted_id) => {
      if (err) console.error('Error , Save Image');
      console.log(' Save Image', inserted_id);
      resolve({
        id: inserted_id,
        url_img: img
      })
    });
  })


}



exports.Lyfs = async (idLyf) => {
  return new Promise(async (resolve, reject) => {
    if (idLyf) {
      mysql.select({
        table: 't_dat_usuario',
        conditions: {
          email: email
        },
        limit: 1,
        show_query: true
      }, async (err, result) => {
        if (err) reject(err);

      });
    } else {
      mysql.select({
        table: 't_dat_usuario',
        conditions: {
          email: email
        },
        limit: 1,
        show_query: true
      }, async (err, result) => {
        if (err) reject(err);

      });
    }

  });
}

exports.getLyfsCategorie = async (idLyf, idCategorie) => {
  return new Promise(async (resolve, reject) => {
    if (idLyf) {
      mysql.select({
        table: 't_dat_usuario',
        conditions: {
          email: email
        },
        limit: 1,
        show_query: true
      }, async (err, result) => {
        if (err) reject(err);

      });
    } else {
      mysql.select({
        table: 'v_lyfs',
        conditions: {
          id_cat: idCategorie,
          status: 'activo'
        },
        show_query: true
      }, async (err, result) => {
        if (err) reject(err);
        // console.log( result );
        resolve(result)

      });
    }

  });
}

exports.searchLyfsCategories = async (idLyf, data) => {
  return new Promise(async (resolve, reject) => {

    if (data.idLyf) {

    } else {
      if (data.categories) {
        mysql.select({
          table: 'v_lyfs',
          conditions: {
            id_cat: data.categories,
            status: 'activo',
            'cost >=': data.min,
            'cost <=': data.max,

            or: {
              'nickname LIKE': `%${data.words}%`,
              'title LIKE': `%${data.words}%`,
              'cat LIKE': `%${data.words}%`,
              'subcat LIKE': `%${data.words}%`,
            }
          },
          limit: 12,
          show_query: true
        }, async (err, result) => {
          if (err) reject(err);
          resolve(result)
        });
      } else {
        mysql.select({
          table: 'v_lyfs',
          conditions: {
            status: 'activo',
            'cost >=': data.min,
            'cost <=': data.max,
            or: {
              'nickname LIKE': `%${data.words}%`,
              'title LIKE': `%${data.words}%`,
              'cat LIKE': `%${data.words}%`,
              'subcat LIKE': `%${data.words}%`,
            }
          },
          limit: 12,
          show_query: true
        }, async (err, result) => {
          if (err) reject(err);
          resolve(result)
        });
      }
    }


  });
}

exports.getTopLyfs = (idUser) => {
  return new Promise((resolve, reject) => {
    mysql.native_query({
      query: "CALL s_lyfs( 0 ," + idUser + " , TRUE )",
      show_query: true,
    }, async (err, result) => {
      if (err) reject('Algo salio mal en la consulta');
      if (result) {
        for (let index in result[0]) {
          // console.log(result[0][index]['id']);
          result[0][index]['img'] = await this.getCover(result[0][index]['id']);
        }
        resolve(result[0]);
      } else {
        resolve([]);
      }
    });

  });
}
exports.getCover = (idLyf) => {
  return new Promise((resolve, reject) => {
    mysql.select({
      fields: ['url_img'],
      table: 't_dat_lyf_galeria',
      conditions: {
        f_id_lyf: idLyf,
        bool_cover: 1
      },
      limit: 1,
      show_query: false
    }, async (err, result) => {
      if (err) reject('Error al traer el cover');
      if (result[0]) {
        // console.log( result[0]['url_img']  );
        resolve(result[0]['url_img']);
      } else {
        resolve('');
      }

    });
  });

}
exports.getLyfs = async (idUser, lastIdLyf) => {
  return new Promise(async (resolve, reject) => {
    if (lastIdLyf) {

    } else {
      mysql.select({
        table: 'v_lyfs',
        fields: ['id', 'title', 'cat', 'subcat', 'status', 'img', 'date'],
        conditions: {
          and: {
            id_user: idUser,
            status: {
              status1: 'activo',
              status2: 'pausado',
            }
          }

        },
        limit: 5,
        show_query: true
      }, async (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    }

  });
}
