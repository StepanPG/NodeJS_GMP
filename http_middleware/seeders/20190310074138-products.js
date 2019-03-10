'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'products',
            [
                {
                    name: 'Baloon',
                    description: 'This is product description',
                    reviews: [
                        JSON.stringify({
                            content: 'This is first review of some product #1',
                        }),
                    ],
                },
                {
                    name: 'Pencil',
                    description: 'This is product description',
                    reviews: [
                        JSON.stringify({
                            content: 'This is first review of some product #2',
                        }),
                    ],
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('products', null, {});
    },
};
