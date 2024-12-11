import { User } from '../model/user';
import database from './database';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({
            include: {consoles: {include: {games: true}}},
        });
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
            include: {consoles: {include: {games: true}}},
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createUser = async (user: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                name: user.getName(),
                email: user.getEmail(),
                dateOfBirth: user.getDateOfBirth(),
                blacklisted: user.getBlacklisted(),
                password: user.getPassword(),
                role: user.getRole(),
                consoles: {
                    connect: user.getConsoles().map(console => ({
                        id: console.getId(),
                    })),
                },
            },
            include: {
                consoles: { include: { games: true } },
            },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByName = async ({ name }: { name: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { name },
            include: {consoles: {include: {games: true}}}
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const saveUser = async (updatedUser: User): Promise<User> => {
    const updated = await database.user.update({
        where: {
          id: updatedUser.getId(),
        },
        data: {
          name: updatedUser.getName(),
          email: updatedUser.getEmail(),
          password: updatedUser.getPassword(),
          dateOfBirth: updatedUser.getDateOfBirth(),
          blacklisted: updatedUser.getBlacklisted(),
          role: updatedUser.getRole(),
          consoles: {
            set: updatedUser.getConsoles().map(console => ({
              id: console.getId(),
            })),
          },
        },
        include: {
          consoles: {include: {games: true}},
        },
      });

    return User.from(updated);
}


export default {
    getAllUsers,
    getUserById,
    createUser,
    getUserByName,
    saveUser,
};
