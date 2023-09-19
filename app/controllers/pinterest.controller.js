const pinterestService = require("../services/pinterest.service");
const requestHelper = require("../utils/request.helper");

exports.get = async (req, res) => {
  try {
    const response = await pinterestService.extractData(req.params.keyword);
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

exports.getNews = async (req, res) => {
  try {
    const response = await pinterestService.extractNews();
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
