const { Customer, Account } = require('../models/index');
const formatDate = require('../helpers/formatDate');

class CustomerController {
    static index(req, res) {
        Customer.findAll({
                order: [
                    ['fullname', 'ASC']
                ]
            }).then(customers => {
                const checkMessage = CustomerController.checkError(req, res);
                res.render('page/customer/index', { customers, checkMessage })
            })
            .catch(err => res.send(err.message));
    }

    static createCustomer(req, res) {
        const checkValidate = CustomerController.checkError(req, res);

        res.render('page/customer/create', { checkValidate });
    }

    static storeCustomer(req, res) {
        const { identityNumber, fullname, address, birthDate, gender } = req.body;
        const input = { identityNumber, fullname, address, birthDate, gender };

        Customer.create(input)
            .then(result => {
                res.app.locals = {
                    status: 'success',
                    message: 'success add new customer'
                }
                res.redirect('/customers')
            })
            .catch(err => {
                let temp = [];

                if (err.errors.length > 0) {
                    err.errors.forEach(el => {
                        temp.push(el.message);
                    })

                    res.app.locals = {
                        status: 'warning',
                        message: temp
                    }
                }

                res.redirect('/customers/register')
            })
    }

    static editCustomer(req, res) {
        Customer.findByPk(+req.params.idCustomer)
            .then(customer => {
                const checkValidate = CustomerController.checkError(req, res);
                res.render('page/customer/edit', { customer, formatDate, checkValidate })
            })
            .catch(err => {
                res.send(err.message);
            })
    }

    static updateCustomer(req, res) {
        const { id, identityNumber, fullname, address, birthDate, gender } = req.body;
        const input = { identityNumber, fullname, address, birthDate, gender };

        Customer.update(input, {
                where: { id }
            })
            .then(customer => {
                res.app.locals = {
                    status: 'success',
                    message: 'success updated employee'
                }
                res.redirect('/customers')
            })
            .catch(err => {
                let temp = [];

                if (err.errors.length > 0) {
                    err.errors.forEach(el => {
                        temp.push(el.message);
                    })

                    res.app.locals = {
                        status: 'warning',
                        message: temp
                    }
                }

                res.redirect(`/customers/${id}/editProfile`)
            })
    }

    static checkError(req, res) {
        let errors;
        if (req.app.locals.message) {
            const { status, message } = req.app.locals;
            errors = { status, message };

            delete req.app.locals.status;
            delete req.app.locals.message;
        }
        return errors
    }

}

module.exports = CustomerController;