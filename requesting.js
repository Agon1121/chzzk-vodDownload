
var vodLinkValue = process.argv[2]
var serialNum = vodLinkValue.replace("https://chzzk.naver.com/video/","");
var APIurl = `https://api.chzzk.naver.com/service/v2/videos/${serialNum}`
const options = {
  method: "GET"
};
fetch(APIurl, options)
.then(response => response.json())
.then((data) => {
  var xmlLink = `https://apis.naver.com/neonplayer/vodplay/v2/playback/${data.content.videoId}?key=${data.content.inKey}&env=real`;
  fetch(xmlLink, options)
  .then(response => response.json())
  .then(data => {
    data.period[0].adaptationSet[0].representation.forEach(function (item) {
      console.log(
        `(${item.any[0].value}fps, ${item.any[1].value}p)\n${item.baseURL[0].value}\n`
      );
    });
  });
});

