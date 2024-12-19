/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Review:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            stars:
 *              type: number
 *              format: int64
 *            description:
 *              type: string
 *              description: Review description.
 *            game:
 *              type: Game
 *              description: Game to review.
 *            reviewerId:
 *              type: number
 *              format: int64
 */

import express, { NextFunction, Request, Response } from 'express';
import reviewService from '../service/review.service';
import { ReviewInput } from '../types';

const reviewRouter = express.Router();

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get a list of all reviews.
 *     responses:
 *       200:
 *         description: A list of reviews.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Review'
 */

reviewRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviews = await reviewService.getAllReviews();
        res.status(200).json(reviews);
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Add a review to the current user
 *     requestBody:
 *      required: true
 *      content:
 *           application/json:
 *               schema:
 *                   $ref: '#/components/schemas/ReviewInput'
 * 
 *     responses:
 *        200:
 *           description: A review is added
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Review'
 * 
 *        
 */

reviewRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    try{
        const review = <ReviewInput>req.body;
        const result = reviewService.createReview(review);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({status: 'error', errorMessage: error});
    }
});

reviewRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    try{
        console.log("Yes it reaches");
        const review = <ReviewInput>req.body;
        console.log(review);
        const result = reviewService.deleteReviewById(review.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({status: 'error', errorMessage: error});
    }
});

export { reviewRouter };
