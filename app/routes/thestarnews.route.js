const router = require("express").Router();
const thestarnews = require("../controllers/thestarnews.controller");

module.exports = (app) => {
  router.get("/:category?", thestarnews.get);

  app.use("/api/thestarnews", router);
};
