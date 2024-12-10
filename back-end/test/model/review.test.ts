import { Game } from '../../model/game';
import { set } from 'date-fns';
import { Review } from '../../model/review';

const validGame = new Game({id: 1, name: "game1", genre: "horror", releaseDate: new Date(2021, 11, 17), developer: "Sony", consoles: []});

const validStars = 5;
const validDescription = "Bad";

test('given: valid values for review, when: review is created, then: review is created with those values', () => {

    const review = new Review({
        id: 1,   
        description: validDescription, 
        stars: validStars, 
        game: validGame,
    });
    
    expect(review.getId()).toEqual(1);
    expect(review.getDescription()).toEqual(validDescription);
    expect(review.getStars()).toEqual(validStars);
    expect(review.getGame()).toEqual(validGame);
});