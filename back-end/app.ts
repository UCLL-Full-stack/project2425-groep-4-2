import * as dotenv from 'dotenv';
import express, { NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { userRouter } from './controller/user.routes';
import { consoleRouter } from './controller/console.routes';
import { reviewerRouter } from './controller/reviewer.routes';
import { gameRouter } from './controller/game.routes';
import helmet from 'helmet';

const app = express();
app.use(helmet());
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors({origin: 'http://localhost:8080'}));
app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/consoles', consoleRouter);
app.use('/reviewers', reviewerRouter);
app.use('/games', gameRouter);
app.use('/reviews', reviewerRouter);

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
