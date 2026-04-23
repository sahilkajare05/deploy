let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function displayNotes() {
  const notesList = document.getElementById("notesList");
  notesList.innerHTML = "";

  notes.forEach((note, index) => {
    const div = document.createElement("div");
    div.className = "note";

    const text = document.createElement("span");
    text.textContent = note;

    const btnContainer = document.createElement("div");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editNote(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteNote(index);

    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    div.appendChild(text);
    div.appendChild(btnContainer);

    notesList.appendChild(div);
  });
}

function addNote() {
  const input = document.getElementById("noteInput");

  if (input.value.trim() === "") {
    alert("Please enter a note");
    return;
  }

  notes.push(input.value);
  saveNotes();
  input.value = "";
  displayNotes();
}

function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  displayNotes();
}

function editNote(index) {
  const updated = prompt("Edit note:", notes[index]);

  if (updated !== null && updated.trim() !== "") {
    notes[index] = updated;
    saveNotes();
    displayNotes();
  }
}

// Initial load
displayNotes();

// Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js")
    .then(() => console.log("SW Registered"))
    .catch(err => console.log("SW Error", err));
}