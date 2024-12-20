/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Console:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            price:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Console name.
 *            version:
 *              type: string
 *              description: Console version.
 *            brand:
 *              type: string
 *              description: Console brand.
 *            releaseDate:
 *              type: string
 *              description: Console release date.
 */

import express, { NextFunction, Request, Response } from 'express';
import consoleService from '../service/console.service';
import { ConsoleGameInput, ConsoleInput } from '../types';

const consoleRouter = express.Router();

/**
 * @swagger
 * /Consoles:
 *   get:
 *     summary: Get a list of all consoles.
 *     responses:
 *       200:
 *         description: A list of consoles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Console'
 */

consoleRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const consoles = await consoleService.getAllConsoles();
        res.status(200).json(consoles);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /consoles/{id}:
 *  get:
 *      summary: Get a console by id.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The console id.
 *      responses:
 *          200:
 *              description: A console object.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Console'
 */

consoleRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const console = await consoleService.getConsoleById(Number(req.params.id));
        res.status(200).json(console);
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /consoles:
 *   post:
 *     summary: Add a console to the current user
 *     requestBody:
 *      required: true
 *      content:
 *           application/json:
 *               schema:
 *                   $ref: '#/components/schemas/ConsoleInput'
 * 
 *     responses:
 *        200:
 *           description: A console is added
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Console'
 * 
 *        
 */

consoleRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    try{
        const console = <ConsoleInput>req.body;
        const result = consoleService.createConsole(console);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({status: 'error', errorMessage: error});
    }
});

consoleRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try{
    const consoleGame = <ConsoleGameInput>req.body;
    const updatedConsole = await consoleService.addGameToConsole(consoleGame);

    res.status(200).json(updatedConsole);
    }catch (error) {
        res.status(400).json({status: 'error', errorMessage: error});
    }
});
export { consoleRouter };
