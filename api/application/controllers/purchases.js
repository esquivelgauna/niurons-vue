var validate = require("validate.js");
const Mdl_Purchase = require('../models/Mdl_Purchases');
const Paypal = require('../class/Paypal').Paypal;
const paypal = new Paypal(process.env.client_id, process.env.client_secret);

module.exports = (socket, io, chat) => {
	socket.on('Purchase', async (data, callblack) => {
		var constraints = {
			id: {
				presence: true,
				exclusion: {
					message: "'%{value}' is not allowed"
				}
			},
			qty: {
				presence: true,
				exclusion: {
					message: "'%{value}' is not allowed"
				}
			},
			options: {
				presence: true
			},
			'options.idPack': {
				presence: true
			}
		};

		validate.async(data, constraints).then(async (success) => {
			//console.log('Datos validados', success);
			let trans = await Mdl_Purchase.checkOrder(success);
			let pay = await paypal.purchaseLyf(trans.trans, socket.request.headers.origin);
			trans.order.idBuyer = socket.decoded_token.data.id;
			trans.order.idPaypal = pay.id;
			if (await Mdl_Purchase.saveOrder(trans.order)) {
				callblack({
					status: true,
					link: pay.linktopay,
					// pay
				})
			} else {
				callblack({
					status: false,
					link: pay.linktopay,
					message: 'Algo salió mal',
					// pay
				})
			}

			//console.log('Compras');
			//console.log('Responde from paypal', pay);
      
		}, (error) => {
			console.log(error);
		});
	});

	socket.on('PaymentExecute', async (data, callblack) => {
		// console.log(data);
		//callblack(data);
		const payerId = data.PayerID;
		const paymentId = data.paymentId;
		let order = await Mdl_Purchase.getOrder(paymentId, socket.decoded_token.data.id);
		//console.log(order)
		const execute_payment_json = {
			"payer_id": payerId,
			"transactions": [{
				"amount": {
					"currency": "USD",
					"total": order.costo_total
				}
			}]
		};
		//console.log( JSON.stringify(execute_payment_json) );
		let payment = await paypal.execute(paymentId, execute_payment_json);
		if (payment.state == "approved") {
			callblack({
				status: true,
				link: '/Compras/' + order.id_orden,
				// payment
			});
			chat.notification(order.f_id_seller, 'notification', await Mdl_Purchase.SaleNotify(order));
			chat.notification(order.f_id_purchaser, 'notification', await Mdl_Purchase.PurchaseNotify(order));

			

		} else {
			callblack({
				status: false,
				// payment
			})
		}

	});
	socket.on('GetPurchases', async (data, callblack) => {
		let purchases = await Mdl_Purchase.getPurchases(socket.decoded_token.data.id);
		//console.log('Get Purchases ' ,purchases );
		callblack(purchases);
	});
	socket.on('GetPurchase', async (data, callblack) => {
		let constraints = {
			purchase: {
				presence: true,
				exclusion: {
					message: "'%{value}' is not allowed"
				}
			},
		}
		validate.async(data, constraints).then(async (success) => {
			console.log(success);
			let purchase = await Mdl_Purchase.getPurchase(socket.decoded_token.data.id, success.purchase);
			callblack(purchase);

		}, (error) => {
			console.log(error);
		});

	});







}
