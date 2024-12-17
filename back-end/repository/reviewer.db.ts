import { Reviewer } from '../model/reviewer';
import database from './database';

const getAllReviewers = async (): Promise<Reviewer[]> => {
    try {
        const reviewersPrisma = await database.reviewer.findMany({
            include: {reviews: {include: {game: true}}, user: {include: {consoles: {include: {games: true}}}}},
        });
        return reviewersPrisma.map((reviewersPrisma) => Reviewer.from(reviewersPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getReviewerById = async ({ id }: { id: number }): Promise<Reviewer | null> => {
    try {
        const reviewerPrisma = await database.reviewer.findUnique({
            where: { id },
            include: {reviews: {include: {game: true}}, user: {include: {consoles: {include: {games: true}}}}},
        });

        if (!reviewerPrisma) { return null; }

        return Reviewer.from(reviewerPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getReviewerByUserId = async ({ userId }: { userId: number }): Promise<Reviewer | null> => {
    try {
        const reviewerPrisma = await database.reviewer.findUnique({
            where: { userId },
            include: {reviews: {include: {game: true}}, user: {include: {consoles: {include: {games: true}}}}},
        });

        if (!reviewerPrisma) { return null; }

        return Reviewer.from(reviewerPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createReviewer = async (reviewer: Reviewer): Promise<Reviewer> => {
    try {
        const userId = reviewer.getUser().getId(); if (userId === undefined) { throw new Error("User ID is undefined."); }
        const reviewerPrisma = await database.reviewer.create({
            data: {
                reviews: {
                    connect: reviewer.getReviews().map(reviewer => ({
                        id: reviewer.getId(),
                    })),
                },
                userId: userId,
            },
            include: {
                reviews: {include: {game: true,}},
                user: {include: {consoles: {include: {games: true}}}},
            },
        });
        return Reviewer.from(reviewerPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


export default {
    getAllReviewers,
    getReviewerById,
    createReviewer,
    getReviewerByUserId,
};
