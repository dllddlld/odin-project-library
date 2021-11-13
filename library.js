function Library() {
  this.books = [];
  this.booksAdded = 0;
}

function Book(params) {
  this.title = params.title;
  this.author = params.author;
  this.pageCount = params.pageCount;
  this.read = params.read;
  this.id = null;
  this.addToLibrary();
}

Book.prototype.addToLibrary = function() {
  myLibrary.booksAdded++;
  this.id = myLibrary.booksAdded;
  myLibrary.books.push(this);
};