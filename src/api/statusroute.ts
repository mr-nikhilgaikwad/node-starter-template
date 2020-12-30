import express from 'express';
import StatusService from '../services/statusservice';

const router = express.Router();

router.get("/", (req: express.Request, res: express.Response) => {
    const response: string = StatusService.getStatus();
    res.status(200).send(response);
});

router.post("/", (req: express.Request, res: express.Response) => {
    const response: string = StatusService.postStatus();
    res.status(200).send(response);
});

router.put("/", (req: express.Request, res: express.Response) => {
    const response: string = StatusService.putStatus();
    res.status(200).send(response);
});

router.delete("/", (req: express.Request, res: express.Response) => {
    const response: string = StatusService.deleteStatus();
    res.status(200).send(response);
});

export = router;