const puppeteer = require("../utils/puppeteer.helper");
const parser = require("../parsers/vimeo.parser");

exports.extractData = async (keyword) => {
  try {
    const url = `${process.env.VIMEO_URL}?q=${keyword}`;

    return await puppeteer.initialize("networkidle0", url, parser.parse);
  } catch (error) {
    return error.message;
  }
};
