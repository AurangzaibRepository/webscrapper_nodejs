exports.parse = async (page) => {
  const { PINTEREST_URL } = process.env;

  const contents = await page.evaluate((baseUrl) => {
    const data = [];
    const items = document.querySelectorAll(".vbI.XiG .MIw.Hb7");

    items.forEach((item) => {
      const [element] = item.querySelectorAll(".CCY.S9z");
      const [title, caption] = element.innerText.split("\n");

      data.push({
        title,
        caption,
        url: `${baseUrl}${item.querySelector("a.Wk9.CCY").getAttribute("href")}`,
        image: item.querySelector("img.hCL.kVc").getAttribute("src"),
      });
    });

    return data;
  }, PINTEREST_URL);

  return contents;
};
