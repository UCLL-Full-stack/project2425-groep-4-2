import { Game } from '../model/game';
import { Review } from '../model/review';
import gameDb from '../repository/game.db';
import reviewDb from '../repository/review.db';
import { ReviewInput } from '../types';

const getAllReviews = (): Promise<Review[]> => reviewDb.getAllReviews();

/*
const getConsoleById = (id: number): Console => {
    const console = consoleDb.getConsoleById({ id });
    if (!console) throw new Error(`Console with id ${id} does not exist.`);
    return console;
};
*/
/*
Edit this to check if this user already made a review for the game
const getReviewByGameName = async ({ gameName }: { gameName: string }): Promise<Review> => {
    const game = await gameDb.get({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    return user;
};
*/

const deleteReviewById = async (reviewId?: number) => {
    let id = reviewId;
    if(!id)throw new Error(`No user found`);
    await reviewDb.deleteReviewById({id});
}

const createReview = async ({
    stars,
    description,
    gameId,
    reviewerId,
}: ReviewInput): Promise<Review> => {
    let game: Game | null;

    if (!gameId){
        throw new Error('Game name is required');
    } 

    game = await gameDb.getGameById({ id: gameId });
    

    if (!game) throw new Error('Game not found');

    const review = new Review({ stars, description, game, reviewerId });

    return await reviewDb.createReview(review);
};

export default { getAllReviews, createReview, deleteReviewById, };
