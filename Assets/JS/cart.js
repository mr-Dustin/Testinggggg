
document.addEventListener("DOMContentLoaded", function() {
    const cartContainer = document.getElementById('cart-container');
    const playerEmail = localStorage.getItem("CurrentLogin");
    cartContainer.innerHTML = '';

    let cartItems = localStorage.getItem(`${playerEmail}CartItems`);
    if (cartItems) {
        cartItems = cartItems.split(';');

        cartItems.forEach(item => {
            const [name, price, image] = item.split(',');

            const itemContainer = document.createElement('div');
            itemContainer.classList.add('cart-item');

            const itemName = document.createElement('h3');
            itemName.textContent = name;
            itemName.style.fontSize = '16px';

            const itemPrice = document.createElement('span');
            itemPrice.textContent = price;
            itemPrice.style.fontSize = '16px';

            const itemImage = document.createElement('img');
            itemImage.src = image;
            itemImage.alt = name;

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('checkout-button');

            const checkoutButton = document.createElement('button');
            checkoutButton.textContent = 'Proceed to Payment';
            checkoutButton.addEventListener('click', function() {
                const currentDate = new Date();
                const dateTime = currentDate.toLocaleString(); // Get date and time
                const transactionData = {
                    dateTime: dateTime,
                    name: name,
                    price: price
                };

                let transactions = localStorage.getItem(`${playerEmail}transactionData`) ? localStorage.getItem(`${playerEmail}transactionData`).split(';') : [];
                transactions.push(`${transactionData.dateTime},${transactionData.name},${transactionData.price}`); // Save date, time, name, and price
                localStorage.setItem(`${playerEmail}transactionData`, transactions.join(';'));

                let updatedCartItems = localStorage.getItem(`${playerEmail}CartItems`).split(';');
                const itemIndex = updatedCartItems.findIndex(item => item === `${name},${price},${image}`);
                updatedCartItems.splice(itemIndex, 1);
                localStorage.setItem(`${playerEmail}CartItems`, updatedCartItems.join(';'));

                window.location.href = './payment.html';

                openAlert('Checkout Successful!', 'Your items have been successfully checked out.');
            });

            const cancelButton = document.createElement('button');
            cancelButton.textContent = 'Cancel';
            cancelButton.addEventListener('click', function() {
                let updatedCartItems = localStorage.getItem(`${playerEmail}CartItems`).split(';');
                const itemIndex = updatedCartItems.findIndex(item => item === `${name},${price},${image}`);
                updatedCartItems.splice(itemIndex, 1);
                localStorage.setItem(`${playerEmail}CartItems`, updatedCartItems.join(';'));

                itemContainer.remove(); // Remove the item from the cart view
                
                location.reload();
                
                openAlert('Item Removed', 'The item has been removed from your cart.');
            });

            buttonContainer.appendChild(checkoutButton);
            buttonContainer.appendChild(cancelButton);

            itemContainer.appendChild(itemImage);
            itemContainer.appendChild(itemName);
            itemContainer.appendChild(itemPrice);
            itemContainer.appendChild(buttonContainer);

            cartContainer.appendChild(itemContainer);
        });
    } else {
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Your cart is empty.';
        cartContainer.appendChild(emptyCartMessage);
    }
});

function openAlert(title, message) {
    const customAlert = document.getElementById('custom-alert');
    customAlert.querySelector('h2').textContent = title;
    customAlert.querySelector('p').textContent = message;
    customAlert.style.display = 'block';
}



function closeAlert() {
    document.getElementById('custom-alert').style.display = 'none';
}

