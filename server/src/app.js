import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

app.use(cors({        // this allow our server to accept requests from the domain which we have specified in the env file
    origin: process.env.CORS__ORIGIN,
    credentials: true,
}))


app.use(express.json()); // this will parse the incoming request with JSON payloads
app.use(express.urlencoded({ extended: true })); // this will parse the incoming request with URL-encoded payloads

import userRoutes from './routes/user.routes.js';
app.use('/api/v1/users', userRoutes); // this will use the user routes for the API version 1

app.use(errorHandler);

export { app };

