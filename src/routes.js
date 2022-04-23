/* eslint-disable object-curly-spacing */
const { addBook } = require(`./handler`);

const routes = [
  {
    method: `POST`,
    path: `/books`,
    handler: addBook,
  },
];

module.exports = routes;
