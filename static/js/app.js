document.addEventListener('DOMContentLoaded', () => {
    loadUsers();

    const userForm = document.getElementById('user-form');
    userForm.addEventListener('submit', handleSubmit);
});

async function loadUsers() {
    const response = await fetch('/api/users/');
    const users = await response.json();
    const usersTable = document.getElementById('users-table').querySelector('tbody');
    usersTable.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td class="actions">
                <button class="edit" onclick="editUser(${user.id})">Edit</button>
                <button onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        usersTable.appendChild(row);
    });
}

async function handleSubmit(event) {
    event.preventDefault();

    const userId = document.getElementById('user-id').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const data = { name, email };
    let url = '/api/users/';
    let method = 'POST';

    if (userId) {
        url += userId;
        method = 'PATCH';
    }

    await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    loadUsers();
    userForm.reset();
}

async function editUser(id) {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();

    document.getElementById('user-id').value = user.id;
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
}

async function deleteUser(id) {
    await fetch(`/api/users/${id}`, {
        method: 'DELETE',
    });

    loadUsers();
}
