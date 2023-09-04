const thenewsService = require("../services/thenews.service");
const requestHelper = require("../utils/request.helper");

exports.get = (req, res) => {
  thenewsService.extractData()
    .then((response) => {
      res.send(requestHelper.getResponse(
        true,
        null,
        response,
      ));
    })
    .catch((error) => {
      res.send(requestHelper.getResponse(
        true,
        error,
      ));
    });
};

exports.getByCategory = (req, res) => {
  thenewsService.extractCategoryData(req.params.category)
    .then((response) => {
      res.send(requestHelper.getResponse(
        true,
        null,
        response,
      ));
    })
    .catch((error) => {
      res.send(requestHelper.getResponse(
        false,
        error,
      ));
    });
};
