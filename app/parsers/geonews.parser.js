const cheerio = require("cheerio");

function parseContents(selector, data) {
  const $ = cheerio.load(data);
  const contents = [];

  $(selector, data).each((i, element) => {
    const headerElement = $(element).find(".m_pic a");

    contents.push({
      title: headerElement.attr("title").trim(),
      url: headerElement.attr("href"),
      image: headerElement.find("img").attr("data-src"),
    });
  });

  return contents;
}

exports.parse = (data) => {
  const contents = [];

  contents.push(parseContents(".m_c_left ul li", data));
  contents.push(parseContents(".m_c_right ul li", data));

  return contents;
};
