import { Game } from '../../model/game';
import { Review } from '../../model/review';
import gameDb from '../../repository/game.db';
import reviewDb from '../../repository/review.db';
import reviewService from '../../service/review.service';
import { ReviewInput } from '../../types';

let mockReviewDbGetAllReviews: jest.Mock;
let mockReviewDbCreateReview: jest.Mock;
let mockGameDbGetGameById: jest.Mock;
let mockReviewDeleteReviewById: jest.Mock;

beforeEach(() => {
    mockReviewDbGetAllReviews = jest.fn();
    mockReviewDbCreateReview = jest.fn();
    mockGameDbGetGameById = jest.fn();
    mockReviewDeleteReviewById = jest.fn();
    
    reviewDb.getAllReviews = mockReviewDbGetAllReviews;
    reviewDb.createReview = mockReviewDbCreateReview;
    gameDb.getGameById = mockGameDbGetGameById;
    reviewDb.deleteReviewById = mockReviewDeleteReviewById;
});

afterEach(() => {
    jest.clearAllMocks();
});


test('given valid reviews, when getting all reviews, then reviews are returned', async () => {
            // given
            

            const reviews = [
                new Review({
                    id: 1,
                    stars: 5,
                    description: 'Good',
                    game:  new Game({id: 1, name: 'Game 1', genre: 'RPG', releaseDate: new Date('2022-01-01'), developer: 'Phony'}),
                    reviewerId: 1
                }),
                new Review({
                    id: 2,
                    stars: 1,
                    description: 'Bad',
                    game: new Game({id: 2, name: 'Review 2', genre: 'Platformer', releaseDate: new Date('2023-01-01'), developer: "Macrohard"}),
                    reviewerId: 1
                }),
            ];

            mockReviewDbGetAllReviews.mockResolvedValue(reviews);

            // when
            const result = await reviewService.getAllReviews();

            // then
            expect(result).toEqual(reviews);
            expect(mockReviewDbGetAllReviews).toHaveBeenCalledTimes(1);
});

test('given a valid review input, when creating a review, then review is created', async () => {
    // given
    const reviewInput: ReviewInput = {
        stars: 5,
        description: 'Good',
        gameId: 1,
        reviewerId: 1,
    };

    const game = new Game({
        id: 1,
        name: 'Game 1',
        genre: 'RPG',
        releaseDate: new Date('2022-01-01'),
        developer: 'Phony',
    });

    const createdReview = new Review({
        id: 1, 
        stars: reviewInput.stars,
        description: reviewInput.description,
        game,
        reviewerId: reviewInput.reviewerId,
    });

    mockGameDbGetGameById.mockResolvedValue(game);
    mockReviewDbCreateReview.mockResolvedValue(createdReview);

    // when
    const result = await reviewService.createReview(reviewInput);

    // then
    expect(result).toEqual(createdReview);
    expect(mockReviewDbCreateReview).toHaveBeenCalledWith(
        expect.objectContaining({
            stars: reviewInput.stars,
            description: reviewInput.description,
            game,
            reviewerId: reviewInput.reviewerId,
        }),
    );
    expect(mockReviewDbCreateReview).toHaveBeenCalledTimes(1);
});


test('should delete the review when a valid reviewId is provided', async () => {
    const reviewId = 1;

    mockReviewDeleteReviewById.mockResolvedValue(undefined);

    await reviewService.deleteReviewById(reviewId);

    expect(mockReviewDeleteReviewById).toHaveBeenCalledWith({ id: reviewId });
    expect(mockReviewDeleteReviewById).toHaveBeenCalledTimes(1);
});

test('should throw an error if reviewId is undefined', async () => {
    await expect(reviewService.deleteReviewById()).rejects.toThrow('No user found');

    expect(mockReviewDeleteReviewById).not.toHaveBeenCalled();
});
