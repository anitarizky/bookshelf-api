/* eslint-disable object-curly-spacing */
const { addBook, getAllBooks, getBookById } = require(`./handler`);

const routes = [
  {
    method: `POST`,
    path: `/books`,
    handler: addBook,
  },
  {
    method: `GET`,
    path: `/books`,
    handler: getAllBooks,
  },
  {
    method: `GET`,
    path: `/books/{id}`,
    handler: getBookById,
  },
];

module.exports = routes;
