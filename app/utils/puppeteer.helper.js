const puppeteer = require("puppeteer");

exports.initialize = async (
  url,
  callback,
) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle0",
    timeout: 0,
  });

  const contents = await callback(page);

  await browser.close();
  return contents;
};
