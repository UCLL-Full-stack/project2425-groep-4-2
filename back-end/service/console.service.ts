import { Console } from '../model/console';
import consoleDb from '../repository/console.db';
import { ConsoleInput } from '../types';

const getAllConsoles = (): Console[] => consoleDb.getAllConsoles();

const getConsoleById = (id: number): Console => {
    const console = consoleDb.getConsoleById({ id });
    if (!console) throw new Error(`Console with id ${id} does not exist.`);
    return console;
};

const addConsole = async ({
    //id: inputId,
    id,
    price,
    name,
    version,
    brand,
    releaseDate: releaseDateString,
}: ConsoleInput): Promise<Console> => {
    const dateNumber = Date.parse(releaseDateString);
    const releaseDate = new Date(dateNumber);

    const console = new Console({id, price, name, version, releaseDate, brand, games : []})
    return await consoleDb.addConsole(console);
}

const deleteConsole = (id: number): void => {
    consoleDb.deleteConsoleById(id);
}

export default { getAllConsoles, getConsoleById, addConsole, deleteConsole, };
