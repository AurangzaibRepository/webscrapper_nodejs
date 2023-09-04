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

function parseCategoryContens(data) {
  const $ = cheerio.load(data);
  const contents = [];

  const baseElement = $(".FirstBlock");
  contents.push({
    title: baseElement.find(".entry-title a").attr("title").trim(),
    url: baseElement.find(".entry-title a").attr("href"),
    image: baseElement.find(".pic img").attr("src"),
  });

  $(".singleBlock", data).each((i, element) => {
    const listItem = $(element).find("ul li");

    contents.push({
      title: listItem.find("a").attr("title").trim(),
      url: listItem.find("a").attr("href"),
      image: $(element).find(".pic img").attr("src"),
    });
  });

  return contents;
}

exports.parse = (data) => {
  let contents = [];

  contents = parseContents(".m_c_left ul li", data);
  contents = contents.concat(parseContents(".m_c_right ul li", data));

  return contents;
};

exports.parseByCategory = (data) => {
  const contents = parseCategoryContens(data);

  return contents;
};
