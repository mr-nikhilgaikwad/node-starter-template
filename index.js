const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const app = express();
const PORT = process.env.PORT || 5000;

//Use helmet for security
app.use(helmet());
app.use(compression());
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.send("OK");
});

app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);
});