const thestarnewsService = require("../services/thestarnews.service");
const requestHelper = require("../utils/request.helper");

exports.get = async (req, res) => {
  try {
    const response = await thestarnewsService.extractData();
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

exports.getByCategory = async (req, res) => {
  try {
    const response = await thestarnewsService.extractCategoryData(req.params.category);
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
