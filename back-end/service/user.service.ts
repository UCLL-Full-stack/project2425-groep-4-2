import { User } from '../model/user';
import userDb from '../repository/user.db';

const getAllUsers = (): User[] => userDb.getAllUsers();

const getUserById = (id: number): User => {
    const user = userDb.getUsersById({ id });
    if (!user) throw new Error(`User with id ${id} does not exist.`);
    return user;
};

export default { getAllUsers, getUserById };
