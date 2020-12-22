const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const bodyparser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;

//Use helmet for security
app.use(cors({
    origin: "*"
}));
app.use(bodyparser.json({
    limit: "50mb"
}))
app.use(helmet());
app.use(compression());
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.send("OK");
});

app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);
});