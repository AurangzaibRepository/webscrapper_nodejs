const cheerio = require("cheerio");

exports.parse = (data) => {
  const $ = cheerio.load(data);
  const contents = [];

  $(".m_c_left ul li", data).each((i, element) => {
    const headerElement = $(element).find(".m_pic a");

    contents.push({
      title: headerElement.attr("title").trim(),
      url: headerElement.attr("href"),
      image: headerElement.find("img").attr("data-src"),
    });
  });

  return contents;
};
