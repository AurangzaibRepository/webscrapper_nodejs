const axios = require("axios");
const parser = require("../parsers/skynews.parser");

exports.extractData = (category) => {
  const url = `${process.env.SKYNEWS_URL}/${(category || "")}`;

  const response = new Promise((resolve, reject) => {
    axios(url)
      .then((data) => {
        const contents = parser.parse(data.data);
        resolve(contents);
      })
      .catch((error) => {
        reject(error.message);
      });
  });

  return response;
};
