import { Game } from '../../model/game';
import gameDb from '../../repository/game.db';
import gameService from '../../service/game.service';
import { GameInput } from '../../types';

let mock
let mockGameDbCreateGame: jest.Mock;

beforeEach(() => {
    mockGameDbCreateGame = jest.fn();

    gameDb.createGame = mockGameDbCreateGame;
});

afterEach(() => {
    jest.clearAllMocks();
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


