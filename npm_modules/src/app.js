import config from './config/config.json';
import { User, Product } from './models';

console.log(`Application name: ${config.name}`);

const user1 = new User();
const product1 = new Product();
