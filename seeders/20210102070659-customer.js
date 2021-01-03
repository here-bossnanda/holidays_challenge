'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Customers', [{
      identityNumber: '00000000000000000001',
      fullname: 'Mochammad Trinanda Noviardy',
      address: 'Jln. jalan',
      birthDate: new Date(),
      gender: 'male',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      identityNumber: '00000000000000000002',
      fullname: 'Achmad Siddiq',
      address: 'Jln. rawa bebek',
      birthDate: new Date(),
      gender: 'male',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down:  (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Customers', [{
      identityNumber: '00000000000000000001',
      fullname: 'Mochammad Trinanda Noviardy',
      address: 'Jln. jalan',
      birthDate: new Date(),
      gender: 'male',
    },
    {
      identityNumber: '00000000000000000002',
      fullname: 'Achmad Siddiq',
      address: 'Jln. rawa bebek',
      birthDate: new Date(),
      gender: 'male',
    }])
  }
};
