const codeIsInRanges = (number, arrayOfRanges) => {
  return arrayOfRanges.some(
    ([lowerBound, upperBound]) => lowerBound <= number && number <= upperBound
  );
};

const isCJK = (c) =>
  codeIsInRanges(c.charCodeAt(0), [
    [0x3040, 0x309f],
    [0x4e00, 0x9fff],
    [0xac00, 0xd7a3],
    [0x20000, 0x2ebe0],
  ]);

const isAnsiWordBound = (c) => " \n\r\t".includes(c);

const isPunctuation = (c) => {
  const charCode = c.charCodeAt(0);
  return codeIsInRanges(charCode, [
    [0x21, 0x2f],
    [0x3a, 0x40],
    [0x5b, 0x60],
    [0x7b, 0x7e],
    [0x3000, 0x303f],
    [0xff00, 0xffef],
  ]);
};

const countWords = (text) => {
  let words = 0,
    start = 0,
    end = text.length - 1;

  while (isAnsiWordBound(text[start])) start++;
  while (isAnsiWordBound(text[end])) end--;

  const normalizedText = `${text}\n`;

  for (let i = start; i <= end; i++) {
    if (
      isCJK(normalizedText[i]) ||
      (!isAnsiWordBound(normalizedText[i]) &&
        (isAnsiWordBound(normalizedText[i + 1]) ||
          isCJK(normalizedText[i + 1])))
    ) {
      words++;
    }
    if (isCJK(normalizedText[i])) {
      while (
        i <= end &&
        (isPunctuation(normalizedText[i + 1]) ||
          isAnsiWordBound(normalizedText[i + 1]))
      ) {
        i++;
      }
    }
  }

  return { total: words };
};

const readingTimeWithCount = (words) => {
  const minutes = words.total / 200;
  const time = Math.round(minutes * 60 * 1000);
  const displayed = Math.ceil(parseFloat(minutes.toFixed(2)));
  return { minutes: displayed, time };
};

const readingTime = (text) => {
  const words = countWords(text);
  return { ...readingTimeWithCount(words), words };
};

const slugify = (str) => {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(p, (c) => b.charAt(a.indexOf(c)))
    .replace(/&/g, "-and-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

module.exports = async function (data) {
  const { content, title } = data.article_data[0];
  return { read_time: readingTime(content), slug: slugify(title) };
};
