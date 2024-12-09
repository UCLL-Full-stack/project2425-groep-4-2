import consoleService from '../../service/console.service'
import consoleDb from '../../repository/console.db';
import { Console } from '../../model/console';
import { Game } from '../../model/game';

let createConsoleMock: jest.Mock<Console, [Console]>; 

beforeEach(() => {
    createConsoleMock = jest.fn();

    consoleDb.addConsole = createConsoleMock;
});

afterEach(() => {
    jest.clearAllMocks(); 
});