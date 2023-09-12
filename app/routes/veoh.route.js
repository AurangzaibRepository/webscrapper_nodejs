const router = require("express").Router();
const veoh = require("../controllers/veoh.controller");

module.exports = (app) => {
  router.get("/:keyword?", veoh.get);

  app.use("/api/veoh", router);
};
