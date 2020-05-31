'use strict';

const fs = require(`fs`).promises;

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const {
  getRandomInt,
  shuffle,
  logInfo,
  logInfoError,
} = require(`../../utils`);

const DEFAULT_COUNT = 1;

const FILE_NAME = `mocks.json`;


const date = new Date();
const createdDate = `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()} ${date.getHours()}:${(date.getMinutes() < 10 ? `0` : ``) + date.getMinutes()}:${date.getSeconds()}`;

const generateOffers = (count, titles, categories, sentences) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(sentences).slice(1, 5).join(` `),
    fullText: shuffle(sentences).slice(1, 5).join(` `),
    createdDate,
    category: [categories[getRandomInt(0, categories.length - 1)]],
  }))
);

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    const contentTrim = content.toString().split(`\n`).map((line) => {
      return line.trim();
    }).filter(Boolean);

    return contentTrim;
  } catch (err) {
    logInfoError(err);
    return [];
  }
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences));

    try {
      if (args < 1000) {
        await fs.writeFile(FILE_NAME, content);
        logInfo(`Operation success. File created.`, `green`);
      } else {
        logInfoError(`Less then 1000, please`);
      }
    } catch (err) {
      logInfoError(`Can't write data to file...`);
    }
  }
};
