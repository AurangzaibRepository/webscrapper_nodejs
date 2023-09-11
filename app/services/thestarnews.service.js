const axios = require("axios");
const parser = require("../parsers/thestarnews.parser");

exports.extractData = (category) => {
  let url = `${process.env.THESTARNEWS_URL}`;

  if (category) {
    url += `/${category}`;
  }

  const promise = new Promise((resolve, reject) => {
    axios(url)
      .then((response) => {
        const contents = (category
          ? parser.parseByCategory(response.data)
          : parser.parse(response.data)
        );
        resolve(contents);
      })
      .catch((error) => {
        reject(error.message);
      });
  });

  return promise;
};
