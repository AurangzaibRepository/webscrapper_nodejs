exports.parse = async (page) => {
  const { YOUTUBE_URL } = process.env;

  const contents = await page.evaluate((baseUrl) => {
    function getChannel(name, url) {
      return {
        name,
        url: `${baseUrl}${url}`,
      };
    }

    const data = [];
    const items = document.querySelectorAll(".ytd-item-section-renderer ytd-video-renderer");

    items.forEach((item) => {
      const headerElement = item.querySelector("#title-wrapper #video-title");

      data.push({
        title: headerElement.getAttribute("title"),
        url: `${baseUrl}${headerElement.getAttribute("href")}`,
        image: item.querySelector("#thumbnail img").getAttribute("src"),
        channel: getChannel(
          item.querySelector("#channel-info #channel-name a").innerText.trim(),
          item.querySelector("#channel-info #channel-name a").getAttribute("href")
        ),
      });
    });

    return data;
  }, YOUTUBE_URL);

  return contents;
};
