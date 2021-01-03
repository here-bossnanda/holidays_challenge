'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Customer.hasMany(models.Account, { as: 'account', foreignKey: 'customerId' })
        }
    };
    Customer.init({
        identityNumber: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'Identity Number must be filled'
                },
                len: {
                    args: [16, 20],
                    msg: "Identity Number minimum 16 characters and maximum 20 characters"
                },
                isUnique(value) {
                    return Customer.findOne({ where: { identityNumber: value } })
                        .then(identityNumber => {
                            if (identityNumber) {
                                throw new Error('Duplicate Identity Number');
                            }
                        })
                }
            }
        },
        fullname: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'Fullname must be filled'
                }
            }
        },
        address: {
            type: DataTypes.STRING
        },
        birthDate: {
            type: DataTypes.DATE,
            validate: {
                notEmpty: {
                    msg: 'Birth Date must be filled'
                }
            }
        },
        gender: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize,
        modelName: 'Customer',
        hooks: {
            beforeCreate(instance) {
                if (instance.birthDate === '') {
                    instance.birthDate = new Date("January 21, 2000")
                }
            }
        }
    });
    return Customer;
};