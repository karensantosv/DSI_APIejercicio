import { describe, expect, test, beforeEach } from 'vitest'
import { Trail } from "../src/models/traildocument.js"
import request from "supertest";
import { app } from "../src/app.js";
import moongose from 'mongoose';

describe('Trails', () => { 
    const trailOne = {
        name: "Trail 1",
        description: "Trail 1 description",
        difficulty: "Easy",
        distanceKm: 10,
        elevationGainM: 500,
        durationMinutes: 120,
        location: {
            country: "Spain",
            region: "Andal",
            coordinates: {
                lat: 1.1,
                lng: -4.4
            }
        },
        tags: ["tag1", "tag2"],
        createdAt: Date.now()
    };

    beforeEach(async () => {
        await Trail.deleteMany();
    });

    describe("POST /trails", () => {
        test("Debe crear una nueva ruta", async () => {
            const response = await request(app)
            .post("/trails")
            .send(trailOne)
            .expect(201);
        });

        test("Debe crear una nueva ruta", async () => {
            await request(app)
            .post("/trails")
            .send(trailOne)
            .expect(201);

            await request(app)
            .post("/trails")
            .send(trailOne)
            .expect(500);
        });
    });

    describe("Default", () => {
        test("No consigue la routa", async () => {
            await request(app)
            .get("/route")
            .expect(501);
        });
    });

    describe("DELETE /trails", () => {
        test("Debe eliminar una nueva ruta", async () => {
            const response = await request(app)
            .post("/trails")
            .send(trailOne)
            .expect(201);

            const idT = response.body._id.toString();
            console.log(idT);
            await request(app)
            .delete(`/trails/${idT}`)
            .send(trailOne)
            .expect(200);
        });

        test("Debe dar error por usar una ruta invalida", async () => {
            await request(app)
            .delete("/trails/invalid")
            .send(trailOne)
            .expect(500);
        });

        test("Debe dar error por usar una ruta invalida", async () => {
            await request(app)
            .delete("/trails/69fc63e3bca447ce0ed8a5d2")
            .send(trailOne)
            .expect(404);
        });
    });

    describe("GET /trails", () => {
        test("Debe obtener una nueva ruta", async () => {
            const response = await request(app)
            .post("/trails")
            .send(trailOne)
            .expect(201);

            const idT = response.body._id.toString();
            console.log(idT);
            await request(app)
            .get(`/trails/${idT}`)
            .send(trailOne)
            .expect(200);
        });

        test("Debe dar error por usar una ruta invalida", async () => {
            await request(app)
            .get("/trails/invalid")
            .send(trailOne)
            .expect(500);
        });

        test("Debe dar error por usar una ruta invalida", async () => {
            await request(app)
            .get("/trails/69fc63e3bca447ce0ed8a5d2")
            .send(trailOne)
            .expect(404);
        });
    });

    describe("GET por difficulty o country /trails", () => {
        test("Debe obtener una nueva ruta por dif", async () => {
            const response = await request(app)
            .post("/trails")
            .send(trailOne)
            .expect(201);

            await request(app)
            .get(`/trails?difficulty=Easy`)
            .send(trailOne)
            .expect(200);
        });

        test("Debe obtener una nueva ruta por country", async () => {
            const response = await request(app)
            .post("/trails")
            .send(trailOne)
            .expect(201);

            await request(app)
            .get(`/trails?country=Spain`)
            .send(trailOne)
            .expect(200);
        });

        test("Debe obtener una nueva ruta por country", async () => {
            await moongose.connection.close();
            await request(app)
            .get(`/trails?country=Spain`)
            .send(trailOne)
            .expect(500);
            await moongose.connect(`mongodb://localhost:27017/hiking-app`);
        });
    });

    describe("PATCH /trails", () => {
        test("Debe actualizar una nueva ruta", async () => {
            const response = await request(app)
            .post("/trails")
            .send(trailOne)
            .expect(201);

            const idT = response.body._id.toString();

            await request(app)
            .patch(`/trails/${idT}`)
            .send({ name: "Trail 22" })
            .expect(200);
        });

        test("Debe actualizar una nueva ruta", async () => {
            const response = await request(app)
            .post("/trails")
            .send(trailOne)
            .expect(201);

            const idT = response.body._id.toString();

            await request(app)
            .patch(`/trails/${idT}`)
            .send({ createDate: new Date(2026,0,3) })
            .expect(400);
        });

        test("Debe actualizar una nueva ruta", async () => {
            const response = await request(app)
            .post("/trails")
            .send(trailOne)
            .expect(201);

            const idT = response.body._id.toString();

            await request(app)
            .patch(`/trails/${idT}`)
            .send()
            .expect(400);
        });

        test("Debe actualizar una nueva ruta", async () => {
            await request(app)
            .patch(`/trails/69fc63e3bca447ce0ed8a5d1`)
            .send({
                name: "T234"
            })
            .expect(404);
        });

        test("Debe dar error por usar una ruta invalida", async () => {
            await request(app)
            .patch("/trails/invalid")
            .send({
                name: "T234"
            })
            .expect(500);
        });
    });
})