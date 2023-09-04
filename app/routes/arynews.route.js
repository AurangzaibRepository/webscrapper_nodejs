const router = require("express").Router();
const arynews = require("../controllers/arynews.controller");

module.exports = (app) => {
  router.get("/", arynews.get);
  router.get("/:category", arynews.getByCategory);

  app.use("/api/arynews", router);
};
