//Imports
import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import bodyparser from "body-parser";
import morgan from 'morgan';
import sampleRoute from './api/statusroute';
import logging from './config/logging';
const environment = require('./environment.json');

//Constants
const app: express.Application = express();
const PORT: number = parseInt(process.env.PORT) || 5000;
const NAMESPACE = 'Index';

//Middleware
function setMiddleware() {
    //Log each request
    app.use((req, res, next) => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
        });
        next();
    });
    //Enable cors
    const whitelistdomains = environment.whitelistdomains;
    var corsOptions = {
        origin: function (origin, callback) {
            if (whitelistdomains.indexOf(origin) !== -1 || !origin) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        methods: 'GET,PUT,POST,DELETE,PATCH',
        allowedHeaders: 'Content-Type,Authorization,Accept',
        optionsSuccessStatus: 204
    }
    app.use(cors(corsOptions));
    app.use(bodyparser.urlencoded({
        extended: false
    }))
    app.use(bodyparser.json({
        limit: "50mb"
    }))
    //Use helmet for security to set various http headers
    app.use(helmet());
    app.use(compression());
    //HTTP request logger middle ware
    app.use(morgan('dev'))
    app.use(express.static('public'));

}
setMiddleware();

//Routes
app.use("/status", sampleRoute);

//Error handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message
    });
});

//Server setup
app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);
});