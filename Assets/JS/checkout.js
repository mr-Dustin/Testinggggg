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

            itemContainer.appendChild(itemImage);
            itemContainer.appendChild(itemName);
            itemContainer.appendChild(itemPrice);

            cartContainer.appendChild(itemContainer);
        });
    } else {
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Your cart is empty.';
        cartContainer.appendChild(emptyCartMessage);
    }

    const checkoutButton = document.getElementById('checkout-btn');
    checkoutButton.addEventListener('click', function() {
        const paymentMethod = document.getElementById('payment-method').value;
        const transactionId = document.getElementById('transaction-id').value;
        const paymentAmount = document.getElementById('payment-amount').value;

        // Perform payment processing and save transaction details here

        openAlert('Payment Successful!', `Transaction ID: ${transactionId}, Amount Paid: ${paymentAmount}`);
    });
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
