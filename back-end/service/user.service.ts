import { User } from '../model/user';
import userDb from '../repository/user.db';
import { UserInput } from '../types';

const getAllUsers = (): User[] => userDb.getAllUsers();

const getUserById = (id: number): User => {
    const user = userDb.getUsersById({ id });
    if (!user) throw new Error(`User with id ${id} does not exist.`);
    return user;
};

const updateUserBlacklist = async ({
    id,
    name,
    email,
    dateOfBirth,
    role,
    blacklisted,
    }: UserInput): Promise<User> => {

    if(id){
    const updatedUser = userDb.getUsersById({id});
    if(updatedUser){
    updatedUser.setBlacklisted(blacklisted);

    userDb.saveUser(updatedUser); 

    return await updatedUser;
    }
}
    throw new Error('No blacklisted');
}

export default { getAllUsers, getUserById, updateUserBlacklist, };
