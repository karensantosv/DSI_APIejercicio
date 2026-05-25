import "../db/mongoose.js";
import { Trail } from "../models/traildocument.js";
import { TrailDocumentInterface } from "../models/traildocument.js";
import { Request, Response } from 'express';
import { app } from "../app.js"


/**
 * Metodo que obtiene un objeto, recibe id por parametros
 * @param req - Request
 * @param res - Response
 */
export const getTrailsById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
      const trail = await Trail.findById(id);
      if (!trail) {
          return res.status(404).send();
      }
      res.send(trail);
  } catch (error) {
      res.status(500).send(error);
  }
}

/**
 * Obtiene rutas por difficulty y/o location.country.
 * @param req - Request
 * @param res - Response
 */
export const getTrail = async (req: Request, res: Response) => {
  const { difficulty, country } = req.query;
  const filter: any = {};

  if (difficulty) {
      filter.difficulty = difficulty;
  }

  if (country) {
      filter['location.country'] = country;
  }

  try {
      const trails = await Trail.find(filter);
      res.send(trails);
  } catch (error) {
      res.status(500).send(error);
  }
}