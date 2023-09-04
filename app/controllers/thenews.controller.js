const thenewsService = require("../services/thenews.service");
const requestHelper = require("../utils/request.helper");

exports.get = (req, res) => {
  thenewsService.extractData()
    .then((response) => {
      req.send(requestHelper.getResponse(
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
