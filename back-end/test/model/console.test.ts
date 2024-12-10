import { Console } from '../../model/console';
import { Game } from '../../model/game';
import { set } from 'date-fns';

const validGame = new Game({id: 1, name: "game1", genre: "horror", releaseDate: new Date(2021, 11, 17), developer: "Sony", consoles: []});


const validPrice = 500;
const validName = "Playstation";
const validVersion = "4 pro";
const validReleasDate = new Date(2021, 11, 17);
const validBrand = "Sony";
const validGames = [validGame];

test('given: valid values for console, when: console is created, then: console is created with those values', () => {

    const console = new Console({
        id: 1, 
        price: validPrice, 
        name: validName, 
        version: validVersion, 
        releaseDate: validReleasDate, 
        brand: validBrand, 
        games: validGames,
    });
    
    expect(console.getId()).toEqual(1);
    expect(console.getPrice()).toEqual(validPrice);
    expect(console.getName()).toEqual(validName);
    expect(console.getVersion()).toEqual(validVersion);
    expect(console.getReleaseDate()).toEqual(validReleasDate);
    expect(console.getBrand()).toEqual(validBrand);
    expect(console.getGames()).toContain(validGame);
});

