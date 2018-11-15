const mysql = require('../heplers/database');

exports.getCategories = ( ) => {
	return new Promise((resolve, reject) => {
		mysql.select({
			table: 't_cat_categorias',
			fields: ['id_cat', 'alias', 'url'],
			show_query: true
		}, (err, result) => {
			if (err) reject(err);
			if( result  ){
				resolve(result);
			}else{
				resolve([])
			}
		});
	});
}
exports.getSubCat = ( idCat ) => {
	return new Promise((resolve, reject) => {
		mysql.select({
			table: 't_cat_subcat',
			fields: ['alias', 'url'],
			conditions: {
				f_id_cat: idCat,
				bool_aprobado: 1
			}, 
			show_query: true
		}, (err, result) => {
			if (err) reject(err);
			if( result  ){
				resolve(result);
			}else{
				resolve([])
			}
		});
	});
}
