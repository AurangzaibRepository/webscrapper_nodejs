/* eslint-disable import/no-extraneous-dependencies */
const puppeteer = require("puppeteer");
const parser = require("../parsers/veoh/home.parser");

exports.extractData = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(process.env.VEOH_URL);

  const contents = await parser.parse(page);

  await browser.close();
  return Promise.resolve(contents);
};
