const axios = require("axios");
const parser = require("../parsers/dawnnews.parser");

exports.extractData = async (category) => {
  try {
    let url = process.env.DAWNNEWS_URL;

    if (category) {
      url += `/${category}`;
    }

    const response = await axios(url);
    const contents = parser.parse(response.data);
    return contents;
  } catch (error) {
    return error.message;
  }
};
