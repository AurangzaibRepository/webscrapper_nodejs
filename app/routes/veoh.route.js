const router = require("express").Router();
const veoh = require("../controllers/veoh.controller");

module.exports = (app) => {
  router.get("/", veoh.get);
  router.get("/:keyword", veoh.getByCategory);

  app.use("/api/veoh", router);
};
