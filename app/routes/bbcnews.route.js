const router = require("express").Router();
const bbcnews = require("../controllers/bccnews.controller");

module.exports = (app) => {
  router.get("/", bbcnews.get);

  app.use("/api/bbcnews", router);
};
