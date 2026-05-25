// import "./db/mongoose.js";
// import { Trail } from "./models/traildocument.js";
// import { TrailDocumentInterface } from "./models/traildocument.js";

// /**
//  * Metodo que crea un objeto
//  * @param t - objeto a añadir
//  * @returns - Promesa con el resultado
//  */
// export function createTrail(t: TrailDocumentInterface): Promise<TrailDocumentInterface> {
//   const trail = new Trail(t);
//   return trail.save()
//     .then((st) => {
//       console.log('Se creó la ruta correctamente');
//       return st;
//     })
//     .catch((error) => {
//       throw error;
//     });
// }

// /***
//  * Metodo que elimina un objeto de la base de dato
//  * @param id - stirng
//  */
// export function deleteTrail(id: string): Promise<void> {
//   return Trail.findByIdAndDelete(id)
//     .then(() => {
//       console.log('Ruta eliminada correctamente');
//     })
//     .catch((error) => {
//       throw error;
//     });
// }

// /***
//  * Metodo que obtienen uno
//  * @param id - stirng
//  */
// export function getTrailById(id: string): Promise<TrailDocumentInterface> {
//   return Trail.findById(id)
//     .then((trail) => {
//       if (!trail) {
//         throw new Error('Ruta no encontrada');
//       }
//       return trail;
//     })
//     .catch((error) => {
//       throw error;
//     });
// }

// /**
//  * Interface para el partial
//  */
// export interface getT {
//     difficulty: string,
//     country: string,
// }

// /***
//  * Metodo que obtiene uno por filtro de dificultad o pais
//  * @param filter - filtro de busqueda
//  */
// export function getTrails(filter: Partial<getT>): Promise<TrailDocumentInterface[]> {
//     const query: any = {};
//     if (filter.difficulty) {
//         query.difficulty = filter.difficulty;
//     }
//     if (filter.country) {
//         query['location.country'] = filter.country;
//     }
//     return Trail.find(query)
//     .then((trails) => {
//         return trails;
//     })
//     .catch((error) => {
//         throw error;
//     });
// }

// /***
//  * Metodo que actualiza
//  * @param id - stirng con el id
//  * @param data - datos a cambiar
//  */
// export function actualizarRuta(id: string, data: TrailDocumentInterface): Promise<TrailDocumentInterface> {
//     return Trail.findByIdAndUpdate(id, data, { new: true, runValidators: true })
//     .then((t) => {
//         if (!t) {
//           throw new Error('Ruta no encontrada');
//         }
//         console.log('Ruta actualizada correctamente');
//         return t;
//     })
//     .catch((error) => {
//         throw error;
//     });
// }





// // const t = new Trail({
// //     name: 'Trail 1',
// //     description: 'larga',
// //     difficulty: 'Moderate',
// //     distanceKm: 10,
// //     elevationGainM: 500,
// //     durationMinutes: 120,
// //     location: {
// //         country: 'Country',
// //         region: 'Region',
// //         coordinates: {
// //             lat: 45.0,
// //             lng: -90.0
// //         }
// //     },
// //     tags: ['tag1', 'tag2'],
// //     createdAt: new Date()
// // });

// // t.save().then((result) => {
// //   console.log(result);
// // }).catch((error) => {
// //   console.log(error);
// // });

