const bbcnewsService = require("../services/bbcnews.service");
const requestHelper = require("../utils/request.helper");

exports.get = async (req, res) => {
  try {
    const response = await bbcnewsService.extractData();
    res.send(requestHelper.getResponse(
      true,
      false,
      response,
    ));
  } catch (error) {
    res.send(requestHelper.getResponse(
      false,
      error,
    ));
  }
};

exports.getByCategory = (req, res) => {
  bbcnewsService.extractCategoryData(req.params.category)
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
