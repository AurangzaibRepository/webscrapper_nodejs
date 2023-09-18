const puppeteer = require("puppeteer");
const parser = require("../parsers/pinterest/home.parser");
const newsParser = require("../parsers/pinterest/news.parser");

exports.extractData = async (keyword) => {
  try {
    const url = `${process.env.PINTEREST_URL}/search/pins/?q=${keyword}`;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 0,
    });

    const contents = await parser.parse(page);

    await browser.close();
    return Promise.resolve(contents);
  } catch (exception) {
    return Promise.reject(exception.message);
  }
};

exports.extractNews = async () => {
  const url = `${process.env.PINTERESTNEWS_URL}/en/news`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle0",
    timeout: 0,
  });

  const contents = await newsParser.parse(page);

  await browser.close();
  return Promise.resolve(contents);
};
