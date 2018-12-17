const express = require('express');

const Ctr_Initials = require('../controllers/Ctr_Initials');

const Ctr_Lyfs = require('../controllers/Ctr_Lyfs');
const Ctr_Lyf_Create = require('../controllers/Ctr_Lyf_Create');
const Ctr_Purchases = require('../controllers/Ctr_Purchases');
const Ctr_Sales = require('../controllers/Ctr_Sales');

const router = express.Router();
router.get('/Lyfs', Ctr_Lyfs.Lyfs);


router.get('/Profile/Lyfs', Ctr_Lyfs.ProfileLyfs);
router.get('/Purchase', Ctr_Purchases.Purchase);
router.get('/Purchases', Ctr_Purchases.Purchases);
router.get('/Sale', Ctr_Sales.Sale);
router.get('/Sales', Ctr_Sales.Sales );
router.get('/Initials', Ctr_Initials.Initials );

// POST
router.post('/Lyf/Create/Generals', Ctr_Lyf_Create.Generals );
router.post('/Lyf/Create/Questions', Ctr_Lyf_Create.Questions );
router.post('/Lyf/Create/Images', Ctr_Lyf_Create.Images );

// UpDate
router.put('/Lyf/DeleteImage', Ctr_Lyf_Create.DeleteImage );

module.exports = router;
