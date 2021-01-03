'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.changeColumn('Accounts', 'balance', {
      type: 'FLOAT USING CAST("balance" as FLOAT)'
    });
  },

  down:  (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Accounts', 'balance', {
      type: 'FLOAT USING CAST("balance" as FLOAT)'
    });
  }
};
