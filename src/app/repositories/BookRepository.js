const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const booksListParse = fs.readFileSync(path.resolve(__dirname, '../../db/books.json'));

let booksList = JSON.parse(booksListParse);

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
    const booksListString = JSON.stringify(booksList);
    fs.writeFileSync(path.resolve(__dirname, '../../db/books.json'), booksListString);
    return row;
  }

  remove(id) {
    booksList = booksList.filter((book) => (
      book.id !== id
    ));
    const booksListString = JSON.stringify(booksList);
    fs.writeFileSync(path.resolve(__dirname, '../../db/books.json'), booksListString);
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
    const booksListString = JSON.stringify(booksList);
    fs.writeFileSync(path.resolve(__dirname, '../../db/books.json'), booksListString);
    return row;
  }
}

module.exports = new BookRepository();
