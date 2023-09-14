exports.parse = async (page) => {
  const { DAILYMOTION_URL } = process.env;

  const contents = await page.evaluate((baseUrl) => {
    function getChannel(name, url) {
      return {
        name,
        url: `${baseUrl}${url}`,
      };
    }

    const data = [];
    const containers = document.querySelectorAll(".Section__primaryColWrapper___3Uh8h .VideoCard__videoCard___3RIZ9");

    containers.forEach((container) => {
      data.push({
        title: container.querySelector(".VideoCard__videoTitle___3sTKj").getAttribute("title"),
        url: `${baseUrl}${container.querySelector(".VideoCard__videoTitle___3sTKj a").getAttribute("href")}`,
        image: container.querySelector(".VideoCard__videoImageWrapper___3NbLa img").getAttribute("src"),
        channel: getChannel(
          container.querySelector(".ChannelInfo__videoChannelInfo___D9ZHJ a").getAttribute("title"),
          container.querySelector(".ChannelInfo__videoChannelInfo___D9ZHJ a").getAttribute("href"),
        ),
      });
    });

    return data;
  }, DAILYMOTION_URL);

  return contents;
};
