'use strict';

const {Router} = require(`express`);
const {getMockData} = require(`../service/lib/get-mock-data`);
const {CategoryService, ArticleService, SearchService} = require(`./services`);
const {categoryController, articleController, searchController} = require(`./contrlollers`);

const router = new Router();

(async () => {
  try {
    const articles = await getMockData();

    const categoryService = new CategoryService(articles);
    const searchService = new SearchService(articles);
    const articleService = new ArticleService(articles);

    categoryController(router, categoryService);
    searchController(router, searchService);
    articleController(router, articleService);

    router.use(`/categories`, categoryController);
    router.use(`/search`, searchController);
    router.use(`/articles`, articleController);


  } catch (error) {
    console.error(error);
  }
})();

exports.data = router;
