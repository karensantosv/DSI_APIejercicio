import express from "express";
import "./db/mongoose.js";
import { Trail } from "./models/traildocument.js";
import { defaultRouter } from "./routers/default.js";
import { trailRoute } from "./routers/trailRouter.js"

export const app = express();

app.use(express.json());

app.use(trailRoute);
app.use(defaultRouter);