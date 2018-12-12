const mysql = require('../heplers/database');

exports.getCategories = () => {
  return new Promise((resolve, reject) => {
    mysql.native_query({
      query: 'SELECT id_cat AS id , alias, url FROM t_cat_categorias',
    }, (err, result) => {
      if (err) reject(err);
      if (result) {
        resolve(result);
      } else {
        resolve([])
      }
    });
  });
}
exports.getSubCat = (idCat) => {
  return new Promise((resolve, reject) => {
    mysql.native_query({
      query: `SELECT id_subcat as id , alias, url FROM t_cat_subcat WHERE f_id_cat = ${idCat} AND bool_aprobado = 1 `,
    }, (err, result) => {
      if (err) reject(err);
      if (result) {
        resolve(result);
      } else {
        resolve([])
      }
    });

  });
}
