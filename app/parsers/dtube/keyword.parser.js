exports.parse = async (page) => {
  const { DTUBE_URL } = process.env;

  const contents = await page.evaluate((baseUrl) => {
    function getTagInformation(name, url) {
      return {
        name,
        url: `${baseUrl}${url}`,
      };
    }

    const data = [];
    const items = document.querySelectorAll(".maingrid .container a[title]");

    items.forEach((item) => {
      data.push({
        title: item.getAttribute("title").trim(),
        description: item.querySelector(".videosnapdescription").innerText.trim(),
        url: `${baseUrl}${item.getAttribute("href")}`,
        image: item.querySelector(".verticalvideosnapsnap img").getAttribute("src"),
        tagInfo: getTagInformation(
          item.querySelector(".videosnapauthor a span").innerText,
          item.querySelector(".videosnapauthor a").getAttribute("href"),
        ),
      });
    });

    return data;
  }, DTUBE_URL);

  return contents;
};
