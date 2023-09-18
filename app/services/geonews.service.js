const axios = require("axios");
const parser = require("../parsers/geonews.parser");

exports.extractData = async () => {
  try {
    const response = await axios(process.env.GEONEWS_URL);
    const contents = parser.parse(response.data);
    return contents;
  } catch (error) {
    return error.message;
  }
};

exports.extractCategoryData = async (category) => {
  const url = `${process.env.GEONEWS_URL}/category/${category}`;

  try {
    const response = await axios(url);
    const contents = parser.parseByCategory(response.data);
    return contents;
  } catch (error) {
    return error.message;
  }
};
