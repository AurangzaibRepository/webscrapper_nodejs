exports.parse = async (page) => {
  const contents = await page.evaluate(() => {
    const data = [];
    const videoContainers = document.querySelectorAll(".video_area");

    videoContainers.forEach((container) => {
      const items = container.querySelectorAll(".video_list ul li");

      items.forEach((item) => {
        data.push({
          title: item.querySelector(".title").innerText,
          url: item.querySelector("a").getAttribute("href"),
          image: item.querySelector("img").getAttribute("src"),
        });
      });
    });

    return data;
  });

  return contents;
};
