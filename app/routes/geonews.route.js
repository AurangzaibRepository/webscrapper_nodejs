const router = require("express").Router();
const geonews = require("../controllers/geonews.controller");

module.exports = (app) => {
  router.get("/", geonews.get);
  router.get("/:category", geonews.getByCategory);

  app.use("/api/geonews", router);
};
