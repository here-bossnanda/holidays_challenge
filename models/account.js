'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Account extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Account.belongsTo(models.Customer, { as: 'customer', foreignKey: 'customerId' })
        }
    };
    Account.init({
        type: {
            type: DataTypes.STRING,
        },
        balance: {
            type: DataTypes.FLOAT,
            validate: {
                min: {
                    args: 500000,
                    msg: 'Minimum balance for new Accout: Rp500.000'
                }
            }
        },
        accountNumber: {
            type: DataTypes.STRING,
        },
        customerId: {
            type: {
                type: DataTypes.INTEGER,
                validate: {
                    notEmpty: {
                        msg: 'Customer must be filled'
                    }
                }
            },
        }
    }, {
        sequelize,
        modelName: 'Account',
        hooks: {
            beforeCreate(instance) {
                if (instance.balance === '') {
                    instance.balance = 500000;
                }
                instance.accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);
            },
        }
    });
    return Account;
};