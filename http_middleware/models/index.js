import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    'postgres',
    process.env.PG_USER,
    process.env.PG_USER_PASSWORD,
    {
        host: 'localhost',
        dialect: 'postgres',
        port: 33033,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);

const authenticatePG = () => {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        });
};

export { sequelize, authenticatePG };
