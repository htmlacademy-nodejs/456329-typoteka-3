"use strict";

const request = require(`supertest`);
const server = require(`../../../express`);
const { nanoid } = require(`nanoid`);

const { HttpCode } = require(`../../../constants`);
const { getMockData } = require(`../../../service/lib/get-mock-data`);

let mocks = [];

describe(`Тестирование API по маршруту Articles`, () => {
  beforeAll(async () => {
    mocks = await getMockData();
  });

  test(`Get /api/articles expected to have HttpCode 200`, async () => {
    const res = await request(server).get(`/api/articles`);

    expect(res.statusCode).toBe(HttpCode.OK);

    res.body.forEach((item) => {
      expect(item).toHaveProperty(`id`);
      expect(item).toHaveProperty(`title`);
    });
  });

  test(`Get /api/articles expected to have HttpCode 404`, async () => {
    const res = await request(server).get(`/api/articlesdd`);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`GET /api/articles/:offerId expected to have HttpCode 200`, async () => {
    const res = await request(server).get(`/api/articles/${mocks[0].id}`);

    expect(res.statusCode).toBe(HttpCode.OK);
    expect(res.body).toHaveProperty(`id`);
    expect(res.body).toHaveProperty(`title`);
  });

  test(`GET /api/articles/:offerId expected to have HttpCode 404`, async () => {
    const res = await request(server).get(`/api/articles/ggbTffRScb`);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`POST /api/articles`, async () => {
    const res = await request(server)
      .post(`/api/articles`)
      .send({
        id: nanoid(6),
        category: [`Посуда`],
        description: `Jest test description`,
        picture: `item08.jpg`,
        title: `Jest test title`,
        type: `offer`,
        sum: 12225,
        comments: [
          {
            id: nanoid(6),
            text: `Jest comment 1`,
          },
        ],
      });

    expect(res.statusCode).toBe(HttpCode.CREATED);
  });

  test(`PUT /api/articles/:offerId expected to have HttpCode 200`, async () => {
    const res = await request(server)
      .put(`/api/articles/${mocks[0].id}`)
      .send({
        id: nanoid(6),
        category: [`Посуда`],
        description: `Jest test description`,
        picture: `item08.jpg`,
        title: `Jest test title`,
        type: `offer`,
        sum: 12225,
        comments: [
          {
            id: nanoid(6),
            text: `Jest comment 1`,
          },
        ],
      });
    expect(res.statusCode).toBe(HttpCode.OK);
  });

  test(`PUT /api/articles/:offerId expected to have HttpCode 404`, async () => {
    const res = await request(server)
      .put(`/api/articles/DgDbnwnsj`)
      .send({ id: nanoid(6), title: `Jest test` });
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`DELETE /api/articles/:offerId expected to have HttpCode 200`, async () => {
    const res = await request(server).delete(`/api/articles/${mocks[2].id}`);
    expect(res.statusCode).toBe(HttpCode.OK);
  });

  test(`DELETE /api/articles/:offerId expected to have HttpCode 404`, async () => {
    const res = await request(server).delete(`/api/articles/GGffDDEE;;kkdn`);
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`GET /api/articles/:offerId/comments expected to have HttpCode 200`, async () => {
    const res = await request(server).get(
      `/api/articles/${mocks[1].id}/comments`
    );
    expect(res.statusCode).toBe(HttpCode.OK);

    res.body.forEach((item) => {
      expect(item).toHaveProperty(`id`);
      expect(item).toHaveProperty(`text`);
    });
  });

  test(`GET /api/articles/:offerId/comments expected to have HttpCode 404`, async () => {
    const res = await request(server).get(
      `/api/articles/vffeveveYYffccnn/comments`
    );
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`DELETE /api/articles/:offerId/comments/:commentId expected to have 200`, async () => {
    const res = await request(server).delete(
      `/api/articles/${mocks[1].id}/comments/${mocks[1].comments[0].id}`
    );
    expect(res.statusCode).toBe(HttpCode.OK);
  });

  test(`DELETE /api/articles/:offerId/comments/:commentId expected to have HttpCode 404`, async () => {
    const res = await request(server).delete(
      `/api/articles/${mocks.id}/comments/${mocks[1].id}`
    );
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });

  test(`POST /api/articles/:offerId/comments expected to have HttpCode 201`, async () => {
    const res = await request(server)
      .post(`/api/articles/${mocks[1].id}/comments`)
      .send({ id: nanoid(6), text: `Jest test post comment` });
    expect(res.statusCode).toBe(HttpCode.CREATED);
  });

  test(`POST /api/articles/:offerId/comments expected to have HttpCode 404`, async () => {
    const res = await request(server)
      .post(`/api/articles/${mocks[1].id}/CAMENTSss`)
      .send({ id: nanoid(6), text: `Jest test post comment` });
    expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
  });
});
