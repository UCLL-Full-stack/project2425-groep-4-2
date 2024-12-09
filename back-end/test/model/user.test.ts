import { Console } from '../../model/console';
import { Game } from '../../model/game'; 
import { Review } from '../../model/review';
import { User } from '../../model/user';
import { set } from 'date-fns';


const validGame = new Game({id: 1, name: "game1", genre: "horror", releaseDate: new Date(2021, 11, 17), developer: "Sony", consoles: []});

const validConsole = new Console({id: 1, price: 500, name: "Playstation", version: "4 pro", releaseDate: new Date(2021, 11, 17), brand: "Sony", games: []});

const validReview = new Review({id: 1, description: "Bad", stars: 5, game: validGame,});

const validName = "Jhon Doe";
const validEmail = "jhondoe@hotmail.com";
const validDateOfBirth = new Date(2001, 11, 17);
const validBlacklisted = false;
const validRole = "reviewer"
const validConsoles = [validConsole];
const validReviews = [validReview];

test('given: valid values for console, when: console is created, then: console is created with those values', () => {

    const user = new User({
        id: 1, 
        name: validName,
        email: validEmail,  
        dateOfBirth: validDateOfBirth, 
        blacklisted: validBlacklisted, 
        role: validRole, 
        consoles: validConsoles,
        reviews: validReviews,
    });
    
    expect(user.getId()).toEqual(1);
    expect(user.getName()).toEqual(validName);
    expect(user.getEmail()).toEqual(validEmail);
    expect(user.getDateOfBirth()).toEqual(validDateOfBirth);
    expect(user.getBlacklisted()).toEqual(validBlacklisted);
    expect(user.getRole()).toEqual(validRole);
    expect(user.getConsoles()).toContain(validConsole);
    expect(user.getReviews()).toContain(validReview);
});

