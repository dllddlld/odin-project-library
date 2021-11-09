let myLibrary = new Library();
let table = document.querySelector('.table');

addDummyData();

function addDummyData() {
  let dummyBook1 = new Book('978-0141036144', '1984', 'George Orwell', 336, true);
  let dummyBook2 = new Book('978-1599869773', 'The Art of War', 'Sun Tzu', 68, false);
  dummyBook1.addToLibrary();
  dummyBook2.addToLibrary();
  addToDisplay(dummyBook1);
  addToDisplay(dummyBook2);
}

function addToDisplay(book) {
  let keys = ['id', 'title', 'author', 'pageCount', 'read'];
  keys.forEach(key => {
    let item = document.createElement('div');
    if (key === 'read') {
      let checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = book[key];
      item.appendChild(checkbox);
    } else {
      item.textContent = book[key];
    }
    table.appendChild(item);
  });
}