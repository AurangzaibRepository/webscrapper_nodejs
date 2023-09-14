const router = require("express").Router();
const pinterest = require("../controllers/pinterest.controller");

module.exports = (app) => {
  router.get("/:keyword", pinterest.get);
  router.get("/news", pinterest.getNews);

  app.use("/api/pinterest", router);
};
