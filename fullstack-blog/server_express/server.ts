import express, {Express} from 'express';
import cors from 'cors';
import {postRoutes} from './routes/postRoutes';
import {welcomeRoutes} from './routes/welcomeRoutes';

const app: Express = express();
const port: number = 3000

app.use(cors());
app.use(express.json()); // Used to parse JSON string into JS objects, and get them from req.body in POSTS and PUT requests

app.use('/api/posts', postRoutes);
app.use('/api/welcome', welcomeRoutes);

app.listen(port, () => {
    console.log(`Server up and running at http://localhost:${port}`); 
})