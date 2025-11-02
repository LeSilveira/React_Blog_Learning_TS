import express, { Router } from "express";
import { welcomeMessage } from '../controllers/welcomeController';

const welcomeRoutes: Router = express.Router();

welcomeRoutes.get('/', welcomeMessage);  

export {welcomeRoutes};