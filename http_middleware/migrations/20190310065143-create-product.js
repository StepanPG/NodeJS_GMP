'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.STRING,
            },
            reviews: {
                type: Sequelize.ARRAY(Sequelize.TEXT),
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('products');
    },
};
