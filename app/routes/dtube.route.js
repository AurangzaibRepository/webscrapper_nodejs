const router = require("express").Router();
const dtube = require("../controllers/dtube.controller");

module.exports = (app) => {
  router.get("/", dtube.get);

  app.use("/api/dtube", router);
};
