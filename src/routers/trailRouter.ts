import "../db/mongoose.js";
import { Trail } from "../models/traildocument.js";
import { TrailDocumentInterface } from "../models/traildocument.js";
import express from 'express';
import { Request, Response } from 'express';
import { app } from "../app.js"
import { createTrail } from "../controllers/createTrail.js"
import { deleteTrail } from "../controllers/deleteTrails.js"
import { getTrailsById, getTrail } from "../controllers/getTrail.js";
import { updateTrail } from "../controllers/updateTrail.js";


/**
 * Metodo que crea un objeto
 * @param t - objeto a añadir
 * @returns - Promesa con el resultado
 */

export const trailRoute = express.Router();

trailRoute.post('/trails', createTrail);

trailRoute.delete('/trails/:id', deleteTrail);

trailRoute.get('/trails/:id', getTrailsById);

trailRoute.get('/trails/', getTrail);

trailRoute.patch('/trails/:id', updateTrail);



