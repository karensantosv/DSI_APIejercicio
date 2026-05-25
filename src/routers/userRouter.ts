import express from "express";
import { User } from "../models/userSchema.js";
import { TvShow } from "../models/tvshowSchema.js";

export const userRouter = express.Router();

userRouter.post("/user", async (req, res) => {
    const user = new User(req.body);
    try {
        const r = await user.save();
        res.status(201).send(r);
    } catch (err) {
        res.status(500).send(err);
    }
})

// userRouter.post("/user", (req, res) => {
//     const user = new User(req.body);
    
//     user.save()
//     .then(k => {
//         res.status(201).send(k);
//     })
//     .catch(err => {
//         res.status(500).send(err)
//     })
// })

userRouter.get("/user", async (req, res) => {
    const { name } = req.query;

    try {
        const filter: any = {};
        if (name) filter.name = name;

        const result = await User.find(filter);

        if (!result || result.length === 0) return res.status(404).send("notfound")

        res.status(200).send(result);

    } catch (err) {
        res.status(500).send(err);
    }
})

userRouter.patch("/user", async (req, res) => {
    if (!req.query.username) {
        res.status(400).send({error: 'A username must be provided in the query string'});
    } else if (!req.body) {
        res.status(400).send({ error: 'Fields to be modified have to be provided in the request body'});
    } else {

      try {
        const r = await User.findOneAndUpdate({username: req.query.username.toString()}, req.body, {
        returnDocument: 'after',
        runValidators: true,
      })
      if (!r) {
          res.status(404).send({
            error: "Note not found"
          });
        } else {
          res.send(r);
        }

      } catch (error){
        res.status(500).send(error);
      }
    }
})

userRouter.delete("/user", async (req, res) => {
    if (!req.query.username) { res.status(400).send({ error: 'A username must be provided',});
    } else {
        try {
            const r = await User.findOne( {username: req.query.username.toString() });
            if (!r) {
                res.status(404).send({
                error: "Note not found"
                });
            } else {
                const r_id = r._id;
                await TvShow.updateMany({users: r._id}, { $pull: { users: r._id}});

                const tv = await TvShow.find( {users: r._id });

                for (let i: number = 0; i < tv.length; i++) {
                    tv[i].users = tv[i].users.filter(id => id !== r._id)
                    await tv[i].save()
                }

                const result = await User.findOneAndDelete( {username: req.query.username.toString() });
                res.status(200).send(result);
            }
        } catch (err) {
            res.status(500).send();
        }
    
    }
})