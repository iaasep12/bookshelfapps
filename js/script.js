const STORAGE_KEY = "SHELF_APPS";
 	
let shelfs = [];
 
function isStorageExist() /* boolean */ {
   if(typeof(Storage) === undefined){
       alert("Browser kamu tidak mendukung local storage");
       return false
   }
   return true;
}
 	
function saveData() {
   const parsed = JSON.stringify(shelfs);
   localStorage.setItem(STORAGE_KEY, parsed);
   document.dispatchEvent(new Event("ondatasaved"));
}
 	
function loadDataFromStorage() {
   const serializedData = localStorage.getItem(STORAGE_KEY);
   
   let data = JSON.parse(serializedData);
   
   if(data !== null)
       shelfs = data;
 
   document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
   if(isStorageExist())
       saveData();
}


function composeShelfObject(textBook, textAuthor, yearBook, isCompleted) {
   return {
       id: +new Date(),
       textBook,
       textAuthor,
       yearBook,
       isCompleted
   };
}
 
function findBook(bookfId) {
   for(shelfBook of shelfs){
       if(shelfBook.id === bookfId)
           return shelfBook;
   }
   return null;
}
 
function findBookIndex(bookfId) {
   let index = 0
   for (shelfBook of shelfs) {
       if(shelfBook.id === bookfId)
           return index;
 
       index++;
   }
 
   return -1;
}

function refreshDataFromShelf() {
    const unCompleted = document.getElementById(UNCOMPLETED_SHELF_BOOKS_ID);

    const completed = document.getElementById(COMPLETED_SHELF_BOOKS_ID);

    for(shelfBook of shelfs) {
        const newShelf = makeBookRak(shelfBook.textBook, shelfBook.textAuthor, shelfBook.yearBook, shelfBook.isCompleted);
        newShelf[SHELF_ITEMID] = shelfBook.id;

        if(shelfBook.isCompleted) {
            completed.append(newShelf);
        } else {
            unCompleted.append(newShelf);
        }
    }
}