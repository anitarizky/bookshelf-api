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

const getAllBooks = () => ({
  status: `success`,
  data: {
    books,
  },
});

const getBookById = (request, h) => {
  const { id } = request.params;
  const book = books.filter((bk) => bk.id === id)[0];
  if (book !== undefined) {
    return {
      status: `success`,
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: `fail`,
    message: `Buku tidak ditemukan`,
  });
  response.code(400);
  return response;
};

const editBookById = (request, h) => {
  const { id } = request.params;
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
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: `success`,
      message: `Buku berhasil diperbarui`,
    });
    response.code(200);
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
    status: `fail`,
    message: `Gagal memperbarui buku. Id tidak ditemukan`,
  });
  response.code(404);
  return response;
};

const deleteBookById = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: `success`,
      message: `Buku berhasil dihapus`,
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: `fail`,
    message: `Buku gagal dihapus. Id tidak ditemukan`,
  });
  response.code(404);
  return response;
};

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  editBookById,
  deleteBookById,
};
