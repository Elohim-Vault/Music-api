import Music, { IMusic } from "../models/music";
import express from "express";

const musicController = express.Router();

musicController.get('/music', async (req: express.Request, res: express.Response) => {
    Music.find({}, (err, result) => {
        res.status(200).json(result);
    });
});

musicController.post('/music', async (req: express.Request, res: express.Response) => {
    Music.create(req.body).then(data => {
        return res.status(201).json(data);
    }).catch(e => {
        return res.status(400).json({ message: e.message });
    });
});

musicController.get('/music/:id', async (req: express.Request, res: express.Response) => {
    Music.findById(req.params.id).then(data => {
        return res.status(200).json(data);
    }).catch(e => {
        return res.status(404).json(`${req.params.id} was not found.`);
    });
});

musicController.put('/music/:id', async (req: express.Request, res: express.Response) => {
    Music.findOneAndUpdate({ _id: req.params.id }, req.body).then(data => {
        return res.status(200).json();
    }).catch(e => {
        return res.status(404).json(e.message);
    });
});

musicController.delete('/music/:id', async (req: express.Request, res: express.Response) => {
    Music.deleteOne({ _id: req.params.id }).then(() => {
        return res.status(200).json();
    }).catch(e => {
        return res.status(404).json(e.message);
    });
})
export default musicController;