const axios = require("axios");
const parser = require("../parsers/thenews.parser");

exports.extractData = async () => {
  try {
    const response = await axios(process.env.THENEWS_URL);
    const contents = parser.parse(response.data);
    return contents;
  } catch (error) {
    return error.message;
  }
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
