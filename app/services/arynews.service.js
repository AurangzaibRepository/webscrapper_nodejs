const axios = require("axios");
const parser = require("../parsers/arynews.parser");

exports.extractData = async () => {
  try {
    const response = await axios(process.env.ARYNEWS_URL);
    const contents = parser.parse(response.data);
    return contents;
  } catch (error) {
    return error.message;
  }
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
