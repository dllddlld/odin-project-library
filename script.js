let myLibrary = new Library();
let table = document.querySelector('.table');
let form = document.querySelector('form');

addPageListeners();

function addToDisplay(book) {
  let keys = ['title', 'author', 'pageCount', 'read'];
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

function addPageListeners() {
  let newBookButton = document.querySelector('#add-nb');
  let submitBookButton = form.querySelector('#nbsubmit');
  let cancelBookButton = form.querySelector('#nbcancel');
  newBookButton.addEventListener('click', togglePopup);
  submitBookButton.addEventListener('click', submitForm);
  cancelBookButton.addEventListener('click', togglePopup);
  form.addEventListener('submit', function(e) {
    e.preventDefault();
  })
}

function togglePopup() {
  console.log('toggle popup');
  let modalContainer = document.querySelector('.modal-container');
  let modalPopup = modalContainer.querySelector('.modal-popup');
  if (this.id === 'add-nb') {
    modalContainer.style.display = 'flex';
    setTimeout(function() {
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
    setTimeout(function() {
      modalPopup.classList.remove('open');
    });
    setTimeout(function() {
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
  console.log(fields);
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
  console.log(bookParams);
  let book = new Book(bookParams);
  book.addToLibrary();
  addToDisplay(book);
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