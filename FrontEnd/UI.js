import BookService from './services/BookServices';
import {format} from 'timeago.js';
const bookService = new BookService();
class UI {

  async renderBooks() {
    const books = await bookService.getBooks();
    const booksCardsContainer = document.getElementById("books-cards");
    booksCardsContainer.innerHTML = '';
    books.forEach(book => {
      const div = document.createElement('div');
      div.className = '';
      div.innerHTML = `
        <div class="card m-2">
          <div class="row">
            <div class="col-md-4">
              <img src="http://localhost:4000${book.imagePath}" alt="" class="img-fluid">
            </div>
            <div class="col-md-8">
              <div class="card-block px-2">
                <h4 class="card-title">${book.title}</h4>
                <p class="card-text">${book.author}</p>
                <a href="#" class="btn btn-danger delete" _id="${book._id}">Delete</a>
              </div>
            </div>
          </div>
          <div class="card-footer">
            ${format(book.created_at)}
          </div>
        </div>
      `;
      booksCardsContainer.appendChild(div);
    });
  }

  async addNewBook(book) {
    await bookService.postBook(book);
    this.clearBookForm();
    this.renderBooks();
  }

  clearBookForm() {
    document.getElementById("book-form").reset();
  }

  renderMessage(message, colorMessage, secondsToRemove) {
    const div = document.createElement('div');
    div.className = `alert alert-${colorMessage} message`;
    div.appendChild(document.createTextNode(message));

    const constainer = document.querySelector(".col-md-4");
    const bookForm = document.querySelector("#book-form");

    constainer.insertBefore(div, bookForm);
    setTimeout(() => {
      document.querySelector('.message').remove()
    }, secondsToRemove);

  }

  async deleteBook(bookId) {
    await bookService.deleteBooks(bookId);
    this.renderBooks();
  }

}

export default UI;