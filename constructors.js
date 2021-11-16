function Library() {
  this.books = [];
  this.displayType = 'cards';
}

function Book(params) {
  this.title = params.title;
  this.author = params.author;
  this.pageCount = params.pageCount;
  this.read = params.read;
}