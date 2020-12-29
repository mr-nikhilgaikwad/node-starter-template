//Imports
import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import bodyparser from "body-parser";
import sampleRoute from './api/sampleroutes';
import logging from './config/logging';

//Constants
const app: express.Application = express();
const PORT: number = parseInt(process.env.PORT) || 5000;
const NAMESPACE = 'Index';

//Middleware
function setMiddleware() {
    app.use((req, res, next) => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
        });
        next();
    });
    app.use(cors({
        origin: "*"
    }));
    app.use(bodyparser.urlencoded({
        extended: false
    }))
    app.use(bodyparser.json({
        limit: "50mb"
    }))
    //Use helmet for security
    app.use(helmet());
    app.use(compression());
    app.use(express.static('public'));

}
setMiddleware();

//Routes
app.use("/status", sampleRoute);

//Error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    return res.status(404).json({
        message: error.message
    });
});
app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);
});