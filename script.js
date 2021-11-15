let myLibrary = new Library();
let form = document.querySelector('form');
let displayAsTable = document.querySelector('#display-table');
let displayAsCards = document.querySelector('#display-cards');

initializePage();

function initializePage() {
  let libraryContainer = document.querySelector('.library-container');
  addPageListeners();
  if (myLibrary.displayType === 'table') {
    createTable(libraryContainer);
  } else {
    createCards(libraryContainer);
  }
  addSampleBooks();
}

function addPageListeners() {
  disableSelectedDisplayOption();
  displayAsTable.addEventListener('click', toggleDisplayType);
  displayAsCards.addEventListener('click', toggleDisplayType);

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

function toggleDisplayType() {
  if (this.id === 'display-table') {
    myLibrary.displayType = 'table';
  } else {
    myLibrary.displayType = 'cards';
  }

  disableSelectedDisplayOption();
  updateLibraryDisplay();
}

function disableSelectedDisplayOption() {
  displayAsTable.disabled = myLibrary.displayType === 'table';
  displayAsCards.disabled = myLibrary.displayType === 'cards';
}

function addSampleBooks() {
  let samples = [
    { title: '1984', author: 'George Orwell', pageCount: '336', read: true },
    { title: 'The Art of War', author: 'Sun Tzu', pageCount: '112', read: false },
    { title: '101 Essays That Will Change The Way You Think', author: 'Brianna Wiest', pageCount: '448', read: false },
    { title: 'Atomic Habits', author: 'James Clear', pageCount: '320', read: false },
    { title: 'Bad Blood', author: 'John Carreyrou', pageCount: '320', read: true },
  ];
  samples.forEach(sample => {
    let book = new Book(myLibrary, sample);
  });
  updateLibraryDisplay();
}

function updateLibraryDisplay() {
  let libraryContainer = document.querySelector('.library-container');
  if (libraryContainer.childElementCount > 0) {
    libraryContainer.firstElementChild.remove();
  }
  let libraryContent;
  if (myLibrary.displayType === 'table') {
    libraryContent = createTable(libraryContainer);
    addTableContent(libraryContent);
  } else {
    libraryContent = createCards(libraryContainer);
    addCardsContent(libraryContent);
  }
}

function createTable(libraryContainer) {
  let tableHeaders = ['Title', 'Author', 'Pages', 'Read', 'Remove'];
  let table = document.createElement('div');
  table.classList.add('table');
  tableHeaders.forEach(header => {
    let headerItem = document.createElement('div');
    headerItem.classList.add('header');
    headerItem.textContent = header;
    table.appendChild(headerItem);
  });
  libraryContainer.appendChild(table);
  return table;
}

function addTableContent(libraryContent) {
  myLibrary.books.forEach(book => {
    let keys = ['title', 'author', 'pageCount', 'read'];
    keys.forEach(key => {
      let item = document.createElement('div');
      if (key === 'read') {
        let readCheckbox = createReadCheckbox(book, key);
        item.appendChild(readCheckbox);
      } else {
        item.textContent = book[key];
      }
      item.dataset.bookId = myLibrary.books.indexOf(book);
      libraryContent.appendChild(item);
    });
    let removeItem = createRemoveButton(book);
    libraryContent.appendChild(removeItem);
  });
}

function createCards(libraryContainer) {
  let cards = document.createElement('div');
  cards.classList.add('cards');
  libraryContainer.appendChild(cards);
  return cards;
}

function addCardsContent(libraryContent) {
  myLibrary.books.forEach(book => {
    let card = document.createElement('div');
    card.classList.add('card');
    let rowObjects = [
      addElementObject('Title', null),
      addElementObject(null, 'title'),
      addElementObject('Author', null),
      addElementObject(null, 'author'),
      addElementObject('Pages', null),
      addElementObject(null, 'pageCount'),
      addElementObject('Read', null),
      addElementObject(null, 'read'),
      addElementObject('Remove', null)
    ];
    rowObjects.forEach(rowObject => {
      let item = document.createElement('div');
      if (rowObject.text) {
        item.classList.add('header');
        item.textContent = rowObject.text;
      } else {
        if (rowObject.key === 'read') {
          let readCheckbox = createReadCheckbox(book, rowObject.key);
          item.appendChild(readCheckbox);
        } else {
          item.textContent = book[rowObject.key];
        }
      }
      card.appendChild(item);
    });
    let removeItem = createRemoveButton(book);
    card.appendChild(removeItem);
    card.dataset.bookId = myLibrary.books.indexOf(book);
    libraryContent.appendChild(card);
  });
}

function createReadCheckbox(book, key) {
  let checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = book[key];
  checkbox.addEventListener('click', toggleRead);
  return checkbox;
}

function createRemoveButton(book) {
  let removeItem = document.createElement('div');
  removeItem.classList.add('remove');
  let removeIcon = document.createElement('img');
  removeIcon.src = 'img/trashcan.svg';
  removeIcon.style.width = '18px';
  removeIcon.style.height = 'auto';
  removeItem.appendChild(removeIcon);
  removeItem.dataset.bookId = myLibrary.books.indexOf(book);
  removeItem.addEventListener('click', removeBook);
  return removeItem;
}

function removeBook() {
  let bookId = this.dataset.bookId;
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
    addField('nbread', 'read', 'checked', false)
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

function addElementObject(text, key) {
  return {text, key};
}

function addField(id, key, valueType, isMandatory) {
  return {id, key, valueType, isMandatory};
}