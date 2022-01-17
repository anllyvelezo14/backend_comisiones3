const expres = require('express');
const router = expres.Router();

const ComisionController = require('../controllers/ComisionController');

router.get('/api/comisiones' 
// ,auth 
// ,ComisionPolicy.showAll 
,ComisionController.all
);

module.exports = router;