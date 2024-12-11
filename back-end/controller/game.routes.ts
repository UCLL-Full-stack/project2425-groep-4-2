/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Game:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Game name.
 *            genre:
 *              type: string
 *              description: Genre name.
 *            developer:
 *              type: string
 *              description: Developer of the game.
 *            releaseDate:
 *              type: string
 *              description: Console release date.
 */

import express, { NextFunction, Request, Response } from 'express';
import gameService from '../service/game.service';
import { GameInput } from '../types';

const gameRouter = express.Router();

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Get a list of all games.
 *     responses:
 *       200:
 *         description: A list of games.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Game'
 */

gameRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const games = await gameService.getAllGames();
        res.status(200).json(games);
    } catch (error) {
        next(error);
    }
});


export { gameRouter };
