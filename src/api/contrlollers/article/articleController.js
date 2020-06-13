'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../../constants`);
const route = new Router();
const {existingArticle} = require(`../../../service/middlewares/existing-article`);


module.exports = (app, service) => {
  app.use(`/articles`, route);

  route.get(`/`, (req, res) => {
    const articles = service.findAll();
    res.status(HttpCode.OK)
            .json(articles);
  });

  route.get(`/:articleId`, existingArticle(service), (req, res) => {
    const {articleId} = req.params;
    const article = service.findOne(articleId);
    res.status(HttpCode.OK)
            .json(article);

  });

  route.get(`/:articleId/comments`, existingArticle(service), (req, res) => {
    const {articleId} = req.params;
    const articleById = service.findOne(articleId).comments;
    res.status(HttpCode.OK)
            .json(articleById);

  });

  route.post(`/`, (req, res) => {
    let article;

    if (Object.entries(req.body).length === 0 && req.body.constructor === Object) {
      res.status(HttpCode.BAD_REQUEST)
                .send(`Data is empty`);
    } else {
      article = service.create(req.body);
    }

    res.status(HttpCode.CREATED)
            .json(article);
  });

  route.post(`/:articleId/comments`, existingArticle(service), (req, res) => {
    const {article} = res.locals;
    const comment = service.createComment(article, req.body);

    res.status(HttpCode.CREATED)
          .json(comment);
  });

  route.put(`/:articleId`, existingArticle(service), (req, res) => {
    const {article} = res.locals;
    const updateArticle = service.update(article.id, req.body);
    res.status(HttpCode.OK)
            .json(updateArticle);
  });

  route.delete(`/:articleId`, existingArticle(service), (req, res) => {
    const {article} = res.locals;
    const deletedarticle = service.drop(article.id);
    res.status(HttpCode.OK)
            .json(deletedarticle);
  });

  route.delete(`/:articleId/comments/:commentId`, existingArticle(service), (req, res) => {
    const {commentId} = req.params;
    const {article} = res.locals;
    const deleteComment = service.dropComment(article, commentId);

    return res.status(HttpCode.OK)
          .json(deleteComment);
  });

};
