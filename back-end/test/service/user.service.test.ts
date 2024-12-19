import bcrypt from 'bcrypt';
import userDb from '../../repository/user.db';
import reviewerService from '../../service/reviewer.service';
import { User } from '../../model/user';
import userService from '../../service/user.service';
import { generateJwtToken } from '../../util/jwt'; 
import { UserInput, AuthenticationResponse } from '../../types';

jest.mock('../../util/jwt', () => ({
    generateJwtToken: jest.fn(),
}));

let mockGetAllUsers: jest.Mock;
let mockGetUserByName: jest.Mock;
let mockAuthenticate: jest.Mock;
let mockGetUserById: jest.Mock;
let mockCreateUser: jest.Mock;
let mockSaveUser: jest.Mock;
let mockGenerateJwtToken: jest.Mock;
let mockBcryptCompare: jest.Mock;
let mockBcryptHash: jest.Mock;
let mockGetReviewerByUserId: jest.Mock;

beforeEach(() => {
    mockGetAllUsers = jest.fn();
    mockGetUserByName = jest.fn();
    mockAuthenticate = jest.fn();
    mockGetUserById = jest.fn();
    mockCreateUser = jest.fn();
    mockSaveUser = jest.fn();
    mockGenerateJwtToken = generateJwtToken as jest.Mock;
    mockBcryptCompare = jest.fn();
    mockBcryptHash = jest.fn();
    mockGetReviewerByUserId = jest.fn();

    userDb.getAllUsers = mockGetAllUsers;
    userDb.getUserByName = mockGetUserByName;
    userDb.getUserById = mockGetUserById;
    userDb.createUser = mockCreateUser;
    userDb.saveUser = mockSaveUser;
    bcrypt.compare = mockBcryptCompare;
    bcrypt.hash = mockBcryptHash;
    reviewerService.getReviewerByUserId = mockGetReviewerByUserId;
});

afterEach(() => {
    jest.clearAllMocks();
});

        test('given valid users, when getting all users, then users are returned', async () => {
            const users = [
                new User({ id: 1, name: 'Alice', email: 'alice@example.com', dateOfBirth: new Date('1990-01-01'), password: 'password', role: 'normal', blacklisted: false, consoles: [] }),
                new User({ id: 2, name: 'Bob', email: 'bob@example.com', dateOfBirth: new Date('1985-05-20'), password: 'password', role: 'reviewer', blacklisted: false, consoles: [] }),
            ];

            mockGetAllUsers.mockResolvedValue(users);

            const result = await userService.getAllUsers();

            expect(result).toEqual(users);
            expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
        });

        test('given valid name, when getting user by name, then the correct user is returned', async () => {
            const user = new User({ id: 1, name: 'Alice', email: 'alice@example.com', dateOfBirth: new Date('1990-01-01'), password: 'password', role: 'normal', blacklisted: false, consoles: [] });

            mockGetUserByName.mockResolvedValue(user);

            const result = await userService.getUserByName({ name: 'Alice' });

            expect(result).toEqual(user);
            expect(mockGetUserByName).toHaveBeenCalledWith({ name: 'Alice' });
        });

        test('given nonexistent user, when getting user by name, then error is thrown', async () => {
            mockGetUserByName.mockResolvedValue(null);

            await expect(userService.getUserByName({ name: 'Nonexistent' }))
                .rejects.toThrow('User with name: Nonexistent does not exist.');
        });

        test('given valid user with role reviewer, when authenticating users role, then token is returned', async () => {
            const userInput: UserInput = {
                id: 1,
                name: 'Alice',
                email: 'alice@example.com',
                dateOfBirth: new Date('1990-01-01'),
                password: 'password',
                role: 'reviewer',
                blacklisted: false,
                consoles: [],
            };
        
            const mockedUser = {
                getPassword: jest.fn().mockReturnValue('hashedPassword'),
                getRole: jest.fn().mockReturnValue('reviewer'),
                getId: jest.fn().mockReturnValue(1),
                getBlacklisted: jest.fn().mockReturnValue(false),
            };
        
            const reviewer = { getId: jest.fn().mockReturnValue(10) };
        
            mockGetUserByName.mockResolvedValue(mockedUser);
            mockBcryptCompare.mockResolvedValue(true); 
            mockGetReviewerByUserId.mockResolvedValue(reviewer);
            mockGenerateJwtToken.mockReturnValue('mockJwtToken');
        
            const result = await userService.authenticate(userInput);
        
            expect(result).toEqual({
                token: 'mockJwtToken',
                name: 'Alice',
                role: 'reviewer',
                id: 1,
                reviewerId: 10,
                blacklisted: false,
            });
        
            expect(mockBcryptCompare).toHaveBeenCalledWith('password', 'hashedPassword');
            expect(mockGenerateJwtToken).toHaveBeenCalledWith({
                name: 'Alice',
                role: 'reviewer',
                id: 1,
                reviewerId: 10,
                blacklisted: false,
            });
        });
        

        test('given user with invalid password, when authenticating users role then, error is thrown', async () => {
            const userInput: UserInput = {
                id: 1,
                name: 'Alice',
                email: 'alice@example.com',
                dateOfBirth: new Date('1990-01-01'),
                password: 'wrongPassword',
                role: 'reviewer',
                blacklisted: false,
                consoles: [],
            };
        
            const mockedUser = {
                getPassword: jest.fn().mockReturnValue('hashedPassword'),
                getRole: jest.fn().mockReturnValue('reviewer'),
                getId: jest.fn().mockReturnValue(1),
                getBlacklisted: jest.fn().mockReturnValue(false),
            };
        
            mockGetUserByName.mockResolvedValue(mockedUser);
            mockBcryptCompare.mockResolvedValue(false); 
        
            await expect(userService.authenticate(userInput))
                .rejects.toThrow('Incorrect password.');
        
            expect(mockGetUserByName).toHaveBeenCalledWith({ name: 'Alice' });
            expect(mockBcryptCompare).toHaveBeenCalledWith('wrongPassword', 'hashedPassword');
        });

        test('given valid id, when getting user by id, then user is returned', async () => {
            const user = new User({ id: 1, name: 'Alice', email: 'alice@example.com', dateOfBirth: new Date('1990-01-01'), password: 'password', role: 'normal', blacklisted: false, consoles: [] });

            mockGetUserById.mockResolvedValue(user);

            const result = await userService.getUserById(1);

            expect(result).toEqual(user);
            expect(mockGetUserById).toHaveBeenCalledWith({ id: 1 });
        });

        test('given invalid id, when getting user by id, then error is thrown', async () => {
            mockGetUserById.mockResolvedValue(null);

            await expect(userService.getUserById(99))
                .rejects.toThrow('User with id 99 does not exist.');
     });
    

     test('given vaild user, when creating user, then user is created', async () => {
        const newUser = new User({ id: 1, name: 'Alice', email: 'alice@example.com', dateOfBirth: new Date('1990-01-01'), password: 'hashedPassword', role: 'normal', blacklisted: false, consoles: [] });
    
        mockGetUserByName.mockResolvedValue(null);
        mockBcryptHash.mockResolvedValue('hashedPassword');
        mockCreateUser.mockResolvedValue(newUser);
    
        const result = await userService.createUser({
            name: 'Alice',
            email: 'alice@example.com',
            dateOfBirth: new Date('1990-01-01'),
            password: 'password',
            role: 'normal',
            blacklisted: false,
            consoles: [],
        });
    
        expect(result).toEqual(newUser);
        expect(mockBcryptHash).toHaveBeenCalledWith('password', 12);
        expect(mockCreateUser).toHaveBeenCalledWith(expect.any(User));
    });


        test('given already existant user, when creating user, then error is thrown', async () => {
            const existingUser = new User({ id: 1, name: 'Alice', email: 'alice@example.com', dateOfBirth: new Date('1990-01-01'), password: 'password', role: 'normal', blacklisted: false, consoles: [] });

            mockGetUserByName.mockResolvedValue(existingUser);

            await expect(userService.createUser({
                name: 'Alice',
                email: 'alice@example.com',
                dateOfBirth: new Date('1990-01-01'),
                role: 'normal',
                password: 'password',
                blacklisted: false,
                consoles: [],
            })).rejects.toThrow('User with name Alice is already registered.');
        });

        test('given user, when blacklisting user, then user is blacklisted', async () => {
            const user = new User({ id: 1, name: 'Alice', email: 'alice@example.com', dateOfBirth: new Date('1990-01-01'), password: 'password', role: 'normal', blacklisted: false, consoles: [] });

            mockGetUserById.mockResolvedValue(user);
            mockSaveUser.mockResolvedValue(undefined);

            const result = await userService.updateUserBlacklist({
                id: 1,
                name: 'Alice',
                email: 'alice@example.com',
                dateOfBirth: new Date('1990-01-01'),
                role: 'normal',
                password: 'password',
                blacklisted: true,
                consoles: [],
            });

            expect(result?.getBlacklisted()).toBe(true);
            expect(mockSaveUser).toHaveBeenCalledWith(user);
        });

        test('given nonexistent user, when blacklisting user, then error is thrown', async () => {
            mockGetUserById.mockResolvedValue(null);

            await expect(userService.updateUserBlacklist({
                id: 99,
                name: 'Nonexistent',
                email: 'nonexistent@example.com',
                dateOfBirth: new Date('1990-01-01'),
                role: 'normal',
                password: 'password',
                blacklisted: true,
                consoles: [],
            })).rejects.toThrow('No blacklisted');
        });

