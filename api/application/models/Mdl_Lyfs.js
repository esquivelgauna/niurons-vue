const mysql = require('../heplers/database');


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
