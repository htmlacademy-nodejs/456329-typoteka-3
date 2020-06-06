'use strict';

const {Router} = require(`express`);
const actionRouter = new Router();

actionRouter.get(`/`, (req, res) => res.render(`main`));
actionRouter.get(`/register`, (req, res) => res.render(`login`));
actionRouter.get(`/login`, (req, res) => res.render(`login`));
actionRouter.get(`/search`, (req, res) => res.render(`search`));
actionRouter.get(`/categories`, (req, res) => res.send(`/categories`));

module.exports = actionRouter;
