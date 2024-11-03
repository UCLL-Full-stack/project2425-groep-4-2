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
    id,
    name,
    version,
    brand,
}: ConsoleInput): Promise<Console> => {
    if (!id) {
        throw new Error('Id is required.');
    }
    if (!name) {
        throw new Error('Name is required.');
    }
    if (!version){
        throw new Error('Version required.');
    }
    if (!brand){
        throw new Error('Brand is required.');
    }

    const console = new Console({id, name, version, releaseDate: new Date(2021, 11, 17), brand, games : []})
    return await consoleDb.addConsole(console);
}

export default { getAllConsoles, getConsoleById, addConsole, };
