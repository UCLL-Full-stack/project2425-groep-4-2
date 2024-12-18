import { User } from '../../model/user';
import { set } from 'date-fns';
import { Reviewer } from '../../model/reviewer';
import { Review } from '../../model/review'
import { Game } from '../../model/game';

const validUser = new User({id: 1, name: "user1", email: "user1@hotmail.com", dateOfBirth: new Date(2021, 11, 17), blacklisted: false, password: "secure password", role: "reviewer", consoles: []});

const validReview = new Review({id: 1, stars: 5, description: "good", game: new Game({id: 1, name: "game1", genre: "horror", releaseDate: new Date(2021, 11, 17), developer: "Sony"}), reviewerId: 1});

const validReviews = [validReview];

test('given: valid values for reviewer, when: reviewer is created, then: reviewer is created with those values', () => {

    const reviewer = new Reviewer({
        id: 1, 
        reviews: validReviews, 
        user: validUser,
    });
    
    expect(reviewer.getId()).toEqual(1);
    expect(reviewer.getReviews()).toContain(validReview);
    expect(reviewer.getUser()).toEqual(validUser);
});

