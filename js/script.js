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
}

const myLibrary = new Library()

const addBookForm = document.getElementById('submitButton')
const cardContainer = document.getElementById('cards-container')
const newBookCard = document.getElementById('addBookForm')
const actualCards = document.getElementsByClassName('card')
const statRead = document.querySelector('#read > span')
const statUnread = document.querySelector('#unread > span')

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

const cardTemplate = ( name, author, pages) => {
  var card = `<div class="card-info">
          <p class="name">${name}</p>
          <p class="author">${author}</p>
          <p class="pages">${pages} pages</p>
        </div>
        <div class="card-controls">
          <button>I read this book</button>
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
    articleCard.setAttribute('id', book.id)
    var cardInfo = cardTemplate(book.name, book.author, book.pages)

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
  allBooks()
})

// Initialize view
statRead.innerHTML = statBook('read').length
statUnread.innerHTML = statBook('unread').length