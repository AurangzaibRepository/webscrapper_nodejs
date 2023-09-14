const puppeteer = require("puppeteer");
const parser = require("../parsers/youtube/home.parser");
const keywordParser = require("../parsers/youtube/keyword.parser");
const channelParser = require("../parsers/youtube/channel.parser");

exports.extractData = async (keyword) => {
  try {
    let url = process.env.YOUTUBE_URL;

    if (keyword != null) {
      url += `/results?search_query=${keyword}`;
    }

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 0,
    });

    const contents = (keyword == null
      ? await parser.parse(page)
      : await keywordParser.parse(page)
    );

    await browser.close();
    return Promise.resolve(contents);
  } catch (exception) {
    return Promise.reject(exception.message);
  }
};

exports.extractChannelData = async (channel) => {
  const url = `${process.env.YOUTUBE_URL}/${channel}`;

  const browser = await puppeteer.launch();
  const page = browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle0",
    timeout: 0,
  });

  const contents = await channelParser.parse(page);

  await browser.close();
  return Promise.resolve(contents);
};
