const puppeteer = require("puppeteer");
const parser = require("../parsers/dtube.parser");

exports.extractData = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(process.env.DTUBE_URL, {
    waitUntil: "networkidle0",
  });

  const contents = await parser.parse(page);

  await browser.close();
  return Promise.resolve(contents);
};
