/* eslint-disable import/no-extraneous-dependencies */
const puppeteer = require("puppeteer");
const parser = require("../parsers/veoh/home.parser");

exports.extractData = async (keyword) => {
  let url = process.env.VEOH_URL;
  if (keyword != null) {
    url += `/find/${keyword}`;
  }

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  const contents = (keyword == null
    ? await parser.parse(page)
    : await parser.parseByCategory(page)
  );

  await browser.close();
  return Promise.resolve(contents);
};
