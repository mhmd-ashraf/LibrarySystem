class Book{
    constructor(author, title, numOfPages) {
        this.author = author;
        this.title = title;
        this.numOfPages = numOfPages;
    }
}

class Lists{
    static displayBook(){
        const bookList = Store.getBook();
        bookList.forEach((bookList) => Lists.addBookToLists(book));
    };
    
    static addBookToLists(book) {
        const list = document.querySelector('#bookList');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.author}</td>
            <td>${book.title}</td>
            <td>${book.numOfPages}</td>
            <td><a href="#"><i class="fa-solid fa-trash remove"></i></a></td>`;
        list.appendChild(row);
    }
    static remove(el) {
        if (el.classList.contains('remove')) {
            el.parentElement.parentElement.parentElement.remove();
        }
    }

    static clear() {
        document.querySelector('#author').value = '';
        document.querySelector('#title').value = '';
        document.querySelector('#numOfPages').value = '';

    }
}

class Store{
    static getBook() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
    const books = Store.getBook();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
    }

    static removeAnyBook(numOfPages) {
        const books = Store.getBook();

        books.forEach((book, index) => {
            if (book.numOfPages == numOfPages) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.addEventListener('DOMContentLoaded', Lists.displayBook);

document.querySelector('#bookForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const author = document.querySelector('#author').value;
    const title = document.querySelector('#title').value;
    const numOfPages = document.querySelector('#numOfPages').value;

    if (author === '' || title === '' || numOfPages === '') {
        alert("Please Enter All Data");
    }
    else {
        const book = new Book(author, title, numOfPages);
        Lists.addBookToLists(book);
        Store.addBook(book);
        Lists.clear();
    }
});

document.querySelector('#bookList').addEventListener('click', (e) => { 
    Lists.remove(e.target);
    Store.removeAnyBook(e.target.parentElement.parentElement.previousElementSibling.textContent);
    Lists.clear();
});

// function deletebook(index) {
//     let getlocalstorage = localStorage.getItem("remove");
//     listArr = JSON.parse(getlocalstorage);
//     listArr.splice(index, 1);
//     localStorage.setItem("remove", JSON.stringify(listArr));
// }
