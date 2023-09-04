const cheerio = require("cheerio");

function parseNews(data) {
  const $ = cheerio.load(data);
  const contents = [];

  $(".td-module-container.td-category-pos-", data).each((i, element) => {
    const headerElement = $(element).find(".entry-title");

    contents.push({
      image: $(element).find(".entry-thumb").attr("data-img-url"),
      title: headerElement.text(),
      url: headerElement.find("a").attr("href"),
    });
  });

  return contents;
}

function parseHotNews(data) {
  const $ = cheerio.load(data);
  const contents = [];

  $(".mobilevid", data).each((i, element) => {
    contents.push({
      image: $(element).find("img").attr("src"),
      title: $(element).find(".card-title").text(),
      url: $(element).find("a").attr("href"),
    });
  });

  return contents;
}

exports.parse = (data) => {
  const contents = {
    news: parseNews(data),
    hotshots: parseHotNews(data),
  };

  return contents;
};

exports.parseByCategory = (data) => {
  const contents = [];
  const $ = cheerio.load(data);

  $(".td-category-pos-above", data).each((i, element) => {
    const headerElement = $(element).find(".entry-title");

    contents.push({
      image: $(element).find(".td-image-container .entry-thumb").attr("data-img-url"),
      title: headerElement.text(),
      url: headerElement.find("a").attr("href"),
    });
  });

  return contents;
};
