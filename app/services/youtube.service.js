const axios = require("axios");
const parser = require("../parsers/youtube.parser");

exports.extractData = (keyword) => {
  const url = `${process.env.YOUTUBE_URL}?search=${keyword}`;

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
