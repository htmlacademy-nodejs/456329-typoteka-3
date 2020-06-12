'use strict';

const categoryController = require(`./category/category-controller`);
const articleController = require(`./article/article-controller`);
const searchController = require(`./search/search-controller`);

module.exports = {
  categoryController,
  articleController,
  searchController
};
