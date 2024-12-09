import { Console } from '../../model/console';
import { Game } from '../../model/game';
import { set } from 'date-fns';

const validConsole = new Console({id: 1, price: 500, name: "Playstation", version: "4 pro", releaseDate: new Date(2021, 11, 17), brand: "Sony", games: []});


const validName = "game1";
const validGenre = "horror";
const validReleasDate = new Date(2021, 11, 17);
const validDeveloper = "Sony";
const validConsoles = [validConsole];

test('given: valid values for game, when: game is created, then: game is created with those values', () => {

    const game = new Game({
        id: 1, 
        name: validName, 
        genre: validGenre,
        releaseDate: validReleasDate, 
        developer: validDeveloper, 
        consoles: validConsoles,
    });
    
    expect(game.getId()).toEqual(1);
    expect(game.getName()).toEqual(validName);
    expect(game.getGenre()).toEqual(validGenre);
    expect(game.getReleaseDate()).toEqual(validReleasDate);
    expect(game.getDeveloper()).toEqual(validDeveloper);
    expect(game.getConsoles()).toContain(validConsole);
});