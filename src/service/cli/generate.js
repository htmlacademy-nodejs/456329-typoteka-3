'use strict';

const fs = require(`fs`);

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const {
  getRandomInt,
  shuffle,
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
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));

    if (args < 1000) {
      fs.writeFile(FILE_NAME, content, (err) => {
        if (err) {
          console.error(`Can't write data to file...`);
        }
      });
    } else {
      console.log(`Не больше 1000 объявлений`);
    }
  }
};

