exports.parse = async (page) => {
  const { DTUBE_URL } = process.env;

  const contents = await page.evaluate((baseUrl) => {
    function getTagInformation(name, url) {
      return {
        name,
        url: `${baseUrl}/${url}`,
      };
    }

    const data = [];
    const containers = document.querySelectorAll(".article .owl-carousel");

    containers.forEach((container) => {
      const items = container.querySelectorAll(".videosnap");

      items.forEach((item) => {
        const headerElement = item.querySelector(".videosnap a");

        data.push({
          title: headerElement.getAttribute("title"),
          url: `${baseUrl}/${headerElement.getAttribute("href")}`,
          image: headerElement.querySelector("#snapimg").getAttribute("src"),
          tagInfo: getTagInformation(
            item.querySelector(".videosnapauthor a .customlink").innerText,
            item.querySelector(".videosnapauthor a").getAttribute("href"),
          ),
        });
      });
    });

    return data;
  }, DTUBE_URL);

  return contents;
};
