const thestarnewsService = require("../services/thestarnews.service");
const requestHelper = require("../utils/request.helper");

exports.get = (req, res) => {
  thestarnewsService.extractData()
    .then((response) => {
      true,
      null,
      response,
    })
    .catch((error) => {
      res.send(requestHelper.getResponse(
        false,
        error,
      ));
    });
};
