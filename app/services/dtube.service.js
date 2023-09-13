const puppeteer = require("puppeteer");
const parser = require("../parsers/dtube/home.parser");
const keywordParser = require("../parsers/dtube/keyword.parser");

exports.extractData = async (keyword) => {
  let url = process.env.DTUBE_URL;

  if (keyword != null) {
    url += `/#!/s/${keyword}`;
  }

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle0",
  });

  const contents = (keyword == null
    ? await parser.parse(page)
    : await keywordParser.parse(page)
  );

  await browser.close();
  return Promise.resolve(contents);
};
