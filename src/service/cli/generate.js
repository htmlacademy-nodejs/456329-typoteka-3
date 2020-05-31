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
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    announce: shuffle(ANNOUNCE).slice(1, 5).join(` `),
    fullText: shuffle(ANNOUNCE).slice(1, 5).join(` `),
    createdDate,
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));

    try {
      if (args < 1000) {
        await fs.writeFile(FILE_NAME, content);
        logInfo(`Operation success. File created.`, `green`)
      } else {
        logInfoError(`Less then 1000, please`)
      }
    } catch (err) {
      logInfoError(`Can't write data to file...`)
    }
  }
};
