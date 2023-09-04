const axios = require("axios");
const parser = require("../parsers/geonews.parser");

exports.extractData = () => {
  const promise = new Promise((resolve, reject) => {
    axios(process.env.GEONEWS_URL)
      .then((response) => {
        const contents = parser.parse(response);
        resolve(contents);
      })
      .catch((error) => {
        reject(error.message);
      });
  });

  return promise;
};
