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
			table: 'v_orden',
			conditions: {
				seller: idSeller,
				order: idSale
			},
			show_query: true
		}, (err, result) => {
			if (err) reject(err);
			// console.log(result);
			if (result[0].vSeller == 0) {
				this.viewedSale(idSeller, result[0]['order']);
			}
			resolve(result[0]);
		});
	});

}

exports.getSales = (idSeller) => {
	return new Promise((resolve, reject) => {
		mysql.select({
			table: 'v_orden',
			conditions: {
				seller: idSeller
			},
			show_query: true
		}, (err, result) => {
			if (err) reject(err);
			resolve(result);
		});
	});

}
