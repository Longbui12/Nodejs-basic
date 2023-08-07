import express from "express";
import configViewEngine from "./configs/viewengine";
import initWebRoute from "./route/web";
import initAPIRoute from "./route/api";

//import connection from "./configs/connectDB";

require("dotenv").config();
var morgan = require("morgan");

const app = express();
const port = process.env.PORT || 8080;

// Create a middleware
app.use((req, res, next) => {
  // check => return res.send()
  console.log(" //// run into my middleware : ");
  console.log(req.method);
  next();
});
// ======================= //

// dung morgan de check log server gui ve
app.use(morgan("combined"));
//=====================================//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up view engine
configViewEngine(app);

// init web route
initWebRoute(app);

// init API route
initAPIRoute(app);

// handle 404 not found
app.use((req, res) => {
  return res.render("404.ejs");
});

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
