import { Console } from '../../model/console';
import { Game } from '../../model/game';
import { set } from 'date-fns';

const validGame = new Game({id: 1, name: "game1", genre: "horror", releaseDate: new Date(2021, 11, 17), developer: "Sony"});

const validId = 1;
const validPrice = 500;
const validName = "Playstation";
const validVersion = "4 pro";
const validReleaseDate = new Date(2021, 11, 17);
const validBrand = "Sony";
const validGames = [validGame];
const validUserId = 1;

test('given: valid values for console, when: console is created, then: console is created with those values', () => {

    const console = new Console({
        id: validId, 
        price: validPrice, 
        name: validName, 
        version: validVersion, 
        releaseDate: validReleaseDate, 
        brand: validBrand, 
        games: validGames,
        userId: validUserId,
    });
    
    expect(console.getId()).toEqual(validId);
    expect(console.getPrice()).toEqual(validPrice);
    expect(console.getName()).toEqual(validName);
    expect(console.getVersion()).toEqual(validVersion);
    expect(console.getReleaseDate()).toEqual(validReleaseDate);
    expect(console.getBrand()).toEqual(validBrand);
    expect(console.getGames()).toContain(validGame);
    expect(console.getUserId()).toEqual(validUserId);
});

test('given: price is invalid, when: console is created, then: an error is thrown', () => {
    // given
    const invalidPrice = 0;

    // when
    const console = () =>
            new Console({
            id: validId, 
            price: invalidPrice, 
            name: validName, 
            version: validVersion, 
            releaseDate: validReleaseDate, 
            brand: validBrand, 
            games: validGames,
            userId: validUserId,
        });

    // then
    expect(console).toThrow('Price is required');
});

test('given: name is an empty string, when: console is created, then: an error is thrown', () => {
    // given
    const invalidName = '';

    // when
    const console = () =>
            new Console({
            id: validId, 
            price: validPrice, 
            name: invalidName, 
            version: validVersion, 
            releaseDate: validReleaseDate, 
            brand: validBrand, 
            games: validGames,
            userId: validUserId,
        });

    // then
    expect(console).toThrow('Name is required');
});

test('given: version is an empty string, when: console is created, then: an error is thrown', () => {
    // given
    const invalidVersion = '';

    // when
    const console = () =>
            new Console({
            id: validId, 
            price: validPrice, 
            name: validName, 
            version: invalidVersion, 
            releaseDate: validReleaseDate, 
            brand: validBrand, 
            games: validGames,
            userId: validUserId,
        });

    // then
    expect(console).toThrow('Version is required');
});

// test('given: realease date is an empty string, when: console is created, then: an error is thrown', () => {
//     // given
//     const invalidReleaseDate = undefined;

//     // when
//     const console = () =>
//         new Console({
//         id: validId, 
//         price: validPrice, 
//         name: validName, 
//         version: validVersion, 
//         releaseDate: invalidReleaseDate, 
//         brand: validBrand, 
//         games: validGames,
//         userId: validUserId,
//     });

//     // then
//     expect(console).toThrow('Release date is required');
// });

test('given: brand is an empty string, when: console is created, then: an error is thrown', () => {
    // given
    const invalidBrand = '';

    // when
    const console = () =>
            new Console({
            id: validId, 
            price: validPrice, 
            name: validName, 
            version: validVersion, 
            releaseDate: validReleaseDate, 
            brand: invalidBrand, 
            games: validGames,
            userId: validUserId,
        });

    // then
    expect(console).toThrow('Brand is required');
});

// test('given: games is an empty string, when: console is created, then: an error is thrown', () => {
//     // given
//     const invalidGames = undefined;

//     // when
//     const console = () =>
//             new Console({
//             id: validId, 
//             price: validPrice, 
//             name: validName, 
//             version: validVersion, 
//             releaseDate: validReleaseDate, 
//             brand: validBrand, 
//             games: invalidGames,
//             userId: validUserId,
//         });

//     // then
//     expect(console).toThrow('Version is required');
// });

test('given: user id is invalid, when: console is created, then: an error is thrown', () => {
    // given
    const invalidUserId = 0;

    // when
    const console = () =>
            new Console({
            id: validId, 
            price: validPrice, 
            name: validName, 
            version: validVersion, 
            releaseDate: validReleaseDate, 
            brand: validBrand, 
            games: validGames,
            userId: invalidUserId,
        });

    // then
    expect(console).toThrow('User id is required');
});