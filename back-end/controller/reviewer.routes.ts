/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Lecturer:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            user:
 *              type: User
 *              description: User for role reviewer.
 *            reviews:
 *              type: Review[]
 *              description: The reviews from the reviewer.
 */
import express, { NextFunction, Request, Response } from 'express';
import reviewerService from '../service/reviewer.service';
import { Reviewer } from '../model/reviewer';
import { ReviewerInput } from '../types';

const reviewerRouter = express.Router();

/**
 * @swagger
 * /reviewers:
 *   get:
 *     summary: Get a list of all reviewers.
 *     responses:
 *       200:
 *         description: A list of reviewers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Reviewer'
 */
reviewerRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviewers = await reviewerService.getAllReviewers();
        res.status(200).json(reviewers);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /reviewers/{id}:
 *  get:
 *      summary: Get a reviewer by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The reviewer id.
 *      responses:
 *          200:
 *              description: A reviewer object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Reviewer'
 */

reviewerRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await reviewerService.getReviewerById(Number(req.params.id));
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

export { reviewerRouter };
