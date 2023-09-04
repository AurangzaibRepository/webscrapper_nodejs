const router = require("express").Router();
const dawnnews = require("../controllers/dawnnews.controller");

module.exports = (app) => {
  router.get("/", dawnnews.get);

  app.use("/api/dawnnews", router);
};
