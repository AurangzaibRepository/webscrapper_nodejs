/* eslint-disable import/no-extraneous-dependencies */
const puppeteer = require("puppeteer");
const parser = require("../parsers/veoh.parser");

exports.extractData = async (keyword) => {
  try {
    let url = process.env.VEOH_URL;
    if (keyword != null) {
      url += `/find/${keyword}`;
    }

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);

    const contents = await parser.parse(page);

    await browser.close();
    return contents;
  } catch (error) {
    return error.message;
  }
};
