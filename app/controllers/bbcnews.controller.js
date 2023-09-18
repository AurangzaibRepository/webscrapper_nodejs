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

exports.getByCategory = async (req, res) => {
  try {
    const response = await bbcnewsService.extractCategoryData(req.params.category);
    res.send(requestHelper.getResponse(
      true,
      null,
      response,
    ));
  } catch (error) {
    res.send(requestHelper.getResponse(
      false,
      error,
    ));
  }
};
