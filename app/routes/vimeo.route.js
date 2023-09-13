const router = require("express").Router();
const vimeo = require("../controllers/vimeo.controller");

module.exports = (app) => {
  router.get("/:keyword", vimeo.get);

  app.use("/api/vimeo", router);
};
