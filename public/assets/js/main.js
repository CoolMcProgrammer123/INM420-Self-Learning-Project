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
        li.setAttribute('draggable', 'false'); // Disable drag while editing

        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.placeholder = 'Title';
        titleInput.className = 'task-input title';

        const bodyInput = document.createElement('textarea');
        bodyInput.placeholder = 'Body';
        bodyInput.className = 'task-input body';

        // Auto-layout container
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'task-controls';

        // Delete button (icon only)
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '🗑️'; // Or use <img> if you have an icon

        // Add button (fills rest)
        const addBtn = document.createElement('button');
        addBtn.className = 'add-btn';
        addBtn.textContent = 'Add';

        // Add button functionality
        addBtn.addEventListener('click', () => {
            const title = titleInput.value.trim();
            const body = bodyInput.value.trim();

            if (title === '' && body === '') {
                li.remove();
                return;
            }

            li.innerHTML = '';
            if (title !== '') {
                const h3 = document.createElement('h3');
                h3.textContent = title;
                li.appendChild(h3);
            }
            if (body !== '') {
                const p = document.createElement('p');
                p.textContent = body;
                li.appendChild(p);
            }

            li.setAttribute('draggable', 'true');
        });

        // Delete button functionality
        deleteBtn.addEventListener('click', () => {
            li.remove();
        });

        // Auto-delete if empty on blur
        const handleAutoDelete = () => {
            if (titleInput.value.trim() === '' && bodyInput.value.trim() === '') {
                li.remove();
            }
        };

        titleInput.addEventListener('blur', handleAutoDelete);
        bodyInput.addEventListener('blur', handleAutoDelete);

        buttonContainer.appendChild(deleteBtn);
        buttonContainer.appendChild(addBtn);

        li.appendChild(titleInput);
        li.appendChild(bodyInput);
        li.appendChild(buttonContainer);
        list.appendChild(li);

        titleInput.focus();
    });
});
