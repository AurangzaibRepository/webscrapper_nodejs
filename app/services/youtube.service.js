const puppeteer = require("puppeteer");
const parser = require("../parsers/youtube.parser");

exports.extractData = async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(process.env.YOUTUBE_URL, {
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
