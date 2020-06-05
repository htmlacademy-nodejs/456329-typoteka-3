'use strict';

const express = require(`express`);
const path = require(`path`);

const {
  logInfo,
} = require(`../utils`);

const PUBLIC_DIR = `public`;

// Маршруты приложения мы опишем в отдельных файлах.
// Для определения маршрутов мы воспользуемся Router().
// Примеры маршрутов будут продемонстрированы ниже по тексту.
const {
  categorieRoutes,
  articleRoutes,
  postRoutes,
  actionRoutes,
} = require(`./routes/index`);

// Зафиксируем порт для сервера
const DEFAULT_PORT = 8080;

const app = express();

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
