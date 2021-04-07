class BookService {

  constructor() {
    this.URI = "http://localhost:4000/api/books";
  }

  async getBooks() {
    const response = await fetch(this.URI);
    const books = await response.json();
    return books;
  }

  async postBook(book) {
    const response = await fetch(this.URI, {
      method: 'POST',
      body: book
    });
    const data = await response.json();
    console.log("Book Saved");
  }

  async deleteBooks(bookId) {
    const response = await fetch(`${this.URI}/${bookId}`, {
      headers: {
        'Content_Type': 'application/json'
      },
      method: 'DELETE'
    });
    const data = await response.json()
    console.log(data);
  }

}

export default BookService;