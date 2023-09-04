const cheerio = require("cheerio");

function parseSection(selector, data) {
  const $ = cheerio.load(data);
  const contents = [];

  $(selector, data).each((i, element) => {
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

function parseMagazineSection(data) {
  const $ = cheerio.load(data);
  const contents = [];

  $(".home_mag_list", data).each((i, element) => {
    contents.push({
      title: $(element).find("a").attr("title").trim(),
      url: $(element).find("a").attr("href"),
      image: $(element).find("img").attr("data-src"),
    });
  });

  return contents;
}

function parseMoreNews(data) {
  const $ = cheerio.load(data);
  const contents = [];

  $(".laodMoreNews ul li", data).each((i, element) => {
    contents.push({
      title: $(element).find("a").attr("title").trim(),
      url: $(element).find("a").attr("href"),
    });
  });

  return contents;
}

exports.parse = (data) => {
  const contents = {
    news: parseSection(".main_story_left ul", data),
    trending: parseSection(".sp_left ul", data),
    videos: parseSection(".h_video_left ul", data),
    magazines: parseMagazineSection(data),
    moreNews: parseMoreNews(data),
  };

  return contents;
};
