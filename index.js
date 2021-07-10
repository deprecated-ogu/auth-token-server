// require
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");

const controllers = require("./controllers");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded( { extended: false }));
app.use(
  cors({
    origin: ["https://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  })
);
app.use(cookieParser());

const PORT = process.env.PORT || 4000;

let httpsServer;

if(fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")){

  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  httpsServer = https.createServer(credentials, app);
  httpsServer.listen(PORT, () => console.log(`${PORT} server runnning`));

} else {
  httpsServer = app.listen(PORT)
}