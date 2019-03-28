import { logger } from '../logger';
import UserModel from '../models/user';
import { addLastModifiedDate } from '../helpers';

class UsersController {
    getAllUsers() {
        return UserModel.find();
    }

    addNewUser(newUser) {
        return new UserModel(addLastModifiedDate(newUser)).save();
    }

    updateUserById(userId, newData) {
        return UserModel.findByIdAndUpdate(
            userId,
            addLastModifiedDate(newData),
            {
                upsert: true,
            }
        ).catch((err) => {
            logger.error(`Error while updating user by id: ${err.message}`);
            console.log(err.stack);
            return Promise.reject(err);
        });
    }

    deleteUserById(userId) {
        return UserModel.findByIdAndDelete(userId).catch((err) => {
            logger.error(`Error while deleting user by id: ${err.message}`);
            console.log(err.stack);
            return Promise.reject(err);
        });
    }
}

export default new UsersController();
