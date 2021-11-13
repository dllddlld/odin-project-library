function Library() {
  this.books = [];
  this.booksAdded = 0;
}

function Book(params) {
  this.title = params.title;
  this.author = params.author;
  this.pageCount = params.pageCount;
  this.read = params.read;
  this.addToLibrary();
}

Book.prototype.addToLibrary = function() {
  myLibrary.books.push(this);
  myLibrary.booksAdded++;
};