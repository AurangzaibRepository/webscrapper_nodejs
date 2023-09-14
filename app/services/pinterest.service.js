const puppeteer = require("puppeteer");
const parser = require("../parsers/pinterest.parser");

exports.extractData = async (keyword) => {
  const url = `${process.env.PINTEREST_URL}/?q=${keyword}`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle0",
    timeout: 0,
  });

  const contents = await parser.parse(page);

  await browser.close();
  return Promise.resolve(contents);
};
