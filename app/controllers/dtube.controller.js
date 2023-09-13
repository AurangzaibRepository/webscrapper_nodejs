const dtubeService = require("../services/dtube.service");
const requestHelper = require("../utils/request.helper");

exports.get = (req, res) => {
  dtubeService.extractData()
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
