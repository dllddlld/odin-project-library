function Library() {
  this.books = [];
  this.displayType = 'cards';
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
  this.library.books.push(this);
};