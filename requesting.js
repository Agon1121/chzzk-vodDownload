const request = require("request");
const DOMParser = require("xmldom").DOMParser;

var vodLinkValue = "https://chzzk.naver.com/video/60644"
var serialNum = vodLinkValue.replace("https://chzzk.naver.com/video/","");
console.log(serialNum);
const options = {
  method: "GET",
  url: `https://api.chzzk.naver.com/service/v2/videos/${serialNum}`,
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  const data = JSON.parse(body);
  const xmlLink = `https://apis.naver.com/neonplayer/vodplay/v2/playback/${data.content.videoId}?key=${data.content.inKey}&env=real`;

  request(xmlLink, function (error, response, body) {
    if (error) throw new Error(error);
    const parser = new DOMParser();
    const xmlData = parser.parseFromString(body, "text/xml");
    const xmlString = xmlData.toString();
    const data = JSON.parse(xmlString);

    data.period[0].adaptationSet[0].representation.forEach(function (item) {
      console.log(
        `(${item.any[0].value}fps, ${item.any[1].value}p)\n${item.baseURL[0].value}\n`
      );
    });
  });
});

