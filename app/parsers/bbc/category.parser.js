const cheerio = require("cheerio");

exports.parse = (data) => {
  const $ = cheerio.load(data);
  const contents = [];

  $(".nw-c-seven-slice", data).each((index, element) => {
    $(element).find(".gel-layout__item").each((i, liElement) => {
      const headerElement = $(liElement).find(".gs-c-promo-heading");

      contents.push({
        title: headerElement.text().trim(),
        summary: $(element).find(".gs-c-promo-summary").text().trim(),
        url: headerElement.attr("href"),
        tagInfo: {
          name: $(element).find(".gs-c-section-link").text().trim(),
          url: $(element).find(".gs-c-section-link").attr("href"),
        },
      });
    });
  });

  return contents;
};
