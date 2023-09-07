const axios = require("axios");
const parser = require("../parsers/bbc/home.parser");
const categoryParser = require("../parsers/bbc/category.parser");

exports.extractData = () => {
  const promise = new Promise((resolve, reject) => {
    axios(process.env.BBCNEWS_URL)
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

exports.extractCategoryData = (category) => {
  const promise = new Promise((resolve, reject) => {
    axios(`${process.env.BBCNEWS_URL}/news/${category}`)
      .then((response) => {
        const contents = categoryParser.parse(response);
        resolve(contents);
      })
      .catch((error) => {
        reject(error.message);
      });
  });

  return promise;
};
