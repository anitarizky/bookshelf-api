/* eslint-disable object-curly-spacing */
const { nanoid } = require(`nanoid`);
const books = require(`./books`);

const addBook = (request, h) => {
  // eslint-disable-next-line max-len
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  // eslint-disable-next-line no-new-wrappers
  const finished = new Boolean(false);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);
  const isSuccess = books.filter((book) => book.id === id).length > 0;
  // const isName = books.name.typeOf(string);
  //   const isName = (book) => {
  //     book.hasOwnProperty(name);
  //   };
  if (isSuccess) {
    const response = h.response({
      status: `success`,
      message: `Buku berhasil ditambahkan`,
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  if (addBook.name == undefined) {
    const response = h.response({
      status: `fail`,
      message: `Gagal menambahkan buku. Mohon isi nama buku`,
      data: {
        newBook,
      },
    });
    response.code(400);
    return response;
  }
  if (readPage >= pageCount) {
    const response = h.response({
      status: `fail`,
      // eslint-disable-next-line max-len
      message: `Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount`,
    });
    response.code(400);
    return response;
  }
  const response = h.response({
    status: `error`,
    message: `Buku gagal ditambahkan`,
    data: {
      newBook,
    },
  });
  response.code(500);
  return response;
};

module.exports = { addBook };
