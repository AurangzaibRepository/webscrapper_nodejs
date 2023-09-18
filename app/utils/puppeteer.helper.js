const puppeteer = require("puppeteer");

exports.initialize = async (
  options,
  url,
  callback,
) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, options);

  const contents = await callback(page);

  await browser.close();
  return contents;
};
