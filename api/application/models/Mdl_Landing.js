const mysql = require('../heplers/database');

exports.getCategories = ( ) => {
	return new Promise((resolve, reject) => {
		mysql.select({
			table: 't_cat_categorias',
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