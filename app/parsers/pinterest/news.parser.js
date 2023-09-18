exports.parse = async (page) => {
  const { PINTERESTNEWS_URL } = process.env;

  const contents = await page.evaluate((baseUrl) => {
    const data = [];
    const items = document.querySelectorAll(".l-smart-grid .image-tile");

    items.forEach((item) => {
      const headerElement = item.querySelector(".image-tile__title a");

      data.push({
        title: headerElement.innerText.trim(),
        url: `${baseUrl}${headerElement.getAttribute("href")}`,
        date: item.querySelector(".image-tile__date").innerText.trim(),
        image: item.querySelector(".image-tile__image-wrap img").getAttribute("src"),
      });
    });

    return data;
  }, PINTERESTNEWS_URL);

  return contents;
};
