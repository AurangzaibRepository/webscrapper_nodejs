/* eslint-disable import/no-extraneous-dependencies */
const puppeteer = require("../utils/puppeteer.helper");
const parser = require("../parsers/veoh.parser");

exports.extractData = async (keyword) => {
  try {
    let url = process.env.VEOH_URL;

    if (keyword != null) {
      url += `/find/${keyword}`;
    }

    return await puppeteer.initialize("networkidle0", url, parser.parse);
  } catch (error) {
    return error.message;
  }
};
