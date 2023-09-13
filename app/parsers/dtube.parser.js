exports.parse = async (page) => {
  const contents = await page.evaluate(() => {
    function getTagInformation(name, url) {
      return {
        name,
        url: `${process.env.DTUBE_URL}/${url}`,
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
          url: `${process.env.DTUBE_URL}/${headerElement.getAttribute("href")}`,
          image: headerElement.querySelector("#snapimg").getAttribute("src"),
          tagInfo: getTagInformation(
            item.querySelector(".videosnapauthor a .customlink").innerText,
            item.querySelector(".videosnapauthor a").getAttribute("href"),
          ),
        });
      });
    });

    return data;
  });

  return contents;
};
