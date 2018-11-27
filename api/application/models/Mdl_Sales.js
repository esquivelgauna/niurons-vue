const mysql = require('../heplers/database');

exports.viewedSale = (idUser, idProduct) => {
  mysql.update({
      table: 't_dat_notifications',
      details: {
        viewed: 1
      },
      conditions: {
        f_id_user: idUser,
        f_id_p: idProduct
      },
      show_query: true
    },
    function (err, result, nrows) {
      if (err) console.log(err);
    });
  mysql.update({
    table: 't_dat_orden',
    details: {
      viewed_seller: 1
    },
    conditions: {
      id_orden: idProduct,
      f_id_seller: idUser
    },
    show_query: true
  }, (err, result, nrows) => {
    if (err) console.log(err);
  });
}

exports.getSale = (idSeller, idSale) => {
  return new Promise((resolve, reject) => {
		mysql.select({
			table: 'v_order',
			conditions: {
				seller: idSeller,
				id_order: idSale
			},
			limit:1,
			show_query: false
		},   (err, result) => {
			if (err) reject(err);
			console.log(result);
			resolve(result[0]);
		});
	})

}

exports.getSales = (idSeller, idSale) => {
  return new Promise((resolve, reject) => {
    if (idSale) {
      // console.log('More sales', idSale );
      mysql.native_query({
        query: "CALL s_sales( " + idSale + "," + idSeller + " , FALSE )",
        show_query: true,
      }, (err, result) => {
        if (err) reject('Algo salio mal (Traer mas ventas) ' , err);
        if (result) {
          resolve(result[0]);
        } else {
          resolve([]);
        }
      });
    } else {
      console.log('Top sales');
      mysql.native_query({
        query: "CALL s_sales( 0 ," + idSeller + " , TRUE )",
        show_query: true,
      }, (err, result) => {
        if (err) reject('Algo salio mal (Traer top ventas) ');
        if (result) {
          resolve(result[0]);
        } else {
          resolve([]);
        }
      });
    }
  });


}
