const pinterestService = require("../services/pinterest.service");
const requestHelper = require("../utils/request.helper");

exports.get = (req, res) => {
  pinterestService.extractData(req.params.keyword)
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

exports.getNews = (req, res) => {
  pinterestService.extractNews()
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
