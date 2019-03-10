import { logger } from '../logger';
import UserModel from '../models/user';

class UsersController {
    getAllUsers() {
        return UserModel.findAll();
    }
}

export default new UsersController();
