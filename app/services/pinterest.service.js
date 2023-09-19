const puppeteer = require("../utils/puppeteer.helper");
const parser = require("../parsers/pinterest/home.parser");
const newsParser = require("../parsers/pinterest/news.parser");

exports.extractData = async (keyword) => {
  try {
    const url = `${process.env.PINTEREST_URL}/search/pins/?q=${keyword}`;

    return await puppeteer.initialize("networkidle0", url, parser.parse);
  } catch (exception) {
    return exception.message;
  }
};

exports.extractNews = async () => {
  try {
    const url = `${process.env.PINTERESTNEWS_URL}/en/news`;

    return await puppeteer.initialize("networkidle0", url, newsParser.parse);
  } catch (error) {
    return error.message;
  }
};
