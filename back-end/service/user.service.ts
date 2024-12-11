import bcrypt from 'bcrypt';
import userDb from '../repository/user.db';
import { User } from '../model/user';
import { UserInput } from '../types';

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

/*
const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername({ username });

    const isValidPassword = await bcrypt.compare(password, user.getPassword());

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }
    return {
        token: generateJwtToken({ username, role: user.getRole() }),
        username: username,
        fullname: `${user.getFirstName()} ${user.getLastName()}`,
        role: user.getRole(),
    };
};

*/

const getUserById = async(id: number): Promise<User> => {
    const user = await userDb.getUserById({id});

    if(!user){
        throw new Error(`User with id ${id} does not exist.`);
    }

    return user;
}

const createUser = async ({
    name,
    email,
    dateOfBirth,
    role,
    blacklisted,
    password,
}: UserInput): Promise<User> => {
    const existingUser = await userDb.getUserByName({ name });

    if (existingUser) {
        throw new Error(`User with name ${name} is already registered.`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ name, password: hashedPassword, dateOfBirth, blacklisted, email, role, consoles: [] });

    return await userDb.createUser(user);
};

const updateUserBlacklist = async ({
    id,
    name,
    email,
    dateOfBirth,
    role,
    blacklisted,
    }: UserInput): Promise<User | undefined> => {
    if(id){
    const updatedUser = await userDb.getUserById({id});
    if(!updatedUser){
        throw new Error('No blacklisted');
    }
    updatedUser.setBlacklisted(blacklisted);

    userDb.saveUser(updatedUser); 

    return updatedUser;
}
    
}


export default { getAllUsers, createUser, getUserById, updateUserBlacklist };
