import express, { Application } from "express";
import router from "./router";
import cors from 'cors';

const app: Application = express();

app.use(cors());

app.use(express.json());   

app.use(router);

app.get('/', (req, res) => {
    res.send('Healthcheck: OK')
})

export default app;