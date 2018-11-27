const mysql = require('../heplers/database');

exports.getLyf = (idLyf) => {
	return new Promise((resolve, reject) => {
		mysql.select({
			table: 't_dat_lyf',
			conditions: {
				id_lyf: idLyf
			},
			limit: 1,
			show_query: false
		}, (err, result) => {
			if (err) reject(err);
			resolve(result[0]);
		});
	});

}

exports.getPacket = (idLyf, idPack) => {
	return new Promise((resolve, reject) => {
		mysql.select({
			table: 't_dat_paquetes',
			conditions: {
				f_id_tipopaquete: idPack,
				f_id_lyf: idLyf
			},
			limit: 1,
			show_query: false
		}, (err, result) => {
			if (err) reject(err);
			resolve(result[0]);
		});
	});
}

exports.getPurchases = (idPurchaser, idSale) => {
	return new Promise((resolve, reject) => {
	  if (idSale) {
		// console.log('More sales', idSale );
		mysql.native_query({
		  query: "CALL s_purchases( " + idSale + "," + idPurchaser + " , FALSE )",
		  show_query: true,
		}, (err, result) => {
		  if (err) reject('Algo salio mal (Traer mas compras) ');
		  if (result) {
			resolve(result[0]);
		  } else {
			resolve([]);
		  }
		});
	  } else {
		console.log('Top Purchases');
		mysql.native_query({
		  query: "CALL s_purchases( 0 ," + idPurchaser + " , TRUE )",
		  show_query: true,
		}, (err, result) => {
		  if (err) reject('Algo salio mal (Traer top compras) ');
		  if (result) {
			resolve(result[0]);
		  } else {
			resolve([]);
		  }
		});
	  }
	});
  }

  
exports.getPurchase = (idUser, idPurchase) => {
	return new Promise((resolve, reject) => {
		mysql.select({
			table: 'v_order',
			conditions: {
				purchaser: idUser,
				id_order: idPurchase
			},
			limit:1,
			show_query: false
		},   (err, result) => {
			if (err) reject(err);
			console.log(result);
			// if (result[0].vPurchaser == 0) {
			// 	this.viewedPurchase(idUser, result[0]['order']);
			// } 
			resolve(result[0]);
		});
	})
}

//Id lif , amount
//Ids extras , amount
exports.checkOrder = async (data) => {
	//Datos validados { id: '6', qty: 1, options: { idPack: '1' } }
	return new Promise(async (resolve, reject) => {
		let lyf = await this.getLyf(data.id);
		let packet = await this.getPacket(data.id, data.options.idPack);
		let trans = {
			trans: [{
				"item_list": {
					"items": [{
						"name": lyf.titulo,
						"sku": lyf.id_lyf,
						"price": packet.costo,
						"currency": "USD",
						"quantity": data.qty
					}, ]
				},
				"amount": {
					"currency": "USD",
					"total": (data.qty * packet.costo)
				},
				"description": packet.descripcion
			}],
			order: {
				idSeller: lyf.f_id_usuario,
				idPacket: packet.id_paquete,
				total: (data.qty * packet.costo)
			},
		}
		// console.log( lyf );
		console.log('Check order transaction: ', trans);
		resolve(trans);
	});

}
exports.getOrder = (paymentId, idUser) => {
	return new Promise((resolve, reject) => {
		mysql.select({
			table: 't_dat_orden',
			conditions: {
				paymentId: paymentId,
				f_id_purchaser: idUser
			},
			limit: 1,
			show_query: false
		}, (err, result) => {
			if (err) reject(err);
			console.log('Get order - 115 - ', result);
			resolve(result[0]);
		});
	});
}

exports.saveOrder = async (data) => {
	//ibBuyer, idSeller, idPaypal
	return new Promise((resolve, reject) => {
		//console.log(data);
		mysql.insert({
			table: 't_dat_orden',
			details: {
				f_id_paquete: data.idPacket,
				costo_total: data.total,
				fecha_creacion: new Date(),
				f_id_purchaser: data.idBuyer,
				f_id_seller: data.idSeller,
				paymentId: data.idPaypal
			},
			show_query: false
		}, function (err, result, inserted_id) {
			if (err) reject(err);
			resolve(true);
			//console.log('Compra realizada con exito', inserted_id);
		});
	});

}

exports.PurchaseNotify = async (order) => {
	console.log('PurchaseNotify ', order);
	let notify = {
		idUser: order['f_id_purchaser'],
		title: 'Nueva compra',
		message: 'Sigue el proceso correspondiente',
		date: new Date(),
		type: 'purchase',
		id_p: order['id_orden'],
		viewed: false,
	};
	notify.id = await this.SaveNotify({
		f_id_user: notify.idUser,
		title: notify.title,
		message: notify.message,
		type: notify.type,
		f_id_p: notify.id_p,
		date: notify.date,
	});
	return (notify);
}

exports.SaleNotify = async (order) => {
	console.log('Sale notify order -168- ', order);
	let notify = {
		idUser: order['f_id_seller'],
		title: 'Nueva venta',
		message: order['costo_total'] + ' dólares te estan esperando',
		date: new Date(),
		type: 'sale',
		id_p: order['id_orden'],
		viewed: false,
	};
	notify.id = await this.SaveNotify({
		f_id_user: notify.idUser,
		title: notify.title,
		message: notify.message,
		type: notify.type,
		f_id_p: notify.id_p,
		date: notify.date,
	});
	return (notify);
}

// idUser, title, message, type, f_id_p
exports.SaveNotify = async (notify) => {
	return new Promise((resolve, reject) => {

		mysql.insert({
			table: 't_dat_notifications',
			details: notify,
			show_query: false
		}, function (err, result, inserted_id) {
			if (err) reject(err);
			resolve(inserted_id);
		});
	});
}


exports.viewedPurchase = (idUser, idProduct) => {
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
	}, (err, result, nrows) => {
		if (err) conosle.log(err);
	});

	mysql.update({
		table: 't_dat_orden',
		details: {
			viewed_purchaser: 1
		},
		conditions: {
			id_orden: idProduct,
			f_id_purchaser: idUser
		},
		show_query: true
	}, (err, result, nrows) => {
		if (err) console.log(err);
	});

}



// Sale notify order  RowDataPacket {
// 	id_orden: 29,
// 	f_id_paquete: 43,
// 	costo_total: 85,
// 	f_id_comprador: 123,
// 	f_id_vendedor: 117,
// 	notas: '',
// 	estatus: '1',
// 	paymentId: 'PAY-1P886330AF629041SLPMI6XI',
// 	fecha_creacion: 2018-10-30T17:05:34.000Z }
