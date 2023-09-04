const cheerio = require("cheerio");

function parseNews(data) {
  const $ = cheerio.load(data);
  const contents = [];

  $(".main_story_left ul", data).each((i, element) => {
    $(element).find("li").each((index, liElement) => {
      contents.push({
        title: $(liElement).find("a").attr("title").trim(),
        url: $(liElement).find("a").attr("href"),
        image: $(liElement).find(".news-pic img").attr("data-src"),
      });
    });
  });

  return contents;
}

function parseTrending(data) {
  const $ = cheerio.load(data);
  const contents = [];

  $(".sp_left ul", data).each((i, element) => {
    $(element).find("li").each((index, liElement) => {
      contents.push({
        title: $(liElement).find("a").attr("title").trim(),
        url: $(liElement).find("a").attr("href"),
        image: $(liElement).find(".news-pic img").attr("data-src"),
      });
    });
  });

  return contents;
}

exports.parse = (data) => {
  const contents = {
    news: parseNews(data),
    trending: parseTrending(data),
  };
  return contents;
};
