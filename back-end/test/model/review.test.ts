import { Game } from '../../model/game';
import { set } from 'date-fns';
import { Review } from '../../model/review';

const validGame = new Game({id: 1, name: "game1", genre: "horror", releaseDate: new Date(2021, 11, 17), developer: "Sony"});

const validStars = 5;
const validDescription = "Bad";
const validReviewerId = 1;

test('given: valid values for review, when: review is created, then: review is created with those values', () => {

    const review = new Review({
        id: 1,   
        stars: validStars, 
        description: validDescription, 
        game: validGame,
        reviewerId: validReviewerId,
    });
    
    expect(review.getId()).toEqual(1);
    expect(review.getDescription()).toEqual(validDescription);
    expect(review.getStars()).toEqual(validStars);
    expect(review.getGame()).toEqual(validGame);
    expect(review.getReviewerId()).toEqual(validReviewerId);
});

test('given: stars is invalid, when: review is created, then: an error is thrown', () => {
    // given
    const invalidStars = 0;

    // when
    const review = () =>
        new Review({
            id: 1,   
            stars: invalidStars, 
            description: validDescription, 
            game: validGame,
            reviewerId: validReviewerId,
        });

    // then
    expect(review).toThrow('Stars is required');
});

test('given: description is invalid, when: review is created, then: an error is thrown', () => {
    // given
    const invalidDescription = '';

    // when
    const review = () =>
        new Review({
            id: 1,   
            stars: validStars, 
            description: invalidDescription, 
            game: validGame,
            reviewerId: validReviewerId,
        });

    // then
    expect(review).toThrow('Description is required');
});

// test('given: game is invalid, when: review is created, then: an error is thrown', () => {
//     // given
//     const invalidGame = undefined;

//     // when
//     const review = () =>
//         new Review({
//             id: 1,   
//             stars: validStars, 
//             description: validDescription, 
//             game: invalidGame,
//             reviewerId: validReviewerId,
//         });

//     // then
//     expect(review).toThrow('Game is required');
// });

test('given: reviewer id is invalid, when: review is created, then: an error is thrown', () => {
    // given
    const invalidReviewerId = 0;

    // when
    const review = () =>
        new Review({
            id: 1,   
            stars: validStars, 
            description: validDescription, 
            game: validGame,
            reviewerId: invalidReviewerId,
        });

    // then
    expect(review).toThrow('Reviewer id is required');
});