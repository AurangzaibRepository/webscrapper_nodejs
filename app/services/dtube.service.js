const puppeteer = require("../utils/puppeteer.helper");
const parser = require("../parsers/dtube/home.parser");
const keywordParser = require("../parsers/dtube/keyword.parser");

exports.extractData = async (keyword) => {
  try {
    let url = process.env.DTUBE_URL;
    let callback = parser.parse;

    if (keyword != null) {
      url += `/#!/s/${keyword}`;
      callback = keywordParser.parse;
    }

    return await puppeteer.initialize("networkidle0", url, callback);
  } catch (exception) {
    return exception.message;
  }
};
