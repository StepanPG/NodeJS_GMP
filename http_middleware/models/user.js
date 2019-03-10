import Sequelize from 'sequelize';
import { sequelize } from './index';

const UserModel = sequelize.define(
    'user',
    {
        id: {
            type: Sequelize.NUMERIC,
            autoIncrement: true,
            primaryKey: true,
        },
        email: Sequelize.STRING,
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        password: Sequelize.STRING,
    },
    {
        timestamps: false,
    }
);

export default UserModel;
