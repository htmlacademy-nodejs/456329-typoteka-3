"use strict";

const { Router } = require(`express`);
const { getMockData } = require(`../service/lib/get-mock-data`);
const {
  CategoryService,
  ArticleService,
  SearchService,
} = require(`./services`);
const {
  setCategoryController,
  setArticleController,
  setSearchController,
} = require(`./contrlollers`);

const router = new Router();

(async () => {
  try {
    const articles = await getMockData();

    const categoryService = new CategoryService(articles);
    const searchService = new SearchService(articles);
    const articleService = new ArticleService(articles);

    setCategoryController(router, categoryService);
    setArticleController(router, articleService);
    setSearchController(router, searchService);
  } catch (error) {
    console.error(error);
  }
})();

exports.data = router;
