const path = require("path");
const express = require("express");
const hbs = require("hbs");
const weather = require("../src/utils/weather");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

// by default, as is required by 'expess' the folder has to be called 'views' and the location of this folder should be in the root of a project.
// So, in case we want to call our folder other than 'views' and if we want it to be somewhere else:
const viewsPath = path.join(__dirname, "../templates/views");
// setup 'views' location
app.set("views", viewsPath);

const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);

//setup  'handlebars' engine (hbs - is an npm package, templates for 'handlebars' - which is also an npm package)
app.set("view engine", "hbs");

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    message: "Find weather for any city",
    name: "AB",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "AB",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help page",
    message: "this is help page",
    name: "AB",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "Please, provide a search parameter" });
  }

  const city = req.query.search;

  weather(city, (error, data) => {
    // we need to check for errors first
    if (error) {
      console.log("error", error);
      return res.send({ error });
    }
    if (city) {
      return res.send({ data });
    }
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Page not found",
    message: "The requested help article cannot be found",
    name: "AB",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Page not found",
    message: "The requested page cannot be found",
    name: "AB",
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
