import { Console } from '../../model/console';
import { Game } from '../../model/game'; 
import { Review } from '../../model/review';
import { User } from '../../model/user';
import { set } from 'date-fns';


const validGame = new Game({id: 1, name: "game1", genre: "horror", releaseDate: new Date(2021, 11, 17), developer: "Sony"});

const validConsole = new Console({id: 1, price: 500, name: "Playstation", version: "4 pro", releaseDate: new Date(2021, 11, 17), brand: "Sony", games: [validGame], userId: 1});


const validName = "Jhon Doe";
const validEmail = "jhondoe@hotmail.com";
const validDateOfBirth = new Date(2001, 11, 17);
const validBlacklisted = false;
const validPassword = "secure password"
const validRole = "normal"
const validConsoles = [validConsole];

test('given: valid values for console, when: console is created, then: console is created with those values', () => {

    const user = new User({
        id: 1, 
        name: validName,
        email: validEmail,  
        dateOfBirth: validDateOfBirth, 
        blacklisted: validBlacklisted,
        password: validPassword, 
        role: validRole, 
        consoles: validConsoles,
    });
    
    expect(user.getId()).toEqual(1);
    expect(user.getName()).toEqual(validName);
    expect(user.getEmail()).toEqual(validEmail);
    expect(user.getDateOfBirth()).toEqual(validDateOfBirth);
    expect(user.getBlacklisted()).toEqual(validBlacklisted);
    expect(user.getPassword()).toEqual(validPassword);
    expect(user.getRole()).toEqual(validRole);
    expect(user.getConsoles()).toContain(validConsole);
});

test('given: name is invalid, when: user is created, then: an error is thrown', () => {
    // given
    const invalidName = '';

    // when
    const user = () =>
        new User({
            id: 1, 
            name: invalidName,
            email: validEmail,  
            dateOfBirth: validDateOfBirth, 
            blacklisted: validBlacklisted,
            password: validPassword, 
            role: validRole, 
            consoles: validConsoles,
        });

    // then
    expect(user).toThrow('Name is required');
});

test('given: email is invalid, when: user is created, then: an error is thrown', () => {
    // given
    const invalidEmail = '';

    // when
    const user = () =>
        new User({
            id: 1, 
            name: validName,
            email: invalidEmail,  
            dateOfBirth: validDateOfBirth, 
            blacklisted: validBlacklisted,
            password: validPassword, 
            role: validRole, 
            consoles: validConsoles,
        });

    // then
    expect(user).toThrow('Email is required');
});

test('given: password is invalid, when: user is created, then: an error is thrown', () => {
    // given
    const invalidPassword = '';

    // when
    const user = () =>
        new User({
            id: 1, 
            name: validName,
            email: validEmail,  
            dateOfBirth: validDateOfBirth, 
            blacklisted: validBlacklisted,
            password: invalidPassword, 
            role: validRole, 
            consoles: validConsoles,
        });

    // then
    expect(user).toThrow('Password is required');
});

// test('given: role is invalid, when: user is created, then: an error is thrown', () => {
//     // given
//     const invalidRole = '';

//     // when
//     const user = () =>
//         new User({
//             id: 1, 
//             name: validName,
//             email: validEmail,  
//             dateOfBirth: validDateOfBirth, 
//             blacklisted: validBlacklisted,
//             password: validPassword, 
//             role: invalidRole, 
//             consoles: validConsoles,
//         });

//     // then
//     expect(user).toThrow('Role is required');
// });