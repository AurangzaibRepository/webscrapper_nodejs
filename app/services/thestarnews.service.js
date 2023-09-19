/* eslint-disable import/no-extraneous-dependencies */
const axios = require("axios");
const puppeteer = require("../utils/puppeteer.helper");
const parser = require("../parsers/thestarnews/home.parser");
const categoryParser = require("../parsers/thestarnews/category.parser");

exports.extractData = async () => {
  try {
    const response = await axios(process.env.THESTARNEWS_URL);
    const contents = parser.parse(response.data);
    return contents;
  } catch (error) {
    return error.message;
  }
};

exports.extractCategoryData = async (category) => {
  try {
    const url = `${process.env.THESTARNEWS_URL}/${category}`;

    return puppeteer.initialize("domcontentloaded", url, categoryParser.parse);
  } catch (error) {
    return error.message;
  }
};
