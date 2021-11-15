function Library() {
  this.books = [];
  this.booksAdded = 0;
}

function Book(library, params) {
  this.library = library;
  this.title = params.title;
  this.author = params.author;
  this.pageCount = params.pageCount;
  this.read = params.read;
  this.addToLibrary();
}

Book.prototype.addToLibrary = function() {
  this.library.booksAdded++;
  this.library.books.push(this);
};