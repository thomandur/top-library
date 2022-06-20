class Book {
  constructor(
    id = 0,
    name = 'Unknow',
    author = 'Unknow',
    pages = 0,
    read = false
  ) {
    this.id = id
    this.name = name
    this.author = author
    this.pages = pages
    this.read = read
  }
}

class Library {
  constructor() {
    this.books = []
  }
  addBook(newBook) {
    this.books.push(newBook)
  }
  getBooks() {
    return this.books
  }
  deleteBook(book) {
    //TODO
  }
  isRead(){
    const unread = [] 
    const read = []
    for(let book of this.books){
      book.read === 'true' ? read.push(book) : unread.push(book)
    }
    return { unread, read }
  }
  length() {
    return this.books.length
  }
  changeState(id) {
    return this.read === 'true' ? this.read = false : this.read = true
  }
}

const myLibrary = new Library()

const addBookForm = document.getElementById('submitButton')
const cardContainer = document.getElementById('cards-container')
const newBookCard = document.getElementById('addBookForm')
const actualCards = document.getElementsByClassName('card')
const statRead = document.querySelector('#read > span')
const statUnread = document.querySelector('#unread > span')
const btnRead = document.querySelector('#btnRead')
const btnUnread = document.querySelector('#btnUnread')
const cardBtn = document.querySelectorAll('.card-controls')

// Initial DOM

const renderReadBook = () => {

}

const getBookInputs = () => {
  var id = (myLibrary.length() === 0) ? 0 : myLibrary.length()
  var name = document.querySelector('[name="title"]').value
  var author = document.querySelector('[name="author"]').value
  var pages = document.querySelector('[name="pages"]').value
  var read = document.querySelector('[name="read"]:checked').value

  var book = new Book(id, name, author, pages, read)

  return book
}

const cardTemplate = (id ,name, author, pages, read) => {
  const bookReaded = read != 'read' ? 'I read this book' : 'I didnt read this book'
  const card = `<div class="card-info">
          <p class="name">${name}</p>
          <p class="author">${author}</p>
          <p class="pages">${pages} pages</p>
        </div>
        <div class="card-controls">
          <button data-index="${id}">
          ${bookReaded}
          </button>
        </div>`
  return card
}

const allBooks = () => {
  while(cardContainer.firstChild !== newBookCard){
    cardContainer.removeChild(cardContainer.firstChild)
  }
  for(let book of myLibrary.getBooks()) {
    var isRead = book.read === 'true' ? 'read':'unread'

    var articleCard = document.createElement('article')
    articleCard.classList.add('card')
    articleCard.classList.add(isRead)
    var cardInfo = cardTemplate(book.id, book.name, book.author, book.pages, isRead)

    
    articleCard.innerHTML = cardInfo
    cardContainer.insertBefore(articleCard, newBookCard)
  }
}

const statBook = (state) =>{
  return state === 'read' ? myLibrary.isRead().read : myLibrary.isRead().unread
}

addBookForm.addEventListener('click', (e) => {
  e.preventDefault()

  const newBook = getBookInputs()
  myLibrary.addBook(newBook)

  // View
  statRead.innerHTML = statBook('read').length
  statUnread.innerHTML = statBook('unread').length
  this.cardBtn = document.querySelectorAll('.card-controls > button')
  this.cardBtn.forEach(element => {
    element.addEventListener('click', this.changeState())
  });
  // console.log(this.cardBtn)
  allBooks()
})



// Initialize view
statRead.innerHTML = statBook('read').length
statUnread.innerHTML = statBook('unread').length

const DOMswitch = (radio) => {
  var read = document.querySelectorAll('input[type="radio"]')
  radio === 1 ? read[0].checked = true: read[1].checked = true
}

btnRead.addEventListener('click', function(){
  document.getElementById('checkRead').checked = true
  this.classList.add('active')
  btnUnread.classList.remove('active')
})
btnUnread.addEventListener('click', function(){
  document.getElementById('checkUnread').checked = true
  this.classList.add('active')
  btnRead.classList.remove('active')
})
