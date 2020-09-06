'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Immanuella',
          lastName: 'Busari',
          username: 'moonellator',
          email: 'example@example.com',
          password: '1234',
          roleId: 1,
          bioId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Jessica',
          lastName: 'Doe',
          username: 'jessy',
          email: 'jessy@example.com',
          password: '1234',
          roleId: 2,
          bioId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Johny',
          lastName: 'Elephant',
          username: 'johny',
          email: 'johny@example.com',
          password: '1234',
          roleId: 2,
          bioId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Users', null, {});
  },
};
