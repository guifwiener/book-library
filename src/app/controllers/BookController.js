const BookRepository = require('../repositories/BookRepository');

class BookController {
  index(request, response) {
    const books = BookRepository.findAll();
    return response.json(books);
  }

  show(request, response) {
    const { id } = request.params;

    if (!id) {
      return response.status(400).json('Bad ID');
    }

    const book = BookRepository.findById(id);

    if (!book) {
      return response.status(404).json('Book not found');
    }

    return response.json(book);
  }

  store(request, response) {
    const { name, author, category } = request.body;

    if (!name) {
      return response.status(400).json('Please insert a book name');
    }

    const bookName = BookRepository.findByName(name);

    if (bookName) {
      return response.status(409).json('Book is already registered');
    }

    BookRepository.create({ name, author, category });

    const book = BookRepository.findByName(name);
    return response.json(book);
  }

  delete(request, response) {
    const { id } = request.params;
    BookRepository.remove(id);
    return response.sendStatus(204);
  }

  update(request, response) {
    const { id } = request.params;

    if (!id) {
      return response.status(400).json('Bad ID');
    }

    const bookId = BookRepository.findById(id);

    if (!bookId) {
      return response.status(400).json('ID not found');
    }

    const { name, author, category } = request.body;

    if (!name) {
      return response.status(400).json('Please insert a book name');
    }

    const book = BookRepository.update(id, { name, author, category });
    return response.json(book);
  }
}

module.exports = new BookController();
