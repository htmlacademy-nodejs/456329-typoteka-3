'use strict';

const {
  logInfo,
} = require(`../../utils`);

module.exports = {
  name: `--help`,
  run() {
    const helpText = `Программа запускает http-сервер и формирует файл с данными для API.

        Гайд:
        service.js <command>
        
        Команды:
        --version:            выводит номер версии
        --help:               печатает этот текст
        --generate <count>    формирует файл mocks.json
        --server <port>       запускает сервер на указанном порту (по умолчанию 3000)`;
    logInfo(helpText, `grey`)
  }
};
