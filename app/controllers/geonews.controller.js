const geonewService = require("../services/geonews.service");
const requestHelper = require("../utils/request.helper");

exports.get = (req, res) => {
  geonewService.extractData()
    .then((response) => {
      requestHelper.getResponse(
        true,
        null,
        response,
      );
    })
    .catch((error) => {
      requestHelper.getResponse(
        false,
        error.message,
      );
    });
};
