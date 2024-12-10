import { Console } from '../model/console';
import database from './database';

const getAllConsoles = async (): Promise<Console[]> => {
    try {
        const consolesPrisma = await database.console.findMany({
            include: {games: true},
        });
        return consolesPrisma.map((consolesPrisma) => Console.from(consolesPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getConsoleById = async ({ id }: { id: number }): Promise<Console | null> => {
    try {
        const consolePrisma = await database.console.findUnique({
            where: { id },
            include: {games: true},
        });

        return consolePrisma ? Console.from(consolePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createConsole = async (consoleT: Console): Promise<Console> => {
    try {
        const consolePrisma = await database.console.create({
            data: {
                price: consoleT.getPrice(),
                name: consoleT.getName(),
                version: consoleT.getVersion(),
                releaseDate: consoleT.getReleaseDate(),
                brand: consoleT.getBrand(),
                user: { connect: { id: consoleT.getUserId(), 
                } },
                games: {
                    connect: consoleT.getGames().map(game => ({
                        id: game.getId(),
                    })),
                },
            },
            include: {
                games: true,
                user: true,
            },
        });
        return Console.from(consolePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


export default {
    getAllConsoles,
    getConsoleById,
    createConsole,
};
