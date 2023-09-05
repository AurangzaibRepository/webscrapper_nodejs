const axios = require("axios");
const parser = require("../parsers/dawnnews.parser");

exports.extractData = (category) => {
  let url = process.env.DAWNNEWS_URL;

  if (category) {
    url += `/${category}`;
  }

  const promise = new Promise((resolve, reject) => {
    axios(url)
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
