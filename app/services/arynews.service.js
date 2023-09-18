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

exports.extractCategoryData = async (category) => {
  try {
    const url = `${process.env.ARYNEWS_URL}/category/${category}`;
    const response = await axios(url);
    const contents = parser.parseByCategory(response.data);
    return contents;
  } catch (error) {
    return error.message;
  }
};
