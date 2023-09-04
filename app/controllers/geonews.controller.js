const geonewService = require("../services/geonews.service");
const requestHelper = require("../utils/request.helper");

exports.get = (req, res) => {
  geonewService.extractData()
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

exports.getByCategory = (req, res) => {
  geonewService.extractCategoryData(req.params.category)
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
