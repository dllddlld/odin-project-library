function Library() {
  this.books = [];
}

function Book(params) {
  this.title = params.title;
  this.author = params.author;
  this.pageCount = params.pageCount;
  this.read = params.read;
}

Book.prototype.addToLibrary = function() {
  myLibrary.books.push(this);
};