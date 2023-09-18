const arynewsService = require("../services/arynews.service");
const requestHelper = require("../utils/request.helper");

exports.get = (req, res) => {
  arynewsService.extractData()
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
  arynewsService.extractCategoryData(req.params.category)
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
