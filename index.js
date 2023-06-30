const express = require("express");
const port = 8000;
const app = express();
const env = require("./config/environment");
const logger = require("morgan");
require("./config/view_helpers")(app);
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const { urlencoded } = require("body-parser");
const sassMiddleware = require("node-sass-middleware");
const { options } = require("./routes");
const path = require("path");

if (env.name == "development") {
  app.use(
    sassMiddleware({
      src: path.join(__dirname, env.asset_path, "scss"),
      dest: path.join(__dirname, env.asset_path, "css"),
      debug: true,
      outputStyle: "expanded",
      prefix: "/css",
    })
  );
}

// read through post requests
app.use(express.urlencoded({ extended: false }));

// use cookie-parser
app.use(cookieParser());

// use layouts before routes
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// use express router
app.use("/", require("./routes"));

// set up view engine and views
app.set("view engine", "ejs");
app.set("views", "./views");

// set up static files
app.use(express.static(env.asset_path));

app.use(logger(env.morgan.mode, env.morgan.options));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});
