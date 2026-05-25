import express from "express";
import "./db/mongoose.js";
import { userRouter } from "./routers/userRouter.js";
import { tvshowRouter } from "./routers/tvshowRouter.js";
import { defaultRouter } from "./routers/default.js";

export const app = express();
app.use(express.json());
app.use(userRouter);
app.use(tvshowRouter);
app.use(defaultRouter);
