module.exports = (socket, io, chat) => {
	var model = require('../models/Mdl_Sales');

	socket.on('Sales', async (data, callback) => {
		console.log('Sales ....', data);
		callback( await model.getSales(socket.decoded_token.data.id));
	});
	socket.on('Sale', async (data, callback) => {
		callback( await model.getSale(socket.decoded_token.data.id, data.venta));
		console.log('Sale .... ', data);
	});

}
