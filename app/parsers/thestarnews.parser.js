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
  const tagElement = $(rootElement).find(".kicker");

  contents.push({
    title: headerElement.attr("data-content-title"),
    url: headerElement.attr("href"),
    tagInfo: (tagElement.length > 0 ? createTagInformation(
      $(tagElement).text().trim(),
      $(tagElement).attr("href"),
    ) : null),
  });

  return contents;
}

exports.parse = (data) => {
  const $ = cheerio.load(data);
  const contents = {
    news: parseContents($(".focus-story"), data),
    videoStories: parseContents("#in-story .col-md-7 .thumb--video", data),
    events: [],
    otherSites: [],
  };

  $(".more-story .story-set-group .in-sec-story", data).each((index, element) => {
    contents.news = contents.news.concat(parseContents(element, data));
  });

  $("#in-story .col-md-5 .thumb--list", data).each((index, element) => {
    contents.videoStories = contents.videoStories.concat(parseContents(element, data));
  });

  $("#eventItemsList .mySlides", data).each((index, element) => {
    contents.events = contents.events.concat(parseContents(element, data));
  });

  $(".others .story-set .in-sec-story", data).each((index, element) => {
    contents.otherSites = contents.otherSites.concat(parseContents(element, data));
  });

  return contents;
};
