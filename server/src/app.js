import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routerApi from './routes/index.js';
import passport from './controllers/auth.js';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(passport.initialize());

const whitelist = ['http://localhost:3000', 'http://127.0.0.1:5500', 'http://localhost:5173'];
const options = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(cors(options));

routerApi(app);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});