const cheerio = require("cheerio");
const formatHelper = require("../utils/formatter.helper");

exports.parse = (data) => {
  const $ = cheerio.load(data);
  const contents = [];

  $(".sdc-site-tiles__item", data).each((i, element) => {
    const headerElement = $(element).find(".sdc-site-tile__headline");

    contents.push({
      image: $(element).find(".sdc-site-tile__image").attr("src"),
      title: headerElement.text().trim(),
      url: formatHelper.formatURL(headerElement.find("a").attr("href")),
    });
  });

  return contents;
};
