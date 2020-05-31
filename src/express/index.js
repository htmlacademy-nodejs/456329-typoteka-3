'use strict';

const express = require(`express`);

const {
  logInfo,
} = require(`../utils`);

// Маршруты приложения мы опишем в отдельных файлах.
// Для определения маршрутов мы воспользуемся Router().
// Примеры маршрутов будут продемонстрированы ниже по тексту.
const categorieRoutes = require(`./routes/category-routes`);
const articleRoutes = require(`./routes/article-routes`);
const myRoutes = require(`./routes/my-routes`);
const mainRoutes = require(`./routes/main-routes`);

// Зафиксируем порт для сервера
const DEFAULT_PORT = 8080;

const app = express();

// Подключим созданные маршруты
app.use(`/categories`, categorieRoutes);
app.use(`/articles`, articleRoutes);
app.use(`/my`, myRoutes);
app.use(`/`, mainRoutes);

// Запуск сервера
app.listen(DEFAULT_PORT, () => logInfo(`Сервер запущен на порту: ${DEFAULT_PORT}`, `green`));
