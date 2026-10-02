const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const noteCategory = document.getElementById('note-category');
const notesList = document.getElementById('notes-list');
const errorMessage = document.getElementById('error-message');
const noteCount = document.getElementById('note-count');
const searchInput = document.getElementById('search-input');
const clearAllBtn = document.getElementById('clear-all');

let notes = JSON.parse(localStorage.getItem('quicknotes')) || [];

function saveNotes() {
  localStorage.setItem('quicknotes', JSON.stringify(notes));
}

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = 'You have no notes yet.';
  } else if (notes.length === 1) {
    noteCount.textContent = 'You have 1 note.';
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

function render(filterText = '') {
  notesList.innerHTML = '';
  
  const filteredNotes = notes.filter(note => 
    note.text.toLowerCase().includes(filterText.toLowerCase())
  );
  
  if (filterText !== '' && filteredNotes.length === 0) {
    const noMatch = document.createElement('li');
    noMatch.textContent = 'No notes match your search.';
    noMatch.style.textAlign = 'center';
    noMatch.style.color = '#7f8c8d';
    notesList.appendChild(noMatch);
  } else {
    filteredNotes.forEach(note => {
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
      delBtn.addEventListener('click', () => {
        notes = notes.filter(n => n.id !== note.id);
        saveNotes();
        render(searchInput.value);
      });
      
      li.appendChild(headerDiv);
      li.appendChild(textP);
      li.appendChild(delBtn);
      
      notesList.appendChild(li);
    });
  }
  
  updateCount();
  
  if (notes.length > 0) {
    clearAllBtn.style.display = 'inline-block';
  } else {
    clearAllBtn.style.display = 'none';
  }
}

noteForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const text = noteInput.value;
  
  if (text.trim() === '') {
    errorMessage.textContent = 'Please type a note first.';
    return;
  }
  
  if (text.length > 200) {
    errorMessage.textContent = 'Notes must be 200 characters or fewer.';
    return;
  }
  
  errorMessage.textContent = '';
  
  const category = noteCategory.value;
  
  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };
  
  notes.push(newNote);
  saveNotes();
  render(searchInput.value);
  noteInput.value = '';
});

searchInput.addEventListener('input', (e) => {
  render(e.target.value);
});

clearAllBtn.addEventListener('click', () => {
  if (confirm('Delete all notes?')) {
    notes = [];
    saveNotes();
    render();
  }
});

render();
