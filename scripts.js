document.addEventListener('DOMContentLoaded', (event) => {
    const itemInput = document.getElementById('itemInput');
    const shoppingList = document.getElementById('shoppingList');

    // Load items from localStorage
    const savedItems = JSON.parse(localStorage.getItem('shoppingList')) || [];
    savedItems.forEach(itemText => {
        createListItem(itemText);
    });

    itemInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addItem();
        }
    });

    window.addItem = function() {
        const itemText = itemInput.value.trim();
        if (itemText === '') return;

        createListItem(itemText);
        saveItem(itemText);
        itemInput.value = '';
        itemInput.focus();
    };

    function createListItem(itemText) {
        const listItem = document.createElement('li');
        const itemSpan = document.createElement('span');
        itemSpan.textContent = itemText;
        listItem.appendChild(itemSpan);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remover';
        deleteButton.onclick = function() {
            shoppingList.removeChild(listItem);
            removeItem(itemText);
        };
        listItem.appendChild(deleteButton);

        shoppingList.appendChild(listItem);
    }

    function saveItem(itemText) {
        const items = JSON.parse(localStorage.getItem('shoppingList')) || [];
        items.push(itemText);
        localStorage.setItem('shoppingList', JSON.stringify(items));
    }

    function removeItem(itemText) {
        let items = JSON.parse(localStorage.getItem('shoppingList')) || [];
        items = items.filter(item => item !== itemText);
        localStorage.setItem('shoppingList', JSON.stringify(items));
    }
});
