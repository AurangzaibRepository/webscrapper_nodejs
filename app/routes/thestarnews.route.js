const router = require("express").Router();
const thestarnews = require("../controllers/thestarnews.controller");

module.exports = (app) => {
  router.get("/", thestarnews.get);
  router.get("/:category", thestarnews.getByCategory);

  app.use("/api/thestarnews", router);
};
