'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'Posts',
      [
        {
          userId: 1,
          title: 'Unique First Post',
          content: "Hooray.... Don't know what to do",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          title: 'Ding Dong',
          content: "Hooray.... Don't know what to do",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { validate: true, individualHooks: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Posts', null, {});
  },
};
