const router = require("express").Router();
const youtube = require("../controllers/youtube.controller");

module.exports = (app) => {
  router.get("/:keyword", youtube.get);

  app.use("/api/youtube", router);
};
