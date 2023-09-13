const router = require("express").Router();
const youtube = require("../controllers/youtube.controller");

module.exports = (app) => {
  router.get("/", youtube.get);

  app.use("/api/youtube", router);
};
