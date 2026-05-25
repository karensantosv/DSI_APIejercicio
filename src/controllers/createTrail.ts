import "../db/mongoose.js";
import { Trail } from "../models/traildocument.js";
import { TrailDocumentInterface } from "../models/traildocument.js";
import { Request, Response } from 'express';
import { app } from "../app.js"


/**
 * Metodo que crea un objeto
 * @param req - Request
 * @param res - Response
 */
export const createTrail = async (req: Request, res: Response) => {
  const trail = new Trail(req.body);
  try {
    await trail.save();
    res.status(201).send(trail);
  } catch (error) {
    res.status(500).send(error);
  }
}
