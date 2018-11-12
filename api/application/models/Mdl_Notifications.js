const mysql = require('../heplers/database');

exports.newNotify = (idUser, idChat) => {
	return new Promise((resolve, reject) => {
		mysql.select({
			table: 'v_inbox2',
			fields: ['cont', 'id_inbox', 'fecha', 'img', 'nickname'],
			conditions: {
				id_inbox: idChat,
				id_usuario: idUser
			},
			limit: 1,
			show_query: false
		}, (err, result) => {
			if (err) reject(err);
			if( result  ){
				resolve(result[0]);
			}else{
				resolve([])
			}
		});
	});
}

exports.notifications = (idUser) => {
	return new Promise(async (resolve, reject) => {
		let data = {};
		data.notifications = await this.getNotifications(idUser, null);
		data.messages = await this.getMessages(idUser, null);
		resolve(data);
	});
}

exports.getMessages = (idUSer, idMessage) => {
	return new Promise((resolve, reject) => {
		if (idMessage != null) {
			mysql.native_query({
				query: "CALL s_notify_messages( " + idUSer + "," + idMessage + ", FALSE )",
			}, (err, result) => {
				if (err) reject(err);
				if( result  ){
					resolve(result[0]);
				}else{
					resolve([])
				}

			});
		} else {
			mysql.native_query({
				query: "CALL s_notify_messages( " + idUSer + " ,0, TRUE )",
			}, (err, result) => {
				if (err) reject(err);
				if( result  ){
					resolve(result[0]);
				}else{
					resolve([])
				}
				
			});
		}
	});
}

exports.getNotifications = async (idUSer, idNotfication) => {
	return new Promise((resolve, reject) => {
		if (idNotfication != null) {
			
			mysql.native_query({
				query: "CALL s_notify_notify( " + idUSer + "," + idNotfication + ", FALSE )",
				show_query: true,
			}, (err, result) => {
				if (err) reject(err);
				if( result ){
					resolve(result[0]);
				}else{
					resolve([])
				}
			});
		} else {
			// console.log( 'Init Notifications' );
			mysql.native_query({
				query: "CALL s_notify_notify( " + idUSer + " ,0, TRUE )",
				show_query: true,
			}, (err, result) => { 
				if (err) reject(err);
				if( result ){
					resolve(result[0]);
				}else{
					resolve([])
				}
			});
		}
	});

}

exports.Viewed = async ( idNotfication) => {
	

}
