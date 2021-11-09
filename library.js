function Library() {
  this.books = [];
  this.bookIds = [];
}

Library.prototype.updateBookIds = function() {
  this.bookIds = this.books.map(book => book.id);
};

function Book(isbn, title, author, pageCount, read) {
  this.id = isbn;
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.read = read;
}

Book.prototype.existsInLibrary = function() {
  return myLibrary.bookIds.indexOf(this.id) !== -1;
};

Book.prototype.addToLibrary = function() {
  if (this.existsInLibrary()) {
    return;
    //TODO: Replace with error
  }
  myLibrary.books.push(this);
  myLibrary.updateBookIds();
};