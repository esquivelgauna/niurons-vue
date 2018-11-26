const express = require('express');
const Lyfs = require('../controllers/Ctr_Lyfs');


const router = express.Router();
router.get('/Lyfs', Lyfs.Lyfs);
module.exports = router;
