const router = require("express").Router();
const geonews = require("../controllers/geonews.controller");

module.exports = (app) => {
  router.get("/", geonews.get);

  app.use("/api/geonews", router);
};
