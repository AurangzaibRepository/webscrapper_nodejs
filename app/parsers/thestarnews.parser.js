const cheerio = require("cheerio");

function createTagInformation(name, url) {
  return {
    name,
    url: `${process.env.THESTARNEWS_URL}${url}`,
  };
}

function parseContents(rootElement, data) {
  const $ = cheerio.load(data);
  const contents = [];

  const headerElement = $(rootElement).find(".img-sticker a");

  contents.push({
    title: headerElement.attr("data-content-title"),
    url: headerElement.attr("href"),
    tagInfo: createTagInformation(
      $(rootElement).find(".kicker").text().trim(),
      $(rootElement).find(".kicker").attr("href"),
    ),
  });

  return contents;
}

exports.parse = (data) => {
  const $ = cheerio.load(data);
  const contents = {
    news: parseContents($(".focus-story"), data),
    videoStories: parseContents("#in-story .col-md-7 .thumb--video", data),
  };

  $(".more-story .story-set-group .in-sec-story", data).each((index, element) => {
    contents.news = contents.news.concat(parseContents(element, data));
  });

  $("#in-story .col-md-5 .thumb--list", data).each((index, element) => {
    contents.videoStories = contents.videoStories.concat(parseContents(element, data));
  });

  return contents;
};
