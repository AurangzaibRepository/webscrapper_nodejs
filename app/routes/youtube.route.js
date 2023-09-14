const router = require("express").Router();
const youtube = require("../controllers/youtube.controller");

module.exports = (app) => {
  router.get("/:keyword?", youtube.get);
  router.get("/channel/:channel", youtube.getByChannel);

  app.use("/api/youtube", router);
};
