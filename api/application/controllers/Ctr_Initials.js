'use strict' 

const Mdl_Initials = require('../models/Mdl_Initials')
exports.Landing =  (req, res) => {
    return  res.render( 'mv_landing'  , { title: ' Niurons' }  )  ;
}
exports.Initials =  async (req, res) => {
    console.log( 'Initials ', req.user.id );
    let data = await Mdl_Initials.notifications(req.user.id);
    return res.json( data );
    
}

