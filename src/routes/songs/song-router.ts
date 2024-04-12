import express from "express";

const songRouter = express.Router();

songRouter.get("/hello", (req, res) => {
    res.send("Hellooo");
})


export default songRouter;