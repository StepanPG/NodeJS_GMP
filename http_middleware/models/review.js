import Sequelize from 'sequelize';
import { sequelize } from './index';

const ReviewModel = sequelize.define(
    'product',
    {
        id: {
            type: Sequelize.NUMERIC,
            autoIncrement: true,
            primaryKey: true,
        },
        content: Sequelize.TEXT,
    },
    {
        timestamps: false,
    }
);

export default ReviewModel;
