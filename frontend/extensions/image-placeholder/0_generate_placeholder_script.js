const axios = require("axios");

const remoteImageToBase64 = async (url) =>
  axios
    .get(url, { responseType: "arraybuffer" })
    .then((response) =>
      Buffer.from(response.data, "binary").toString("base64")
    );

const remoteImageToImageData = async (url) =>
  `data:image/webp;base64,${await remoteImageToBase64(url)}`;

const remoteImageParser = async (key) =>
  remoteImageToImageData(
    `https://admin.kitashoersel.de/assets/${key}?fit=contain&width=30&quality=10&format=webp&upscaling=false`
  );

module.exports = async function (data) {
  const { key } = data["$trigger"];
  if (!key) return data;
  data["$trigger"].payload.placeholder = await remoteImageParser(key);
};
