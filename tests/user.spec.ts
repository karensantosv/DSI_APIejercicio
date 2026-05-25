import { describe, test, expect, beforeEach } from 'vitest';
import request from "supertest";
import { app } from "../src/app.js";
import { userRouter } from "../src/routers/userRouter.js";
import { User } from "../src/models/userSchema.js"
import { tvshowRouter } from "../src/routers/tvshowRouter.js";
import { TvShow } from "../src/models/tvshowSchema.js"
import mongoose from 'mongoose';

describe("test /user", () => {
    let u = {
        name: "Juan",
        username: "juanp",
        email: "juanp@gmail.com",
        favoriteGenre: ["drama", "suspense"]
    }

    let u2 = {
        name: "Luis",
        username: "luisr",
        email: "luisr@gmail.com",
        favoriteGenre: ["suspense"]
    }

    let bad_u = {
        name: "Juan",
        username: "juanp",
        email: "juanp.com",
        favoriteGenre: ["drama", "suspense"]
    }

    beforeEach(async () => {
        await User.deleteMany();
        await new User(u2).save();
    })

    describe("POST /user", () => {
        test("crea un usuario", async () => {
            const r = await request(app)
            .post("/user")
            .send(u)
            .expect(201);

            expect(r.body.name).toBe(u.name);
        });

        test("crea un usuario", async () => {
            const r = await request(app)
            .post("/user")
            .send(bad_u)
            .expect(500);

        });

        test("crea un usuario", async () => {
            await request(app)
            .post("/user")
            .send(u)
            .expect(201);

            const r = await request(app)
            .post("/user")
            .send(u)
            .expect(500);

            expect(r.body.errorResponse.errmsg).include("duplicate key");
        });
    });

    describe("GET /user", () => {
        test("obtener por nombre", async () => {
            const r = await request(app)
            .get("/user?name=Luis")
            .send()
            .expect(200);

            expect(r.body[0].name).toBe(u2.name);
        });

        test("crea un usuario", async () => {
            const r = await request(app)
            .get("/user?name=Rosa")
            .send()
            .expect(404);

            // console.log(r)
            expect(r.body).toStrictEqual({});
        });
    });

    describe("GET /user", () => {
        test("obtener por nombre", async () => {
            const r = await request(app)
            .get("/user?name=Luis")
            .send()
            .expect(200);

            expect(r.body[0].name).toBe(u2.name);
        });

        test("crea un usuario", async () => {
            const r = await request(app)
            .get("/user?name=Rosa")
            .send()
            .expect(404);

            // console.log(r)
            expect(r.body).toStrictEqual({});
        });

        test("crea un usuario", async () => {
            await mongoose.connection.close();
            const r = await request(app)
            .get("/user?name=Rosa")
            .send()
            .expect(500);
            await mongoose.connect("mongodb://localhost:27017/tvshow-api")
        });
    });

    describe("PATCH /user", () => {
        test("obtener por nombre", async () => {
            const r = await request(app)
            .patch("/user?username=luisr")
            .send({
                name: "Luis Rodriguez"
            })
            .expect(200);

            expect(r.body.name).toBe("Luis Rodriguez");
        });

        test("crea un usuario", async () => {
            const r = await request(app)
            .patch("/user?username=rosaf")
            .send({
                name: "R"
            })
            .expect(404);

            // console.log(r)
            expect(r.body).toHaveProperty("error");
        });

        test("crea un usuario", async () => {
            const r = await request(app)
            .patch("/user?")
            .send({
                name: "R"
            })
            .expect(400);

            // console.log(r)
            expect(r.body).toHaveProperty("error");
        });

        test("actualiza un usuario pero da error", async () => {
            await mongoose.connection.close();
            const r = await request(app)
            .patch("/user?username=luisr")
            .send({
                name: "Luis Rodriguez"
            })
            .expect(500);
            await mongoose.connect("mongodb://localhost:27017/tvshow-api")
            
        });
        
    });

    describe("DELETE /user", () => {
        test("obtener por nombre", async () => {
            const r = await request(app)
            .delete("/user?username=luisr")
            .send()
            .expect(200);

            expect(r.body.name).toBe("Luis");
        });

        test("crea un usuario", async () => {
            const r = await request(app)
            .delete("/user?username=rosaf")
            .send()
            .expect(404);

            // console.log(r)
            expect(r.body).toHaveProperty("error");
        });

        test("crea un usuario", async () => {
            const r = await request(app)
            .delete("/user?")
            .send()
            .expect(400);

            // console.log(r)
            expect(r.body).toHaveProperty("error");
        });

        test("actualiza un usuario pero da error", async () => {
            await mongoose.connection.close();
            const r = await request(app)
            .delete("/user?username=luisr")
            .send()
            .expect(500);
            await mongoose.connect("mongodb://localhost:27017/tvshow-api") 
        });

    });
});