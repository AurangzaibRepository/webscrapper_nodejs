const router = require("express").Router();
const dailymotion = require("../controllers/dailymotion.controller");

module.exports = (app) => {
  router.get("/", dailymotion.get);

  app.use("/api/dailymotion", router);
};
