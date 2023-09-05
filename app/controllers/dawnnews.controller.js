const dawnnewsService = require("../services/dawnnews.service");
const requestHelper = require("../utils/request.helper");

exports.get = (req, res) => {
  dawnnewsService.extractData()
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
  dawnnewsService.extractData(req.params.category)
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
