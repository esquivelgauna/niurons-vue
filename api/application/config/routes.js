const express = require('express')
const landing = require('../controllers/Ctr_Landing')
const Login = require('../controllers/Ctr_Login')

const api = express.Router()

module.exports = (app) => {

    app.get('/', landing.Landing )
    app.post('/Login', Login.Login )
    app.get('/Categories', landing.Categories )
    
}




// api.get('/product/:productId', productCtrl.getProduct)
// api.post('/product', auth, productCtrl.saveProduct)
// api.put('/product/:productId', auth, productCtrl.updateProduct)
// api.delete('/product/:productId', auth, productCtrl.deleteProduct)
// api.post('/signup', userCtrl.signUp)
// api.post('/signin', userCtrl.signIn)
// api.get('/private', auth, (req, res) => {
//   res.status(200).send({ message: 'Tienes acceso' })
// })
// module.exports = api