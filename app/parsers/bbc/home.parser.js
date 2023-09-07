const cheerio = require("cheerio");

function parseUrl(url, section) {
  const revisedUrl = (section != null ? `${process.env.BBCNEWS_URL}${url}` : url);

  return revisedUrl;
}

function createTags(name, url) {
  return {
    name,
    url: `${process.env.BBCNEWS_URL}${url}`,
  };
}

function parseSectionContents(data, rootElement, section = null) {
  const $ = cheerio.load(data);
  const contents = [];

  $(`${rootElement} .media-list li`, data).each((index, element) => {
    const headerElement = $(element).find(".media__title .media__link");

    contents.push({
      title: headerElement.text().trim(),
      summary: $(element).find(".media__summary").text().trim(),
      url: parseUrl(headerElement.attr("href"), section),
      tagInfo: createTags(
        $(element).find(".media__tag").text().trim(),
        $(element).find(".media__tag").attr("href")
      ),
    });
  });

  return contents;
}

exports.parse = (data) => {
  const contents = {
    promo: parseSectionContents(data, ".module--promo"),
    news: parseSectionContents(data, ".module--news", "news"),
    sports: parseSectionContents(data, ".module--sport", "sport"),
  };

  return contents;
};
