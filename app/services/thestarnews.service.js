/* eslint-disable import/no-extraneous-dependencies */
const axios = require("axios");
const puppeteer = require("puppeteer");
const parser = require("../parsers/thestarnews/home.parser");
const categoryParser = require("../parsers/thestarnews/category.parser");

exports.extractData = () => {
  const promise = new Promise((resolve, reject) => {
    axios(process.env.THESTARNEWS_URL)
      .then((response) => {
        const contents = parser.parse(response.data);
        resolve(contents);
      })
      .catch((error) => {
        reject(error.message);
      });
  });

  return promise;
};

exports.extractCategoryData = async (category) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${process.env.THESTARNEWS_URL}/${category}`, {
      waitUntil: "domcontentloaded",
    });

    const contents = await categoryParser.parse(page);
    await browser.close();
    return Promise.resolve(contents);
  } catch (error) {
    return Promise.reject(error.message);
  }
};
