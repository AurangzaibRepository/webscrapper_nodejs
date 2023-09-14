const puppeteer = require("puppeteer");
const parser = require("../parsers/dailymotion.parser");

exports.extractData = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(process.env.DAILYMOTION_URL, {
    waitUntil: "networkidle0",
    timeout: 0,
  });

  const contents = await parser.parse(page);

  await browser.close();
  return Promise.resolve(contents);
};
