const axios = require("axios");
const parser = require("../parsers/arynews.parser");

exports.extractData = () => {
  const promise = new Promise((resolve, reject) => {
    axios(process.env.ARYNEWS_URL)
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
    axios(`${process.env.ARYNEWS_URL}/category/${category}`)
      .then((response) => {
        const contents = parser.parseByCategory(response.data);
        resolve(contents);
      })
      .catch((error) => {
        reject(error.message);
      });
  });

  return promise;
};
