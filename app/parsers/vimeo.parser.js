exports.parse = async (page) => {
  const contents = await page.evaluate(() => {
    function parseContents() {
      const data = [];
      const items = document.querySelectorAll(".iris_p_infinite__grid .iris_p_infinite__item");

      items.forEach((item) => {
        data.push({
          title: item.querySelector(".iris_video-vital__title .iris_link").innerText,
          url: item.querySelector(".iris_video-vital a").getAttribute("href"),
          image: item.querySelector(".iris_thumbnail img").getAttribute("src"),
          authorInfo: {
            title: item.querySelector(".iris_uservital .iris_uservital-content a span").innerText,
            image: item.querySelector(".iris_uservital .iris_portrait img").getAttribute("src"),
          },
        });
      });

      return data;
    }

    return parseContents();
  });

  return contents;
};
