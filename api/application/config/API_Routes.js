const express = require('express')
const landing = require('../controllers/Ctr_Landing')
const Login = require('../controllers/Ctr_Login')
const Lyfs = require('../controllers/Ctr_Lyfs')
const Profile = require('../controllers/Ctr_Profile')
const router = express.Router()
//////////////////*/*/**/ *////// GET //////////////////*/*/**/ */
router.get('/', landing.Landing)
router.get('/Categories', landing.Categories)
router.get('/Lyfs/Categorie', Lyfs.LyfsCategorie)
router.get('/Profile', Profile.GetProfile )



router.post('/Login', Login.Login)
router.post('/Lyfs', Lyfs.Lyfs)
module.exports = router




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
