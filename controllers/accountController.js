const { Customer, Account } = require('../models/index');
const { Op } = require('sequelize');
const check = require('../helpers/checkAmount');

class AccountController {
    static getAccount(req, res) {
        const id = +req.params.idCustomer;
        Customer.findByPk(id, { include: ['account'] })
            .then(customers => {
                const checkMessage = AccountController.checkError(req, res);
                const checkValidate = AccountController.checkError(req, res);
                res.render('page/account/index', { customers, checkMessage, checkValidate })
            })
            .catch(err => {
                res.send(err.message);
            })
    }

    static storeAccount(req, res) {
        const id = +req.params.idCustomer;
        const { type, balance } = req.body;
        const input = { type, balance, customerId: id };

        Account.create(input)
            .then(account => {
                res.app.locals = {
                    status: 'success',
                    message: 'success add account'
                }
                res.redirect(`/customers/${id}/accounts`);
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

                res.redirect(`/customers/${id}/accounts`)
            })
    }

    static getTransfer(req, res) {
        const accountId = req.params.idAccount;
        let data = {}

        Account.findByPk(accountId)
            .then(detail => {
                data.detail = detail;
                return Account.findAll({
                    where: {
                        [Op.not]: [
                            { id: accountId },
                        ]
                    },
                    include: ['customer']
                })
            })
            .then(account => {
                data.accounts = account;
                const checkMessage = AccountController.checkError(req, res);
                res.render('page/account/transfer', { data, checkMessage });
            })
            .catch(err => {
                res.send(err.message);
            })
    }

    static tranferBalance(req, res) {
        const customerId = req.params.idCustomer
        const idAccountFrom = req.params.idAccount;
        let { amount, accountId } = req.body;

        if (!amount) {
            amount = 0
        }

        Account.findByPk(idAccountFrom)
            .then(account => {
                if (check(amount, account.balance)) {
                    res.app.locals = {
                        status: 'warning',
                        message: 'Insufficient balance'
                    }
                    res.redirect(`/customers/${customerId}/accounts/${idAccountFrom}/transfer`)
                } else {
                    Account.decrement('balance', { by: amount, where: { id: idAccountFrom } });
                    Account.increment('balance', { by: amount, where: { id: accountId } });
                    res.app.locals = {
                        status: 'success',
                        message: 'success tranfer'
                    }
                    res.redirect(`/customers/${customerId}/accounts`)
                }
            })
            .catch(err => {
                res.send(err.message)
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

module.exports = AccountController;