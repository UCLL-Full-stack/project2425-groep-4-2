import { Console } from '../../model/console';
import consoleDb from '../../repository/console.db';
import consoleService from '../../service/console.service';
import { ConsoleInput } from '../../types';

let mockConsoleDbGetAllConsoles: jest.Mock;
let mockConsoleDbGetConsoleById: jest.Mock;
let mockConsoleDbCreateConsole: jest.Mock;

beforeEach(() => {
    mockConsoleDbGetAllConsoles = jest.fn();
    mockConsoleDbGetConsoleById = jest.fn();
    mockConsoleDbCreateConsole = jest.fn();

    consoleDb.getAllConsoles = mockConsoleDbGetAllConsoles;
    consoleDb.getConsoleById = mockConsoleDbGetConsoleById;
    consoleDb.createConsole = mockConsoleDbCreateConsole;
});

afterEach(() => {
    jest.clearAllMocks();
});


test('given valid consoles, when getting all consoles, then consoles are returned', async () => {
            // given
            const consoles = [
                new Console({
                    id: 1,
                    name: 'Console 1',
                    price: 499.99,
                    version: '1.0',
                    brand: 'Brand A',
                    releaseDate: new Date('2022-01-01'),
                    games: [],
                    userId: 1,
                }),
                new Console({
                    id: 2,
                    name: 'Console 2',
                    price: 299.99,
                    version: '2.0',
                    brand: 'Brand B',
                    releaseDate: new Date('2023-01-01'),
                    games: [],
                    userId: 2,
                }),
            ];

            mockConsoleDbGetAllConsoles.mockResolvedValue(consoles);

            // when
            const result = await consoleService.getAllConsoles();

            // then
            expect(result).toEqual(consoles);
            expect(mockConsoleDbGetAllConsoles).toHaveBeenCalledTimes(1);
});

test('given a valid console, when getting console by correct id, then a console is returned', async () => {
            // given
            const console = new Console({
                id: 1,
                name: 'Console 1',
                price: 499.99,
                version: '1.0',
                brand: 'Brand A',
                releaseDate: new Date('2022-01-01'),
                games: [],
                userId: 1,
    });

            mockConsoleDbGetConsoleById.mockResolvedValue(console);

            // when
            const result = await consoleService.getConsoleById(1);

            // then
            expect(result).toEqual(console);
            expect(mockConsoleDbGetConsoleById).toHaveBeenCalledWith({ id: 1 });
            expect(mockConsoleDbGetConsoleById).toHaveBeenCalledTimes(1);
});

        test('given no consoles, when getting when getting console by incorrect id, then an error is thrown', async () => {
            // given
            mockConsoleDbGetConsoleById.mockResolvedValue(null);

            // when
            const getConsole = async () => await consoleService.getConsoleById(99);

            // then
            await expect(getConsole).rejects.toThrow('Console with id 99 does not exist.');
            expect(mockConsoleDbGetConsoleById).toHaveBeenCalledWith({ id: 99 });
            expect(mockConsoleDbGetConsoleById).toHaveBeenCalledTimes(1);
});

test('given a valid console, when creating a console, then console is created', async () => {
            // given
            const consoleInput: ConsoleInput = {
                name: 'Console 1',
                price: 499.99,
                version: '1.0',
                brand: 'Brand A',
                releaseDate: '2022-01-01',
                games: [],
                userId: 1,
            };

            const createdConsole = new Console({
                ...consoleInput,
                releaseDate: new Date(consoleInput.releaseDate),
                games: [],
            });

            mockConsoleDbCreateConsole.mockResolvedValue(createdConsole);

            // when
            const result = await consoleService.createConsole(consoleInput);

            // then
            expect(result).toEqual(createdConsole);
            expect(mockConsoleDbCreateConsole).toHaveBeenCalledWith(
                new Console({
                    name: consoleInput.name,
                    price: consoleInput.price,
                    version: consoleInput.version,
                    brand: consoleInput.brand,
                    releaseDate: new Date(consoleInput.releaseDate),
                    games: [],
                    userId: consoleInput.userId,
                }),
            );
            expect(mockConsoleDbCreateConsole).toHaveBeenCalledTimes(1);
});


