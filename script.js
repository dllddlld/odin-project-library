let HEADERS = ['Title', 'Author', 'Pages', 'Read', 'Remove'];
let myLibrary = new Library();
let form = document.querySelector('form');

initializePage();

function initializePage() {
  let libraryContainer = document.querySelector('.library-container');
  addPageListeners();
  createTable(libraryContainer);
  addSampleBooks();
}

function addPageListeners() {
  let newBookButton = document.querySelector('#add-nb');
  let submitBookButton = form.querySelector('#nbsubmit');
  let cancelBookButton = form.querySelector('#nbcancel');
  newBookButton.addEventListener('click', togglePopup);
  submitBookButton.addEventListener('click', submitForm);
  cancelBookButton.addEventListener('click', togglePopup);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
  });
}

function createTable(libraryContainer) {
  let table = document.createElement('div');
  table.classList.add('table');
  HEADERS.forEach(header => {
    let headerItem = document.createElement('div');
    headerItem.classList.add('header');
    headerItem.textContent = header;
    table.appendChild(headerItem);
  });
  libraryContainer.appendChild(table);
  return table;
}

function addSampleBooks() {
  let samples = [
    { title: '1984', author: 'George Orwell', pageCount: '300', read: true },
    { title: 'The Art of War', author: 'Sun Tzu', pageCount: '80', read: false }
  ];
  for (let i = 0; i < 20; i++) {
    samples.forEach(sample => {
      let book = new Book(myLibrary, sample);
    });
  }
  updateLibraryDisplay();
}

function updateLibraryDisplay() {
  let libraryContainer = document.querySelector('.library-container');
  libraryContainer.firstElementChild.remove();
  let libraryContent = createTable(libraryContainer);
  myLibrary.books.forEach(book => {
    let keys = ['title', 'author', 'pageCount', 'read'];
    keys.forEach(key => {
      let item = document.createElement('div');
      if (key === 'read') {
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = book[key];
        checkbox.addEventListener('click', toggleRead);
        item.appendChild(checkbox);
      } else {
        item.textContent = book[key];
      }
      item.dataset.bookId = myLibrary.books.indexOf(book);
      libraryContent.appendChild(item);
    });
    addRemoveButton(libraryContent, book);
  });
}

function addRemoveButton(libraryContent, book) {
  let removeItem = document.createElement('div');
  removeItem.classList.add('remove');
  removeItem.textContent = 'Remove';
  removeItem.dataset.bookId = myLibrary.books.indexOf(book);
  removeItem.addEventListener('click', removeBook);
  libraryContent.appendChild(removeItem);
}

function removeBook() {
  let bookId = this.dataset.bookId;
  let libraryContainer = document.querySelector('.library-container');
  let libraryContent = libraryContainer.firstElementChild;
  let bookDisplay = libraryContent.querySelectorAll(`div[data-book-id="${bookId}"]`);
  bookDisplay.forEach(cell => {
    libraryContent.removeChild(cell);
  });
  myLibrary.books = myLibrary.books.filter(book => {
    return book !== myLibrary.books[bookId];
  });
  updateLibraryDisplay();
}

function toggleRead() {
  let bookId = this.parentElement.dataset.bookId;
  for (let i = 0; i < myLibrary.books.length; i++) {
    let book = myLibrary.books[i];
    if (book.id.toString() !== bookId) continue;
    book.read = this.checked;
  }
}

function togglePopup() {
  let modalContainer = document.querySelector('.modal-container');
  let modalPopup = modalContainer.querySelector('.modal-popup');
  if (this.id === 'add-nb') {
    modalContainer.style.display = 'flex';
    setTimeout(function () {
      modalPopup.classList.add('open');
    });
  } else {
    form.reset();
    let invalidLabels = document.querySelectorAll('.invalid-text');
    let invalidFields = document.querySelectorAll('.invalid');
    invalidLabels.forEach(label => {
      label.classList.remove('invalid-text');
    });
    invalidFields.forEach(field => {
      field.classList.remove('invalid');
    });
    setTimeout(function () { //transition doesn't work without setTimeout
      modalPopup.classList.remove('open');
    });
    setTimeout(function () {
      modalContainer.style.display = 'none';
    }, 600);
  }
}

function submitForm(e) {
  e.preventDefault();
  let fields = [
    addField('nbtitle', 'title', 'value', true),
    addField('nbauthor', 'author', 'value', true),
    addField('nbpages', 'pageCount', 'value', true),
    addField('nbread', 'read', 'checked', false),
  ];
  let bookParams = {};
  let hasMissingMandatoryValues = false;
  fields.forEach(field => {
    let element = document.querySelector('#' + field.id);
    let labelElement = document.querySelector(`label[for="${field.id}"]`);
    let inputValue = element[field.valueType];
    if (field.valueType === 'value') {
      inputValue = inputValue.trim();
    }
    if (field.isMandatory && !inputValue) {
      element.classList.add('invalid');
      labelElement.classList.add('invalid-text');
      hasMissingMandatoryValues = true;
      return;
    } else {
      element.classList.remove('invalid');
      labelElement.classList.remove('invalid-text');
    }
    bookParams[field.key] = inputValue;
  });
  if (hasMissingMandatoryValues) return;
  let book = new Book(myLibrary, bookParams);
  updateLibraryDisplay();
  togglePopup(this);
}

function addField(id, key, valueType, isMandatory) {
  return {
    id: id,
    key: key,
    valueType: valueType,
    isMandatory: isMandatory
  };
}