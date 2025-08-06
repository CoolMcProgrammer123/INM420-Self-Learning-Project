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
    li.setAttribute('draggable', 'false'); // disable drag while editing

    // Title input
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Title';
    titleInput.className = 'task-input title';

    // Body input
    const bodyInput = document.createElement('textarea');
    bodyInput.placeholder = 'Body';
    bodyInput.className = 'task-input body';

    // Button container
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'flex-end';
    buttonContainer.style.gap = '10px';

    // Add button
    const addBtn = document.createElement('button');
    addBtn.textContent = 'Add';
    addBtn.className = 'task-action-btn';

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'task-action-btn';

    // Add event: Confirm task
    addBtn.addEventListener('click', () => {
      const title = titleInput.value.trim();
      const body = bodyInput.value.trim();

      if (title === '' && body === '') {
        li.remove(); // don't add empty
        return;
      }

      li.innerHTML = `<h3>${title}</h3><p>${body}</p>`;
      li.setAttribute('draggable', 'true');
    });

    // Delete event
    deleteBtn.addEventListener('click', () => {
      li.remove();
    });

    // If both inputs are empty and blurred, auto-delete
    const handleAutoDelete = () => {
      const title = titleInput.value.trim();
      const body = bodyInput.value.trim();

      if (title === '' && body === '') {
        li.remove();
      }
    };

    titleInput.addEventListener('blur', handleAutoDelete);
    bodyInput.addEventListener('blur', handleAutoDelete);

    // Add buttons
    buttonContainer.appendChild(addBtn);
    buttonContainer.appendChild(deleteBtn);

    // Assemble the task
    li.appendChild(titleInput);
    li.appendChild(bodyInput);
    li.appendChild(buttonContainer);
    list.appendChild(li);

    titleInput.focus();
  });
});
