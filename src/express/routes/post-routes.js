'use strict';

const {Router} = require(`express`);
const postsRouter = new Router();

postsRouter.get(`/`, (req, res) => res.send(`/posts`));
postsRouter.get(`/comments`, (req, res) => res.send(`/posts/comments`));

module.exports = postsRouter;
