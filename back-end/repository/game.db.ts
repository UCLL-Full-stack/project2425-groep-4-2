import { Game } from '../model/game';
import database from './database';

const getAllGames = async (): Promise<Game[]> => {
    try {
        const gamesPrisma = await database.game.findMany({
        });
        return gamesPrisma.map((GamePrisma) => Game.from(GamePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getGameById = async ({ id }: { id: number }): Promise<Game | null> => {
    try {
        const gamePrisma = await database.game.findUnique({
            where: { id },
        });

        if (!gamePrisma) { return null; }

        return Game.from(gamePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getGameByName = async ({ name }: { name: string }): Promise<Game | null> => {
    try {
        const gamePrisma = await database.game.findFirst({
            where: { name },
        });

        if (!gamePrisma) { return null; }

        return Game.from(gamePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createGame = async (game: Game): Promise<Game> => {
    try {
        const gamePrisma = await database.game.create({
            data: {
                name: game.getName(),
                genre: game.getGenre(),
                releaseDate: game.getReleaseDate(),
                developer: game.getDeveloper()
            },
        });
        return Game.from(gamePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


export default {
    getAllGames,
    getGameById,
    getGameByName,
    createGame,
};
