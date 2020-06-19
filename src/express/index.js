'use strict';

const express = require(`express`);
const path = require(`path`);
const app = express();
const {data} = require(`../api`);

const {
  logInfo,
} = require(`../utils`);

const PUBLIC_DIR = `public`;

const {
  categorieRoutes,
  articleRoutes,
  postRoutes,
  actionRoutes,
} = require(`./routes/index`);

const API_PREFIX = `/api`;
const DEFAULT_PORT = 8080;

app.use(express.json());

// Используем REST api
app.use(API_PREFIX, data);

app.use((req, res) => {
  res.status(404)
  res.json({
    error: {
      'name': 'Error',
      'status': 404,
      'message': 'Invalid Request',
      'statusCode': 404,
    }
  });
  //console.error(`Wrong route`);
});


// Подключим созданные маршруты
app.use(`/categories`, categorieRoutes);
app.use(`/articles`, articleRoutes);
app.use(`/posts`, postRoutes);
app.use(`/`, actionRoutes);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

// Запуск сервера
app.listen(DEFAULT_PORT, () => logInfo(`Сервер запущен на порту: ${DEFAULT_PORT}`, `green`));

module.exports = app;
