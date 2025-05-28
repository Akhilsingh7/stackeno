import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({        // this allow our server to accept requests from the domain which we have specified in the env file
    origin: process.env.CORS__ORIGIN,
    credentials: true,
}))

export { app };