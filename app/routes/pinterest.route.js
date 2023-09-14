const router = require("express").Router();
const pinterest = require("../controllers/pinterest.controller");

module.exports = (app) => {
  router.get("/news", pinterest.getNews);
  router.get("/:keyword", pinterest.get);

  app.use("/api/pinterest", router);
};
