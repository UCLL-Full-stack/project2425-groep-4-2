import { Game } from '../../model/game';
import { set } from 'date-fns';

const validId = 1;
const validName = "game1";
const validGenre = "horror";
const validReleasDate = new Date(2021, 11, 17);
const validDeveloper = "Sony";

test('given: valid values for game, when: game is created, then: game is created with those values', () => {

    const game = new Game({
        id: validId, 
        name: validName, 
        genre: validGenre,
        releaseDate: validReleasDate, 
        developer: validDeveloper, 
    });
    
    expect(game.getId()).toEqual(1);
    expect(game.getName()).toEqual(validName);
    expect(game.getGenre()).toEqual(validGenre);
    expect(game.getReleaseDate()).toEqual(validReleasDate);
    expect(game.getDeveloper()).toEqual(validDeveloper);
});

test('given: name is invalid, when: console is created, then: an error is thrown', () => {
    // given
    const invalidName = '';

    // when
    const game = () =>
            new Game({
            id: validId,  
            name: invalidName, 
            genre: validGenre,
            releaseDate: validReleasDate, 
            developer: validDeveloper,
        });

    // then
    expect(game).toThrow('Name is required');
});

test('given: genre is invalid, when: console is created, then: an error is thrown', () => {
    // given
    const invalidGenre = '';

    // when
    const game = () =>
            new Game({
            id: validId,  
            name: validName, 
            genre: invalidGenre,
            releaseDate: validReleasDate, 
            developer: validDeveloper,
        });

    // then
    expect(game).toThrow('Genre is required');
});

test('given: developer is invalid, when: console is created, then: an error is thrown', () => {
    // given
    const invalidDeveloper = '';

    // when
    const game = () =>
            new Game({
            id: validId,  
            name: validName, 
            genre: validGenre,
            releaseDate: validReleasDate, 
            developer: invalidDeveloper,
        });

    // then
    expect(game).toThrow('Developer is required');
});