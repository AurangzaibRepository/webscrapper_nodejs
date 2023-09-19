exports.parse = async (page) => {
  const { VEOH_URL } = process.env;

  const contents = await page.evaluate((baseUrl) => {
    const data = [];
    const videoContainers = document.querySelectorAll(".video_area");

    videoContainers.forEach((container) => {
      const items = container.querySelectorAll(".video_list ul li");

      items.forEach((item) => {
        data.push({
          title: item.querySelector(".title").innerText,
          url: `${baseUrl}${item.querySelector("a").getAttribute("href")}`,
          image: item.querySelector("img").getAttribute("src"),
        });
      });
    });

    return data;
  }, VEOH_URL);

  return contents;
};
