import bcrypt from 'bcrypt';
import userDb from '../repository/user.db';
import { User } from '../model/user';
import { AuthenticationResponse, UserInput } from '../types';
import { generateJwtToken } from '../util/jwt';
import reviewerService from './reviewer.service';

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const getUserByName = async ({ name }: { name: string }): Promise<User> => {
    const user = await userDb.getUserByName({ name });
    if (!user) {
        throw new Error(`User with name: ${name} does not exist.`);
    }
    return user;
};

const authenticate = async ({ name, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByName({ name });


    const isValidPassword = await bcrypt.compare(password, user.getPassword());

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }

    let reviewer;

    if(user.getRole() === 'reviewer'){
        reviewer = await reviewerService.getReviewerByUserId(user.getId() || 0);
    }

    return {
        token: generateJwtToken({ name, role: user.getRole(), id: user.getId() || 20, reviewerId: reviewer?.getId() || 0, blacklisted: user.getBlacklisted() }),
        name: name,
        role: user.getRole(),
        id: user.getId() || 20,
        reviewerId: reviewer?.getId() || 0,
        blacklisted: user.getBlacklisted(),
    };
};



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


export default { getAllUsers, createUser, getUserById, updateUserBlacklist, authenticate };
