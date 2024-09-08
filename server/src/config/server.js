// Modules
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';

// Imports

// Variables
const app = express();

//const whitelist = ['http://localhost:3000', 'http://127.0.0.1:5500', 'http://localhost:5173'];
//const options = {
//    origin: (origin, callback) => {
//        if (whitelist.includes(origin) || !origin) {
//            callback(null, true);
//        } else {
//            callback(new Error('Not allowed by CORS'));
//        }
//    },
//};

// Middlewares

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



export default app;