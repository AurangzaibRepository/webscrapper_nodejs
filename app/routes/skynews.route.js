const router = require("express").Router();
const skynews = require("../controllers/skynews.controller");

module.exports = (app) => {
  router.get("/:category?", skynews.get);

  app.use("/api/skynews", router);
};
