document.getElementById('auth-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'Teke_Love' && password === '12345678') {
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('key-container').style.display = 'block';
    } else {
        alert('Неправильное имя пользователя или пароль!');
    }
});

document.getElementById('generate-key').addEventListener('click', function() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let key = '';
    for (let i = 0; i < 45; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const duration = document.getElementById('key-duration').value;
    const keyOutput = document.getElementById('key-output');
    keyOutput.innerText = `${key} (длительность: ${duration} дней)`;

    const inactiveKeys = document.getElementById('inactive-keys');
    const li = document.createElement('li');
    li.className = 'key-item';
    li.dataset.duration = duration;
    li.dataset.createdAt = Date.now();
    li.innerHTML = `
        <span>${key}</span>
        <button onclick="activateKey(this)">Активировать</button>
    `;
    inactiveKeys.appendChild(li);
});

function activateKey(button) {
    const keyItem = button.parentElement;
    const key = keyItem.querySelector('span').innerText;
    const duration = keyItem.dataset.duration;
    const createdAt = keyItem.dataset.createdAt;

    keyItem.remove();

    const activeKeys = document.getElementById('active-keys');
    const li = document.createElement('li');
    li.className = 'key-item';
    li.dataset.duration = duration;
    li.dataset.createdAt = createdAt;
    li.innerHTML = `
        <span>${key} (длительность: ${duration} дней)</span>
        <button onclick="deactivateKey(this)">Деактивировать</button>
    `;
    activeKeys.appendChild(li);

    setTimeout(() => {
        if (document.body.contains(li)) {
            li.remove();
        }
    }, duration * 24 * 60 * 60 * 1000); // Удаление после окончания срока действия
}

function deactivateKey(button) {
    const keyItem = button.parentElement;
    const key = keyItem.querySelector('span').innerText;
    const duration = keyItem.dataset.duration;
    const createdAt = keyItem.dataset.createdAt;

    keyItem.remove();

    const inactiveKeys = document.getElementById('inactive-keys');
    const li = document.createElement('li');
    li.className = 'key-item';
    li.dataset.duration = duration;
    li.dataset.createdAt = createdAt;
    li.innerHTML = `
        <span>${key}</span>
        <button onclick="activateKey(this)">Активировать</button>
    `;
    inactiveKeys.appendChild(li);
}

function showSection(sectionId) {
    document.getElementById('inactive-keys-section').style.display = 'none';
    document.getElementById('active-keys-section').style.display = 'none';
    document.getElementById(`${sectionId}-section`).style.display = 'block';
}
