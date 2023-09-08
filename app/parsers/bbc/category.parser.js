const cheerio = require("cheerio");

function createTags(name, url) {
  return {
    name,
    url: `${process.env.BBCNEWS_URL}/${url}`,
  };
}

exports.parse = (data) => {
  const $ = cheerio.load(data);
  const contents = [];

  $(".advert-page .gel-layout__item", data).each((index, element) => {
    const headerElement = $(element).find(".gs-c-promo-heading");

    contents.push({
      title: headerElement.find(".gs-c-promo-heading__title").text().trim(),
      summary: $(element).find(".gs-c-promo-summary").text().trim(),
      url: `${process.env.BBCNEWS_URL}/${headerElement.attr("href")}`,
      tagInfo: createTags(
        $(element).find(".gs-c-section-link").text().trim(),
        $(element).find(".gs-c-section-link").attr("href"),
      ),
    });
  });

  return contents;
};
