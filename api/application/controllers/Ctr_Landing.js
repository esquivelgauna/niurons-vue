'use strict'
// const User = require('../models/user')
// const service = require('../services')
const Mdl_Landing = require('../models/Mdl_Landing')
exports.Landing =  (req, res) => {
    return  res.render( 'mv_landing'  , { title: ' Niurons' }  )  ;
}
exports.Categories =  async (req, res) => {
    console.log( 'Categorias en proceso');
    const cat = await Mdl_Landing.getCategories();
    for( let index in cat  ){
        // console.log( cat[index].nombre );
        cat[index].subCats = await Mdl_Landing.getSubCat( cat[index]['id'] );
        // delete cat[index]['id_cat'];
    }
    
    return res.json( cat );
}
