const puppeteer = require("../utils/puppeteer.helper");
const parser = require("../parsers/dailymotion.parser");

exports.extractData = async () => {
  try {
    return await puppeteer.initialize(process.env.DAILYMOTION_URL, parser.parse);
  } catch (error) {
    return error.message;
  }
};
