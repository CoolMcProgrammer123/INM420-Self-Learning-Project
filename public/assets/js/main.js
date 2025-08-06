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
    li.setAttribute('draggable', 'false'); // Temporarily disable dragging while editing

    // Create input elements
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Title';
    titleInput.className = 'task-input title';

    const bodyInput = document.createElement('textarea');
    bodyInput.placeholder = 'Body';
    bodyInput.className = 'task-input body';

    // Append to task
    li.appendChild(titleInput);
    li.appendChild(bodyInput);
    list.appendChild(li);

    titleInput.focus();

    // Blur tracking
    let titleBlurred = false;
    let bodyBlurred = false;

    const finishEditing = () => {
      if (!titleBlurred || !bodyBlurred) return;

      const title = titleInput.value.trim();
      const body = bodyInput.value.trim();

      if (title === '' && body === '') {
        li.remove(); // delete if empty
      } else {
        li.innerHTML = `<h3>${title}</h3><p>${body}</p>`;
        li.setAttribute('draggable', 'true'); // Re-enable dragging
      }
    };

    // Event handlers
    titleInput.addEventListener('blur', () => {
      titleBlurred = true;
      finishEditing();
    });

    bodyInput.addEventListener('blur', () => {
      bodyBlurred = true;
      finishEditing();
    });

    bodyInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        bodyInput.blur(); // triggers finish
      }
    });
  });
});
