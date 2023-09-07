const cheerio = require("cheerio");

exports.parse = (data) => {
  const $ = cheerio.load(data);
  const contents = [];

  $(".module--promo .media-list li", data).each((index, element) => {
    const headerElement = $(".media__title a");

    contents.push({
      title: headerElement.text().trim(),
      url: headerElement.attr("href"),
      image: $(element).find(".media__image img").attr("src"),
    });
  });

  return contents;
};
