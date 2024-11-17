import { User } from '../model/user';
import userDb from '../repository/user.db';

const getAllUsers = (): User[] => userDb.getAllUsers();

const getUserById = (id: number): User => {
    const user = userDb.getUsersById({ id });
    if (!user) throw new Error(`User with id ${id} does not exist.`);
    return user;
};

const updateUserBlacklist = async (user: User) => {
    const id = user.getId();
    if(!id){}
    else{
    const updatedUser = userDb.getUsersById({id});
    if(!updatedUser){}
    else{
    updatedUser.getBlacklisted = user.getBlacklisted;

    userDb.saveUser(updatedUser); 

    return updatedUser;
    }
}
    return user
}

export default { getAllUsers, getUserById, updateUserBlacklist, };
