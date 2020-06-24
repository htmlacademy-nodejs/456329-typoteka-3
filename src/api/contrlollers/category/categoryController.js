"use strict";

const { Router } = require(`express`);
const { HttpCode } = require(`../../../constants`);

const { getLogger } = require(`../../../service/cli/logger`);

const logger = getLogger();

const route = new Router();

module.exports = (app, service) => {
  app.use(`/categories`, route);

  route.get(`/`, (req, res) => {
    const categories = service.findAll();
    res.status(HttpCode.OK).json(categories);
    logger.debug(`GET /api/categories status code ${res.statusCode}`);
  });
};
