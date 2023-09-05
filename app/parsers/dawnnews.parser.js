const cheerio = require("cheerio");

exports.parse = (data) => {
  const $ = cheerio.load(data);
  const contents = [];

  $(".w-full article", data).each((index, element) => {
    const headerElement = $(element).find(".story__link");

    contents.push({
      title: headerElement.text(),
      url: headerElement.attr("href"),
      image: $(element).find("img").attr("src"),
    });
  });

  return contents;
};
