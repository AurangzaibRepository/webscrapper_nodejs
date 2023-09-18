const vimeoService = require("../services/vimeo.service");
const requestHelper = require("../utils/request.helper");

exports.get = async (req, res) => {
  try {
    const response = await vimeoService.extractData(req.params.keyword);
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
