const router = require("express").Router();
const thenews = require("../controllers/thenews.controller");

module.exports = (app) => {
  router.get("/", thenews.get);
  router.get("/:category", thenews.getByCategory);

  app.use("/api/thenews", router);
};
