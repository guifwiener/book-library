const { v4: uuidv4 } = require('uuid');

let booksList = require('../../db/books.json');

class BookRepository {
  findAll() {
    const rows = booksList;
    return rows;
  }

  findById(id) {
    const [row] = booksList.filter((book) => (
      book.id === id
    ));
    return row;
  }

  findByName(name) {
    const [row] = booksList.filter((book) => (
      book.name === name
    ));
    return row;
  }

  async create({ name, author, category }) {
    const row = booksList.push({
      id: uuidv4(),
      name,
      author,
      category,
    });
    return row;
  }

  remove(id) {
    booksList = booksList.filter((book) => (
      book.id !== id
    ));
    return true;
  }

  update(id, { name, author, category }) {
    const rowIndex = booksList.findIndex((book) => (
      book.id === id
    ));
    booksList[rowIndex] = {
      id,
      name,
      author,
      category,
    };
    const [row] = booksList.filter((book) => (
      book.id === id
    ));
    return row;
  }
}

module.exports = new BookRepository();
