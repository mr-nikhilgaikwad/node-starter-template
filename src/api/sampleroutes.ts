import express from 'express';

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).send("API is up and running...");
});

router.post("/", (req: express.Request, res: express.Response) => {
    res.status(200).send("Sample POST call...");
});

router.put("/", (req: express.Request, res: express.Response) => {
    res.status(200).send("Sample PUT call...");
});

router.delete("/", (req: express.Request, res: express.Response) => {
    res.status(200).send("Sample DELETE call...");
});

export = router;