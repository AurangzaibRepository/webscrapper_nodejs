const router = require("express").Router();
const veoh = require("../controllers/veoh.controller");

module.exports = (app) => {
  router.get("/", veoh.get);

  app.use("/api/veoh", router);
};
