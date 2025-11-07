import {Request, Response} from 'express';

const welcomeMessage = (req: Request, res: Response) => {
    res.send('Hello, Welcome!');
}

export {welcomeMessage};