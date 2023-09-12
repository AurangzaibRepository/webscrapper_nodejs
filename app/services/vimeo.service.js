const puppeteer = require("puppeteer");
const parser = require("../parsers/vimeo.parser");

exports.extractData = async (keyword) => {
  try {
    const url = `${process.env.VIMEO_URL}?q=${keyword}`;
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "load",
      timeout: 0,
    });

    const contents = await parser.parse(page);

    await browser.close();
    return Promise.resolve(contents);
  } catch (error) {
    return Promise.reject(error.message);
  }
};
