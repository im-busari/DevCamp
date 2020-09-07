'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert(
      'Comments',
      [
        {
          userId: 2,
          postId: 1,
          content: 'Testing Comments table',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          postId: 1,
          content: "Looks like it's working",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          postId: 2,
          content: 'Can we order some lasagna, please',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { validate: true, individualHooks: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comments');
  },
};
