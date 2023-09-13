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
    const containers = document.querySelectorAll("#contents .ytd-rich-grid-renderer");

    containers.forEach((container) => {
      const items = container.querySelectorAll(".ytd-rich-grid-row");

      items.forEach((item) => {
        const headerElement = item.querySelector("#details #video-title-link");

        data.push({
          title: headerElement.getAttribute("aria-label"),
          url: `${baseUrl}${headerElement.getAttribute("href")}`,
          image: item.querySelector(".ytd-thumbnail img").getAttribute("src"),
          channel: getChannel(
            item.querySelector(".ytd-video-meta-block a.yt-simple-endpoint").innerText,
            item.querySelector(".ytd-video-meta-block a.yt-simple-endpoint").getAttribute("href"),
          ),
        });
      });
    });

    return data;
  }, YOUTUBE_URL);

  return contents;
};
