exports.parse = async (page) => {
  const { YOUTUBE_URL } = process.env;

  const contents = await page.evaluate((baseUrl) => {
    function getMetadata(metadataList) {
      const [viewSpan, timeSpan] = metadataList;

      return {
        views: viewSpan.innerText.trim(),
        postedTime: timeSpan.innerText.trim(),
      };
    }

    const data = [];
    const containers = document.querySelectorAll("#primary ytd-item-section-renderer");

    containers.forEach((container) => {
      const items = container.querySelectorAll("ytd-grid-video-renderer");

      items.forEach((item) => {
        const headerElement = item.querySelector("#text-metadata #video-title");
        const [imageSource] = item.querySelector("yt-image img").lazyData.sources;

        data.push({
          title: headerElement.getAttribute("title"),
          url: `${baseUrl}/${headerElement.getAttribute("href")}`,
          image: imageSource.url,
          metadata: getMetadata(item.querySelectorAll("#metadata #metadata-line span")),
        });
      });
    });

    return data;
  }, YOUTUBE_URL);

  return contents;
};
