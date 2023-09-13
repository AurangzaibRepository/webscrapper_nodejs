const router = require("express").Router();
const dtube = require("../controllers/dtube.controller");

module.exports = (app) => {
  router.get("/:keyword?", dtube.get);

  app.use("/api/dtube", router);
};
