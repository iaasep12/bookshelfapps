const UNCOMPLETED_SHELF_BOOKS_ID = "incompleteBookshelfList";

const COMPLETED_SHELF_BOOKS_ID = "completeBookshelfList";

const SHELF_ITEMID = "itemId";

// add Input Data Book
function addBookShelf(event) {
    const unCompletedList = document.getElementById(UNCOMPLETED_SHELF_BOOKS_ID);
    const completedList = document.getElementById(COMPLETED_SHELF_BOOKS_ID);

    const textBook = document.getElementById("inputTitleBook").value;
    const textAuthor = document.getElementById("inputAuthorBook").value;
    const yearBook = document.getElementById("inputBookYear").value;

    console.log("Judul:"+ "" + textBook);
    console.log("Penulis:"+ "" + textAuthor);
    console.log("Tahun:"+ "" + yearBook);

    // checkbox
    const checkbox = document.getElementById("inputBookIsComplete");
    let shelfBook = "";
        // display jumlah buku
        const bookCount = document.getElementById("count");

    if (checkbox.checked) {
        shelfBook = makeBookRak(textBook, textAuthor, yearBook, true)
        completedList.append(shelfBook);
        bookCount.innerText++;
        
    } else {
        shelfBook = makeBookRak(textBook, textAuthor, yearBook, false);
        unCompletedList.append(shelfBook);
        bookCount.innerText++;
    }

    const shelfBookObject = composeShelfObject(textBook, textAuthor, yearBook, false);
    shelfBook[SHELF_ITEMID] = shelfBookObject.id;
    shelfs.push(shelfBookObject);

    updateDataToStorage();
}

// make elemenShelfBook
function makeBookRak(title, author, years, isCompleted) {
    const titleBook = document.createElement("h3");
    titleBook.innerText = title;

    const authorBook = document.createElement("p");
    authorBook.classList.add("authorBook")
    authorBook.innerText = author;

    const bookYear = document.createElement("p");
    bookYear.classList.add("bookYear");
    bookYear.innerText = years;

    const elemenBookShelf = document.createElement("article");
    elemenBookShelf.classList.add("book_item");
    elemenBookShelf.append(titleBook, authorBook, bookYear);

    if(isCompleted) {
        elemenBookShelf.append(createUnReadButton(), createDeletedBook());
    } else {
        elemenBookShelf.append(createEndReadButton(), createDeletedBook());
    }

    return elemenBookShelf;

}

// checkbox
function checkbox() {
    const checkbox = document.getElementById("inputBookIsComplete");
    const textSpan = document.getElementById("spanIscompleted");

    checkbox.addEventListener("click", function(){

        if(checkbox.checked == false) {
            textSpan.innerText = "Belum selesai dibaca";
        } else {
            textSpan.innerText = "Selesai dibaca";
        }
        
    })
}

function createButton(buttonTypeClass , textButton, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.innerText = textButton;

    button.addEventListener("click", function (event) {
        eventListener(event);
        event.stopPropagation();
    });

    return button;
}

function addTaskToCompleted(taskElement) {
    const completed = document.getElementById(COMPLETED_SHELF_BOOKS_ID);

    const textBook = taskElement.querySelector(".book_item > h3").innerText;
    const textAuthor = taskElement.querySelector(".book_item > .authorBook").innerText;
    const yearBook = taskElement.querySelector(".book_item > .bookYear").innerText;
    
    const newElementBook = makeBookRak(textBook, textAuthor, yearBook, true);

    const shelf = findBook(taskElement[SHELF_ITEMID]);
    shelf.isCompleted = true;
    newElementBook[SHELF_ITEMID] = shelf.id;

    completed.append(newElementBook);

    taskElement.remove();

    updateDataToStorage();
} 

function createEndReadButton() {
    return createButton("green", "Selesai Dibaca", function(event){
        addTaskToCompleted(event.target.parentElement);
    })
}

function createDeletedBook() {
    return createButton("red", "Hapus Buku", function (event) {
        removeTaskFromCompleted(event.target.parentElement);
    })
}

function removeTaskFromCompleted(taskElement) {
    const shelfPosition = findBookIndex(taskElement[SHELF_ITEMID]);
    shelfs.splice(shelfPosition, 1);

    taskElement.remove();

    // hapus display Jumlah Buku
    const bookCount = document.getElementById("count");
    bookCount.innerText--;

    updateDataToStorage();
}

function createUnReadButton() {
    return createButton("green", "Belum Selesai", function(event){
        undoTaskFromCompleted(event.target.parentElement);
    });
}

function undoTaskFromCompleted(taskElement){

    const unCompletedList = document.getElementById(UNCOMPLETED_SHELF_BOOKS_ID);

    const textBook = taskElement.querySelector(".book_item > h3").innerText;
    const textAuthor = taskElement.querySelector(".book_item > .authorBook").innerText;
    const yearBook = taskElement.querySelector(".book_item > .bookYear").innerText;
     
    const newElementBook = makeBookRak(textBook, textAuthor, yearBook, false);

    const shelf = findBook(taskElement[SHELF_ITEMID]);
    shelf.isCompleted = false;
    newElementBook[SHELF_ITEMID] = shelf.id;

    unCompletedList.append(newElementBook);

    taskElement.remove();

    updateDataToStorage();
}

// form melayang
const userForm = document.querySelector(".input_section");
const addFormBook = document.getElementById("add-button");
const spanClick = document.getElementById("close");

addFormBook.onclick = function() {
    userForm.style.display="block";
}

spanClick.onclick = function () {
    userForm.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == user) {
        userForm.style.display = "none";
    }
}
