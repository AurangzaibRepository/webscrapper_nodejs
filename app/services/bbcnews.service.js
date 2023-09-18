const axios = require("axios");
const parser = require("../parsers/bbc/home.parser");
const categoryParser = require("../parsers/bbc/category.parser");

exports.extractData = async () => {
  try {
    const response = await axios(process.env.BBCNEWS_URL);
    const contents = parser.parse(response.data);
    return contents;
  } catch (error) {
    return error.message;
  }
};

exports.extractCategoryData = async (category) => {
  try {
    const url = `${process.env.BBCNEWS_URL}/news/${category}`;
    const response = await axios(url);
    const contents = categoryParser.parse(response.data);
    return contents;
  } catch (error) {
    return error.message;
  }
};
