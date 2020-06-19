"use strict";

const { Router } = require(`express`);
const { HttpCode } = require(`../../../constants`);
const route = new Router();
const {
  existingArticle,
} = require(`../../../service/middlewares/existing-article`);

const { getLogger } = require(`../../../service/cli/logger`);

const logger = getLogger();

module.exports = (app, service) => {
  app.use(`/articles`, route);

  route.get(`/`, (req, res) => {
    const articles = service.findAll();
    res.status(HttpCode.OK).json(articles);
    logger.debug(`GET /api/articles status code ${res.statusCode}`);
  });

  route.get(`/:articleId`, existingArticle(service), (req, res) => {
    const { articleId } = req.params;
    const article = service.findOne(articleId);
    res.status(HttpCode.OK).json(article);
    logger.debug(`GET /api/articles/:articleId status code ${res.statusCode}`);

  });

  route.get(`/:articleId/comments`, existingArticle(service), (req, res) => {
    const { articleId } = req.params;
    const articleById = service.findOne(articleId).comments;
    res.status(HttpCode.OK).json(articleById);
    logger.debug(`GET /api/articles/:articleId/comments status code ${res.statusCode}`);
  });

  route.post(`/`, (req, res) => {
    let article;

    if (
      Object.entries(req.body).length === 0 &&
      req.body.constructor === Object
    ) {
      res.status(HttpCode.BAD_REQUEST).send(`Data is empty`);
    } else {
      article = service.create(req.body);
    }

    res.status(HttpCode.CREATED).json(article);
    logger.debug(`POST /api/articles/ status code ${res.statusCode}`);
  });

  route.post(`/:articleId/comments`, existingArticle(service), (req, res) => {
    const { article } = res.locals;
    const comment = service.createComment(article, req.body);

    res.status(HttpCode.CREATED).json(comment);
    logger.debug(`POST /api/articles/:articleId/comments status code ${res.statusCode}`);
  });

  route.put(`/:articleId`, existingArticle(service), (req, res) => {
    const { article } = res.locals;
    const updateArticle = service.update(article.id, req.body);
    res.status(HttpCode.OK).json(updateArticle);
    logger.debug(`PUT /api/articles/:articleId status code ${res.statusCode}`);

  });

  route.delete(`/:articleId`, existingArticle(service), (req, res) => {
    const { article } = res.locals;
    const deletedarticle = service.drop(article.id);
    res.status(HttpCode.OK).json(deletedarticle);
    logger.debug(`DELETE /api/articles/:articleId status code ${res.statusCode}`);
  });

  route.delete(
    `/:articleId/comments/:commentId`,
    existingArticle(service),
    (req, res) => {
      const { commentId } = req.params;
      const { article } = res.locals;
      const deleteComment = service.dropComment(article, commentId);

      return res.status(HttpCode.OK).json(deleteComment);
      
    }
  );
};
