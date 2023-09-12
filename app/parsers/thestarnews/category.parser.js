exports.parse = async (page) => {
  const contents = await page.evaluate(() => {
    function getSideNews() {
      const data = [];
      const items = document.querySelectorAll(".more-story .story-set.story3 .hidden-visual");

      items.forEach((item) => {
        data.push({
          title: item.querySelector(".col-xs-7 h2 a").getAttribute("data-content-title"),
          url: item.querySelector(".col-xs-7 h2 a").getAttribute("href"),
          tagInfo: {
            name: item.querySelector(".col-xs-7 .kicker").innerText,
            url: item.querySelector(".col-xs-7 .kicker").getAttribute("href"),
          },
        });
      });

      return data;
    }

    function getNews() {
      const data = [];
      const items = document.querySelectorAll(".more-story .story-set-group .in-sec-story");

      items.forEach((item) => {
        const headerElement = item.querySelector("h2 a");
        data.push({
          title: headerElement.getAttribute("data-content-title"),
          url: headerElement.getAttribute("href"),
          image: item.querySelector(".img-sticker img").getAttribute("src"),
        });
      });

      return data;
    }

    function getJustInNews() {
      const data = [];
      const items = document.querySelectorAll("#justInListing li");

      items.forEach((item) => {
        const headerElement = item.querySelector(".timeline-content p a");

        data.push({
          title: headerElement.getAttribute("data-content-title"),
          url: headerElement.getAttribute("href"),
          tagInfo: {
            name: item.querySelector(".kicker").innerText,
            url: item.querySelector(".kicker").getAttribute("href"),
          },
        });
      });

      return data;
    }

    const data = {
      sideNews: getSideNews(),
      news: getNews(),
      justInNews: getJustInNews(),
    };

    return data;
  });

  return contents;
};
