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

    getUserById(userId) {
        return UserModel.findOne({
            userId,
        }).catch((err) => {
            logger.error(
                `Error while searching user by userId: ${err.message}`
            );
            console.log(err.stack);
            return Promise.reject(err);
        });
    }

    getUserByUUID(userUUID) {
        return UserModel.findOne({
            userStrategyUUID: userUUID,
        }).catch((err) => {
            logger.error(`Error while searching user by UUID: ${err.message}`);
            console.log(err.stack);
            return Promise.reject(err);
        });
    }

    getUserByEmail(userEmail) {
        return UserModel.findOne({
            userName: userEmail,
        }).catch((err) => {
            logger.error(`Error while searching user by email: ${err.message}`);
            console.log(err.stack);
            return Promise.reject(err);
        });
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
