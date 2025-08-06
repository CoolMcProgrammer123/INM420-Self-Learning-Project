// Enable drag-and-drop with Sortable.js
document.querySelectorAll('.task-list').forEach(list => {
  new Sortable(list, {
    group: 'shared',
    animation: 150
  });
});

// Add new task button functionality
document.querySelectorAll('.add-task-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const column = btn.closest('.column');
    const list = column.querySelector('.task-list');

    const li = document.createElement('li');
    li.className = 'task';
    li.contentEditable = true;
    li.textContent = '';
    list.appendChild(li);
    li.focus();

    const finishEditing = () => {
      const text = li.textContent.trim();

      if (text === '') {
        li.remove(); // delete if empty
      } else {
        li.contentEditable = false;
      }

      li.removeEventListener('blur', finishEditing);
      li.removeEventListener('keydown', handleKey);
    };

    const handleKey = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        li.blur(); // triggers finishEditing
      }
    };

    li.addEventListener('blur', finishEditing);
    li.addEventListener('keydown', handleKey);
  });
});
