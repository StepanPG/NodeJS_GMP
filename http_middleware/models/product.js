import Sequelize from 'sequelize';
import { sequelize } from './index';

const ProductModel = sequelize.define(
    'product',
    {
        id: {
            type: Sequelize.NUMERIC,
            autoIncrement: true,
            primaryKey: true,
        },
        name: Sequelize.STRING,
        description: Sequelize.TEXT,
        reviews: Sequelize.ARRAY(Sequelize.TEXT),
    },
    {
        timestamps: false,
    }
);

export default ProductModel;
