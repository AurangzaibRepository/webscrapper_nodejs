const axios = require("axios");
const parser = require("../parsers/bbcnews.parser");

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
