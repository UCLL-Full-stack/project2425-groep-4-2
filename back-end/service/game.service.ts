import { Game } from '../model/game';
import gameDb from '../repository/game.db';
import { GameInput } from '../types';

const getAllGames = (): Promise<Game[]> => gameDb.getAllGames();
/*
const getConsoleById = (id: number): Console => {
    const console = consoleDb.getConsoleById({ id });
    if (!console) throw new Error(`Console with id ${id} does not exist.`);
    return console;
};
*/

const createGame = async ({
    name,
    genre,
    releaseDate: date,
    developer,
}: GameInput): Promise<Game> => {
    const dateString = date;
    const releaseDate = new Date(dateString);

    const game = new Game({ name, genre, releaseDate, developer, });

    return await gameDb.createGame(game);
};

export default { getAllGames, createGame, };
