import { Console } from '../model/console';
import { Game } from '../model/game';

/*
let idSequenceConsole : 0;

let getNextIdConsole = (): number => {
    idSequenceConsole += 1;
    return idSequenceConsole;
}
*/

const gameOne = new Game({
    id: 1, 
    name: "Stardew valley", 
    genre: "Relax", 
    releaseDate: new Date(2021, 11, 17), 
    developer: "Harry", 
    consoles: []
});

const gameTwo = new Game({
    id: 2, name: "The legend of zelda BOTW", 
    genre: "Open world", 
    releaseDate: new Date(2021, 11, 17), 
    developer: "Harry", 
    consoles: []
})

const gameThree = new Game({
    id: 3, 
    name: "Dark Souls", 
    genre: "Soulslike", 
    releaseDate: new Date(2021, 11, 17), 
    developer: "Not Harry", 
    consoles: []
})

const allGames = [
    gameOne,
    gameTwo,
    gameThree,
]

const consoleOne = new Console({
    //id: getNextIdConsole(),
    id: 1,
    price: 500,
    name: "Playstation",
    version: "4 pro",
    releaseDate: new Date(2021, 11, 17),
    brand: "Sony",
    games: [gameOne],
})

const consoleTwo = new Console({
    //id: getNextIdConsole(),
    id: 2,
    price: 600,
    name: "X box",
    version: "One X",
    releaseDate: new Date(2021, 11, 17),
    brand: "Microsoft",
    games: allGames,
})

const consoles = [
    consoleOne, 
    consoleTwo, 
]


const getAllConsoles = (): Console[] => consoles;

const getConsoleById = ({ id }: { id: number }): Console | null => {
    return consoles.find((console) => console.getId() === id) || null;
};

const addConsole = (console : Console) : Console => {
    consoles.push(console);
    return console;
}

const deleteConsoleById = (id: number): void => {
    consoles.splice(id + 1, 1);
}

export default {
    //getNextIdConsole,
    getAllConsoles,
    getConsoleById,
    addConsole,
    deleteConsoleById,
};
