const router = require('express').Router();
const customerRouter = require('./customer');

router.get('/', (req, res) => {
    res.render('index');
});

router.use('/customers', customerRouter)

module.exports = router;