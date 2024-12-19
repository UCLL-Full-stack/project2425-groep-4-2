import { Game } from '../../model/game';
import gameDb from '../../repository/game.db';
import gameService from '../../service/game.service';
import { GameInput } from '../../types';

let mockGameDbGetAllGames: jest.Mock;
let mockGameDbCreateGame: jest.Mock;

beforeEach(() => {
    mockGameDbGetAllGames = jest.fn();
    mockGameDbCreateGame = jest.fn();
    
    gameDb.getAllGames = mockGameDbGetAllGames;
    gameDb.createGame = mockGameDbCreateGame;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given valid games, when getting all games, then games are returned', async () => {
            // given
            const games = [
                new Game({
                    id: 1,
                    name: 'Game 1',
                    genre: 'RPG',
                    releaseDate: new Date('2022-01-01'),
                    developer: 'Phony'
                }),
                new Game({
                    id: 2,
                    name: 'Game 2',
                    genre: 'Platformer',
                    releaseDate: new Date('2023-01-01'),
                    developer: "Macrohard"
                }),
            ];

            mockGameDbGetAllGames.mockResolvedValue(games);

            // when
            const result = await gameService.getAllGames();

            // then
            expect(result).toEqual(games);
            expect(mockGameDbGetAllGames).toHaveBeenCalledTimes(1);
});

test('given a valid game, when creating a game, then game is created', async () => {
            // given
            const gameInput: GameInput = {
                name: 'Game 1',
                genre: 'RPG',
                releaseDate: new Date('2022-01-01'),
                developer: "Phony"
            };

            const createdGame = new Game({ ...gameInput });

            mockGameDbCreateGame.mockResolvedValue(createdGame);

            // when
            const result = await gameService.createGame(gameInput);

            // then
            expect(result).toEqual(createdGame);
            expect(mockGameDbCreateGame).toHaveBeenCalledWith(
                new Game({
                    name: gameInput.name,
                    genre: gameInput.genre,
                    releaseDate: new Date(gameInput.releaseDate),
                    developer: gameInput.developer,
                }),
            );
            expect(mockGameDbCreateGame).toHaveBeenCalledTimes(1);
});


