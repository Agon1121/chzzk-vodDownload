const request = require("request");
const DOMParser = require("xmldom").DOMParser;

const options = {
  method: "GET",
  url: "https://api.chzzk.naver.com/service/v1/videos/1980",
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  const data = JSON.parse(body);
  const xmlLink = `https://apis.naver.com/neonplayer/vodplay/v1/playback/${data.content.videoId}?key=${data.content.inKey}&env=real`;

  request(xmlLink, function (error, response, body) {
    if (error) throw new Error(error);
    const parser = new DOMParser();
    const xmlData = parser.parseFromString(body, "text/xml");

    // XML 데이터를 문자열로 변환
    const xmlString = xmlData.toString();

    // XML 데이터를 파일로 저장
    const data = JSON.parse(xmlString);

    data.period[0].adaptationSet[0].representation.forEach(function (item) {
        console.log(`(${item.any[0].value}fps, ${item.any[1].value}p)\n${item.baseURL[0].value}\n`)
    })
  });
});
