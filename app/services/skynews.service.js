const axios = require("axios");
const parser = require("../parsers/skynews.parser");

exports.extractData = async (category) => {
  const url = `${process.env.SKYNEWS_URL}/${(category || "")}`;

  try {
    const response = await axios(url);
    const contents = parser.parse(response.data);
    return contents;
  } catch (error) {
    return error.message;
  }
};
