const axios = require("axios");
const parser = require("../parsers/thenews.parser");

exports.extractData = () => {
  const promise = new Promise((resolve, reject) => {
    axios(process.env.THENEWS_URL)
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
  const url = `${process.env.THENEWS_URL}/latest/category/${category}`;

  const promise = new Promise((resolve, reject) => {
    axios(url)
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
