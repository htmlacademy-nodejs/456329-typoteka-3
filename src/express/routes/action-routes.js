'use strict';

const {Router} = require(`express`);
const actionRouter = new Router();

actionRouter.get(`/`, (req, res) => res.send(`/`));
actionRouter.get(`/register`, (req, res) => res.send(`/register`));
actionRouter.get(`/login`, (req, res) => res.send(`/login`));
actionRouter.get(`/search`, (req, res) => res.send(`/search`));
actionRouter.get(`/categories`, (req, res) => res.send(`/categories`));

module.exports = actionRouter;
