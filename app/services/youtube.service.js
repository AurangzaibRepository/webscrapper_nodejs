const puppeteer = require("../utils/puppeteer.helper");
const parser = require("../parsers/youtube/home.parser");
const keywordParser = require("../parsers/youtube/keyword.parser");
const channelParser = require("../parsers/youtube/channel.parser");

exports.extractData = async (keyword) => {
  try {
    let url = process.env.YOUTUBE_URL;
    let callback = parser.parse;

    if (keyword != null) {
      url += `/results?search_query=${keyword}`;
      callback = keywordParser.parse;
    }

    return await puppeteer.initialize("networkidle0", url, callback);
  } catch (exception) {
    return exception.message;
  }
};

exports.extractChannelData = async (channel) => {
  try {
    const url = `${process.env.YOUTUBE_URL}/${channel}`;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 0,
    });

    const contents = await channelParser.parse(page);

    await browser.close();
    return contents;
  } catch (exception) {
    return exception.message;
  }
};
