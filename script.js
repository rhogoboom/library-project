// Global Variables
let myLibrary = []
const container = document.querySelector(".main-content");
const bookButton = document.querySelector(".add-book-btn")
const addBookModal = document.querySelector(".add-book-modal")
const bookForm = document.querySelector(".add-book-form")
const bookSubmit = document.querySelector(".add-book")



// Book Constructor and Prototype Function

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${!this.read ? "not yet read": "read"}.`
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}


// Event Handler Functions
const openBookModal = function() {
    bookForm.reset()
    addBookModal.style.display = 'block';
}
// Need to fix
const closeBookModal = function(e) {
    // console.log(e.target);
    // if (e.target !== addBookModal && addBookModal.style.display != "none") {
    //    addBookModal.style.display = 'none'; 
    // }
    if (e.key == "Escape") {
        addBookModal.style.display = 'none';
    }
    
}

function displayLibrary(myLibrary, container) {
    container.innerHTML = '';
    for (const [index, book] of myLibrary.entries()) {
        const newCard = document.createElement("div");
        newCard.dataset.index = index;
        newCard.classList.add("card")
        const removeButton = document.createElement("button");
        removeButton.classList.add("remove-button");
        removeButton.textContent = "x"
        removeButton.addEventListener('click', removeBook);
        const newList = document.createElement("ul");
        const title = document.createElement("li");
        title.textContent = `"${book.title}"`;
        title.classList.add('book-title');
        const author = document.createElement("li");
        author.textContent = book.author;
        const pages = document.createElement("li");
        pages.textContent = `${book.pages} pages`;
        const readDiv = document.createElement("li");
        const readButton = document.createElement("button")
        readButton.type = 'button'
        readButton.classList.add("read-button")
        if (book.read == true) {
            readButton.classList.add('read-true')
            readButton.textContent = "Read";
        } else {
            readButton.classList.add('read-false');
            readButton.textContent = "Not Read";
        }
        readButton.addEventListener('click', toggleRead);
        newList.appendChild(title);
        newList.appendChild(author);
        newList.appendChild(pages);
        readDiv.appendChild(readButton);
        newList.appendChild(readDiv);
        newCard.appendChild(removeButton);
        newCard.appendChild(newList);
        container.appendChild(newCard);
    }
}

const validateData = function(book) {
    return book.title != '' && book.author != '' && book.pages != '';
}

const getBookData = function() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    return new Book(title, author, pages, read);

}

const addBookToLibrary = function(book) {
    myLibrary.push(book);
}


const handleBookSubmit = function(e) {
    e.preventDefault();
    let book = getBookData();
    if (!validateData(book)) {
        return;
    }
    addBookToLibrary(book);
    addBookModal.style.display = 'none';
    displayLibrary(myLibrary, container);
}

const removeBook = function(e) {
    const parentDivIndex = e.target.parentNode.dataset.index;
    myLibrary.splice(parentDivIndex, 1);
    displayLibrary(myLibrary, container);
}

const toggleRead = function(e) {
    const parentDivIndex = e.target.parentNode.parentNode.parentNode.dataset.index;
    myLibrary[parentDivIndex].toggleRead();
    displayLibrary(myLibrary, container);
}

// Event listeners
window.addEventListener('keydown', closeBookModal)
bookButton.addEventListener('click', openBookModal);
bookSubmit.addEventListener('click', handleBookSubmit);




// For testing purposes, delete later
const hobbit = new Book("Hobbit", "J.R.R. Tolkein", 3, false)
const dune = new Book("Dune", "Frank Herbert", 173, false)
const search = new Book("In Search of Lost Time", "Marcel Proust", 50000, true)

addBookToLibrary(hobbit);
addBookToLibrary(dune);
addBookToLibrary(search);

displayLibrary(myLibrary, container);