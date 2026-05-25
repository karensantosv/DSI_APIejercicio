import "../db/mongoose.js";
import { Trail } from "../models/traildocument.js";
import { TrailDocumentInterface } from "../models/traildocument.js";
import { Request, Response } from 'express';
import { app } from "../app.js"

/**
 * Metodo que actualiza un objeto, recibe id por parametros
 * @param req - Request
 * @param res - Response
 */
// export const updateTrail = async (req: Request, res: Response) => {
//   const {id} = req.params;

//   if (!req.body) {
//     res.status(400).send();
//   } else {
//     const allowedUpdates = ["name", "description", "difficulty", "distanceKm", "elevationGainM", "durationMinutes", "location", "tags"];   // ['name', 'description', 'difficulty', 'distanceKm', 'elevationGainM', 'durationMinutes', 'location', 'tags'];
//     const actualUpdates = Object.keys(req.body);
//     const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update) );

//     if (!isValidUpdate) {
//         res.status(400).send();
//     } else {
//         try {
//             const t = await Trail.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//             if (!t) {
//                 return res.status(404).send();
//             }
//         } catch (error) {
//             return res.status(500).send();
//         }
//     }
//   }
// }

export const updateTrail = async (req: Request, res: Response) => {
    if (!req.body) {
      res.status(400).send();
    } else {
      const allowedUpdates = ['name', 'description', 'difficulty', 'distanceKm', 'elevationGainM', 'durationMinutes', 'location', 'tags'];
      const actualUpdates = Object.keys(req.body);
      const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update)); 
      
      if (!isValidUpdate) {
        res.status(400).send();
      } else {
          try {
              const t = await Trail.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
              if (!t) {
                  return res.status(404).send();
              }
              res.send(t);
          } catch (error) {
              res.status(500).send(error);
          }
      }
    }
}