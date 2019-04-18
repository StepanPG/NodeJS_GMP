import UserModel from '../models/user';

class UsersController {
    getAllUsers() {
        return UserModel.find();
    }

    addNewUser(newUser) {
        return new UserModel(newUser).save();
    }

    updateUserById(userId, newData) {
        return UserModel.findOneAndUpdate({ userId }, newData, {
            upsert: true,
            new: true,
        });
    }

    deleteUserById(userId) {
        return UserModel.findOneAndDelete({ userId });
    }
}

export default new UsersController();
