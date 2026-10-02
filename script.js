const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const noteCategory = document.getElementById('note-category');
const notesList = document.getElementById('notes-list');

let notes = [];

function render() {
  notesList.innerHTML = '';
  notes.forEach(note => {
    const li = document.createElement('li');
    li.classList.add(`category-${note.category.toLowerCase()}`);
    
    const headerDiv = document.createElement('div');
    headerDiv.className = 'note-header';
    
    const catLabel = document.createElement('span');
    catLabel.className = 'note-category-label';
    catLabel.textContent = note.category;
    
    const dateSpan = document.createElement('span');
    dateSpan.textContent = note.createdAt;
    
    headerDiv.appendChild(catLabel);
    headerDiv.appendChild(dateSpan);
    
    const textP = document.createElement('p');
    textP.className = 'note-text';
    textP.textContent = note.text;
    
    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = 'Delete';
    
    li.appendChild(headerDiv);
    li.appendChild(textP);
    li.appendChild(delBtn);
    
    notesList.appendChild(li);
  });
}

noteForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const text = noteInput.value;
  const category = noteCategory.value;
  
  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };
  
  notes.push(newNote);
  render();
  noteInput.value = '';
});
