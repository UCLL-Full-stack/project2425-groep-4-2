import { Reviewer } from '../model/reviewer';
import reviewerDb from '../repository/reviewer.db';

const getAllReviewers = async (): Promise<Reviewer[]> => reviewerDb.getAllReviewers();

const getReviewerById = async (id: number): Promise<Reviewer> => {
    const reviewer = await reviewerDb.getReviewerById({ id });
    if (!reviewer) throw new Error(`Reviewer with id ${id} does not exist.`);
    return reviewer;
};

export default { getAllReviewers, getReviewerById };
