'use strict';

const {nanoid} = require(`nanoid`);
const MAX_ID_LENGTH = 6;

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  create(article) {
    const newArticle = Object.assign({
      id: nanoid(MAX_ID_LENGTH),
      comments: []
    }
    , article);

    this._articles.push(newArticle);
    return newArticle;
  }

  createComment(article, comment) {
    const newComment = Object.assign({
      id: nanoid(MAX_ID_LENGTH)
    }, comment);

    article.comments.push(newComment);
    return newComment;
  }


  drop(id) {
    const article = this._articles.find((item) => item.id === id);

    if (!article) {
      return null;
    }

    this._articles = this._articles.filter((item) => item.id !== id);
    return article;
  }

  dropComment(article, commentId) {
    const dropComment = article.comments.find((item) => item.id === commentId);

    if (!dropComment) {
      return null;
    }

    article.comments = article.comments.filter((item) => item.id !== commentId);
    return dropComment;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((item) => item.id === id);
  }

  update(id, article) {
    const oldArticle = this._articles
      .find((item) => item.id === id);

    return Object.assign(oldArticle, article);
  }

}

module.exports = ArticleService;
