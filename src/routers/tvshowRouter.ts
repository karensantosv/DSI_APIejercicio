import express from "express";
import { User } from "../models/userSchema.js";
import { TvShow } from "../models/tvshowSchema.js";

export const tvshowRouter = express.Router();

tvshowRouter.post("/series", async (req, res) => {
  const tvshow = new TvShow(req.body);
  try {
    const users = tvshow.users;

    for (let i: number = 0; i < users.length; i++) {
        const r = await User.findById(users[i]);
        if (!r) return res.status(400).send();
    }

    const response = await tvshow.save();
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
})

tvshowRouter.delete("/series/:id", async (req, res) => {
  try {
    const r = await TvShow.findByIdAndDelete(req.params.id);

    if (!r) return res.status(400).send("error")

    res.status(200).send(r);

  } catch (error) {
    res.status(500).send(error);
  }
});

tvshowRouter.get("/series/:id", async (req, res) => {
    try {
        const result = await TvShow.findById(req.params.id).populate({path: "users"});
        if (!result) {
            return res.status(404).send();
        }
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err);
    }
})

tvshowRouter.patch("/series/:id", async (req, res) => {
    try {
        const users = req.body.users;
        if (users) {
            for (let i: number = 0; i < users.length; i++) {
                const j = await User.findById(users[i])
                if (!j) return res.status(404).send("badrequest")
            }
        }
        const result = await TvShow.findByIdAndUpdate(req.params.id, req.body);
        if (!result) {
            return res.status(404).send();
        }
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err);
    }
})