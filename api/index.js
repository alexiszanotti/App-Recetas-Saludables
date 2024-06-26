const express = require("express");
const cors = require("cors");
require("dotenv").config();
const routerAuth = require("./src/routes/auth.js");
const routerRecipes = require("./src/routes/recipes.js");
const { dbConnection } = require("./src/database/config");

const app = express();

//Connect db
dbConnection();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", routerAuth);
app.use("/api/recipes", routerRecipes);

app.listen(process.env.PORT, () => {
  console.log(`Server listen in port ${process.env.PORT}`);
});

module.exports = app;
