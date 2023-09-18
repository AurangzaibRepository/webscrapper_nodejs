const puppeteer = require("puppeteer");
const parser = require("../parsers/dtube/home.parser");
const keywordParser = require("../parsers/dtube/keyword.parser");

exports.extractData = async (keyword) => {
  try {
    let url = process.env.DTUBE_URL;

    if (keyword != null) {
      url += `/#!/s/${keyword}`;
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: 0,
    });

    const contents = (keyword == null
      ? await parser.parse(page)
      : await keywordParser.parse(page)
    );

    await browser.close();
    return contents;
  } catch (exception) {
    return exception.message;
  }
};
