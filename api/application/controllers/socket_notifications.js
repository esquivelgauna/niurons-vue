var validate = require("validate.js");
const Mdl_Notify = require('../models/Mdl_Notifications');
module.exports = (socket, io) => {
	socket.on('Notify-Info', async (data, callblack) => {
		let constraints = {
			idChat: {
				presence: true,
			},
		};
		validate.async(data, constraints).then(async (success) => {
			console.log('Datos validados', success);
			callblack(await Mdl_Notify.newNotify(socket.decoded_token.data.id, data.idChat));
		}, (error) => {
			console.log(error);
		});
	});
	socket.on('Notify-Info', async (data) => {
		let constraints = {
			idNotify: {
				presence: true,
			},
		};
		validate.async(data, constraints).then(async (success) => {
			console.log('Viewed Notifications', success);
			Mdl_Notify.Viewed(socket.decoded_token.data.id, data.idChat) ;
		}, (error) => {
			console.log(error);
		});
	});
  
	socket.on('Notifications', async (data, callblack) => {
		callblack(await Mdl_Notify.notifications(socket.decoded_token.data.id));
	});

}
