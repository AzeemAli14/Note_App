showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("add_Btn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("add_Text");
  let addTitle = document.getElementById("add_Title");
  let notes = localStorage.getItem("notes");

  if (notes == null) notesObj = [];
  else notesObj = JSON.parse(notes);

  let myObj = { 
    title: addTitle.value,
    text: addTxt.value
  }

  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";

  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");

  if (notes == null) notesObj = [];
  else notesObj = JSON.parse(notes);

  let html = "";

  notesObj.forEach(function (element, index) {
    html += `
    
      <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
        
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-outline-danger" style="20px";>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"></path>
            </svg>
            Delete Note
          </button>
        </div>
      </div>
    </div>`;
  });

  let notesElm = document.getElementById("notes");

  if (notesObj.length != 0) notesElm.innerHTML = html;
  else
    notesElm.innerHTML = `<h2>Nothing to show! Use "Write a Note" section above to add notes.<h2>`;
}

// Function to delete a note
function deleteNote(index) {
  let notes = localStorage.getItem("notes");

  if (notes == null) notesObj = [];
  else notesObj = JSON.parse(notes);

  notesObj.splice(index, 1);

  localStorage.setItem("notes", JSON.stringify(notesObj));

  showNotes();
}

let searchTxt = document.getElementById('search_txt');
searchTxt.addEventListener("input", function () {
  let input_Value = searchTxt.value.toLowerCase();
  let noteCards = document.getElementsByClassName('noteCard');
  Array.from(noteCards).forEach(function(element) {
    let cardtxt = element.getElementsByTagName("p")[0].innerText;
    if(cardtxt.includes(input_Value)) {
      element.style.display = "block";
    }
    else {
      element.style.display = "none";
    }
  })
})