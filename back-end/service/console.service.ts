import { Console } from '../model/console';
import consoleDb from '../repository/console.db';
import { ConsoleGameInput, ConsoleInput } from '../types';

const getAllConsoles = (): Promise<Console[]> => consoleDb.getAllConsoles();

const getConsoleById = async( id: number): Promise<Console> => {
    const console = await consoleDb.getConsoleById({id});

    if(!console){
        throw new Error(`Console with id ${id} does not exist.`);
    }

    return console;
}

const addGameToConsole = async({ consoleId, gameId }: ConsoleGameInput): Promise<Console | null> =>{
    const updatedConsole = await consoleDb.addGameToConsole(consoleId, gameId);

    return updatedConsole;
}


const createConsole = async ({
    name,
    price,
    version,
    brand,
    releaseDate: date,
    games,
    userId,
}: ConsoleInput): Promise<Console> => {
    const dateString = date;
    const releaseDate = new Date(dateString);

    const console = new Console({ name, price, version, brand, releaseDate, games: [], userId, });

    return await consoleDb.createConsole(console);
};

export default { getAllConsoles, createConsole, getConsoleById, addGameToConsole, };
