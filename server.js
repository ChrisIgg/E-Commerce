const express = require("express");
const routes = require("./routes");
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

// ----------------------------------
// const express = require("express");
// const path = require("path");
// const { env } = require("process");
// const { clog } = require("./middlewares/clog");
// const sequelize = require("./config/connection");
// const mysql = require("mysql2");

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// sequelize.sync().then(() => {
//   app.listen(PORT, () => console.log("Now listening"));
// });
