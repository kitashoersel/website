
/*const remoteImageToBase64 = async (url) => axios.get(url, { responseType: 'arraybuffer' })
  .then(response => Buffer.from(response.data, 'binary').toString('base64'))

const remoteImageToImageData = async (url) => `data:image/webp;base64,${await remoteImageToBase64(url)}`;

const remoteImageParser = async (key) =>  remoteImageToImageData(
  `https://admin.kitashoersel.de/assets/${key}?fit=contain&width=30&quality=10&format=webp&upscaling=false`
);
*/

module.exports = function(data) {
  if (data["request_ey1lc"]) {
    const placeholder = Buffer.from(data["request_ey1lc"].data).toString('base64');
    data["$trigger"].payload.placeholder = `data:image/webp;base64,${placeholder}`;
  }
	return data;
  // enable axios in scripts, fetch image data and then update image
  // PATCH https://admin.kitashoersel.de/files/6d97413a-1f5a-492d-9192-3dc22edf220f
}
