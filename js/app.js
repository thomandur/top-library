let myLibrary = [];

function Book(id, name, author, pages, read) {
  this.id = id
  this.name = name
  this.author = author
  this.pages = pages
  this.read = read
}

Book.prototype.render = function() {
  // crée un nouvel élément div
  var newDiv = document.createElement('div')
  var newContent = document.createTextNode(this.name + ', ' + this.author + ', ' + this.pages + 'pages, ' + this.read)
  var currentDiv = document.getElementById('test')

  newDiv.classList.add('book')
  newDiv.appendChild(newContent)
  currentDiv.appendChild(newDiv)
  console.table(this)
}

function addBookToLibrary() {
  // params
  var name = document.querySelector('[name="title"]').value
  var author = document.querySelector('[name="author"]').value
  var pages = document.querySelector('[name="pages"]').value
  var read = document.querySelector('[name="read"]:checked').value

  // create objecy
  var book = new Book(name, author, pages, read)
  myLibrary.push(book)
  book.render()
}

