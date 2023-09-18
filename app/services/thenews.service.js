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

exports.extractCategoryData = async (category) => {
  const url = `${process.env.THENEWS_URL}/latest/category/${category}`;

  try {
    const response = await axios(url);
    const contents = parser.parseByCategory(response.data);
    return contents;
  } catch (error) {
    return error.message;
  }
};
