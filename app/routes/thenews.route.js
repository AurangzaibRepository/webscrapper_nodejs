const router = require("express").Router();
const thenews = require("../controllers/thenews.controller");

module.exports = (app) => {
  router.get("/", thenews.get);

  app.use("/api/thenews", router);
};
