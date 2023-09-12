const thestarnewsService = require("../services/thestarnews.service");
const requestHelper = require("../utils/request.helper");

exports.get = (req, res) => {
  thestarnewsService.extractData()
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
  thestarnewsService.extractCategoryData(req.params.category)
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
