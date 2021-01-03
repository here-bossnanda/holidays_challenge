const router = require('express').Router();
const customerController = require('../controllers/customerController');
const accountController = require('../controllers/accountController');


router.get('/', customerController.index);

router.get('/register', customerController.createCustomer);
router.post('/register', customerController.storeCustomer);

router.get('/:idCustomer/editProfile', customerController.editCustomer);
router.post('/:idCustomer/editProfile', customerController.updateCustomer);

router.get('/:idCustomer/accounts', accountController.getAccount);
router.post('/:idCustomer/accounts', accountController.storeAccount);

router.get('/:idCustomer/accounts/:idAccount/transfer', accountController.getTransfer);
router.post('/:idCustomer/accounts/:idAccount/transfer', accountController.tranferBalance);


module.exports = router;