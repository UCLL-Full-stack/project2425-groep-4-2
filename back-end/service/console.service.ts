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
    //let id;
    if (!id) {
        throw new Error('Id is required.');
        //id = consoleDb.getNextIdConsole();
    // }else{
    //     id = inputId;
    }
    if (!price) {
        throw new Error('Price is required.');
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
    if (!releaseDateString){
        throw new Error('Release date is required.');
    }

    const dateNumber = Date.parse(releaseDateString);
    const releaseDate = new Date(dateNumber);

    const console = new Console({id, price, name, version, releaseDate, brand, games : []})
    return await consoleDb.addConsole(console);
}

export default { getAllConsoles, getConsoleById, addConsole, };
