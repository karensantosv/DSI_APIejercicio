import { describe, test, expect, beforeEach } from 'vitest';
import request from "supertest";
import { app } from "../src/app.js";
import { userRouter } from "../src/routers/userRouter.js";
import { User } from "../src/models/userSchema.js"
import { tvshowRouter } from "../src/routers/tvshowRouter.js";
import { TvShow } from "../src/models/tvshowSchema.js"
import mongoose from 'mongoose';

describe("test /user", () => {

    let tv = {
        name: "offCampus",
        sinopsis: "Serie tv",
        year: 2026,
        lastSeasonYear: 2026,
        seasonNumber: 1,
        averageDuration: 50,
        numEpisodesperSeason: [{
            nameSeason: "season1",
            numberEpisodes: 8
        }],
        cast: ["ella", "brandon"],
        direction: ["steven"],
        genre: ["drama"],
    }

    let tv2 = {
        name: "offCampus",
        sinopsis: "Serie tv",
        year: 2026,
        lastSeasonYear: 2026,
        seasonNumber: 1,
        averageDuration: 50,
        numEpisodesperSeason: [{
            nameSeason: "season1",
            numberEpisodes: 8
        }],
        cast: ["ella", "brandon"],
        direction: ["steven"],
        genre: ["drama"],

    }

    let bad_tv = {
        name: "offCampus",
        sinopsis: "Serie tv",
        year: 2026,
        lastSeasonYear: 2026,
        seasonNumber: 1,
        averageDuration: 50,
        numEpisodesperSeason: [{
            nameSeason: "season1",
            numberEpisodes: 8
        }],
        cast: ["ella", "brandon"],
        direction: ["steven"],
        genre: ["drama"],
        users: ["6a14ae1afc740491e1976840"]
    }

    let u = {
        name: "Juan",
        username: "juanp",
        email: "juanp@gmail.com",
        favoriteGenre: ["drama", "suspense"]
    }

    let idTv: any;

    beforeEach(async () => {
        await User.deleteMany();
        await TvShow.deleteMany();
        const r = await new User(u).save();
        console.log(r._id)
        const t = await new TvShow({
            ...tv,
            users: [r._id]
        }).save();
        idTv = t._id;
    })

    describe("POST /series", () => {
        test("crea un tvshow", async () => {
            const r = await request(app)
            .post("/series")
            .send(tv2)
            .expect(201)
            // console.log(r.body)
            expect(r.body.name).toBe(tv2.name);
        });

        test("crea un tvshow", async () => {
            await mongoose.connection.close();
            const r = await request(app)
            .post("/series")
            .send(tv2)
            .expect(500)
            // console.log(r.body)
            await mongoose.connect("mongodb://localhost:27017/tvshow-api")
        });

        test("crea un tvshow", async () => {
            const r = await request(app)
            .post("/series")
            .send(bad_tv)
            .expect(400)

            expect(r.body).toStrictEqual({});
        });
    });

    describe("GET /series", () => {
        test("crea un tvshow", async () => {
            const r = await request(app)
            .get("/series/invalid")
            .send()
            .expect(500)
            // console.log(r.body)
        });

        test("crea un tvshow", async () => {
            const r = await request(app)
            .get(`/series/${idTv}`)
            .send(bad_tv)
            .expect(200)

            expect(r.body.name).toBe(tv.name);
        });

        test("crea un tvshow", async () => {
            const r = await request(app)
            .get(`/series/6a14ae1afc740491e1976840`)
            .send(bad_tv)
            .expect(404)

        });
    });

    describe("PATCH /series", () => {
        test("crea un tvshow", async () => {
            const r = await request(app)
            .patch("/series/invalid")
            .send({
                name: "Off CAMPUS"
            })
            .expect(500)
            // console.log(r.body)
        });

        test("crea un tvshow", async () => {
            const r = await request(app)
            .patch(`/series/${idTv}`)
            .send({
                name: "Off CAMPUS"
            })
            .expect(200)
            // console.log(r.body)
        });
    });

    describe("DELETE /series", () => {
        test("crea un tvshow", async () => {
            const r = await request(app)
            .delete("/series/invalid")
            .send()
            .expect(500)
            // console.log(r.body)
        });

        test("crea un tvshow", async () => {
            const r = await request(app)
            .delete(`/series/${idTv}`)
            .send()
            .expect(200)
            // console.log(r.body)
        });
    });
});