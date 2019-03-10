'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'users',
            [
                {
                    email: 'user_1@example.com',
                    firstName: 'Mike',
                    lastName: 'Foo',
                    password: '12345',
                },
                {
                    email: 'user_2@example.com',
                    firstName: 'Nick',
                    lastName: 'Bar',
                    password: '67890',
                },
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    },
};
