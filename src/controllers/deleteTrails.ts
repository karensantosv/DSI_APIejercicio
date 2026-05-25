import "../db/mongoose.js";
import { Trail } from "../models/traildocument.js";
import { TrailDocumentInterface } from "../models/traildocument.js";
import { Request, Response } from 'express';
import { app } from "../app.js"


/**
 * Metodo que elimina un objeto, recibe id por parametros
 * @param req - Request
 * @param res - Response
 */
export const deleteTrail = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
      const trail = await Trail.findByIdAndDelete(id);
      if (!trail) {
          return res.status(404).send();
      }
      res.send(trail);
  } catch (error) {
      res.status(500).send(error);
  }
}