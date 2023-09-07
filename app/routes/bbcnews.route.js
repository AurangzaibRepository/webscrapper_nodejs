const router = require("express").Router();
const bbcnews = require("../controllers/bbcnews.controller");

module.exports = (app) => {
  router.get("/", bbcnews.get);
  router.get("/:category", bbcnews.getByCategory);

  app.use("/api/bbcnews", router);
};
