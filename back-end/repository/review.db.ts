import { connect } from 'http2';
import { Review } from '../model/review';
import database from './database';

const getAllReviews = async (): Promise<Review[]> => {
    try {
        const reviewsPrisma = await database.review.findMany({
            include: {game: true},
        });
        return reviewsPrisma.map((reviewsPrisma) => Review.from(reviewsPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getReviewById = async ({ id }: { id: number }): Promise<Review | null> => {
    try {
        const reviewPrisma = await database.review.findUnique({
            where: { id },
            include: {game: true},
        });

        if (!reviewPrisma) { return null; }

        return Review.from(reviewPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createReview = async (review: Review): Promise<Review> => {
    try {
        const reviewPrisma = await database.review.create({
            data: {
                stars: review.getStars(),
                description: review.getDescription(),
                game: {connect:{id: review.getGame().getId()}},
                reviewer: { connect: { id: review.getReviewerId(), 
                }, },
            },
            include: {
                game: true,
                reviewer: true,
            },
        });
        return Review.from(reviewPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


export default {
    getAllReviews,
    getReviewById,
    createReview,
};
