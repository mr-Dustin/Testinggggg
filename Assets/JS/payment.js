document.getElementById('checkoutForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    let fullname = document.getElementById('fullname').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let paymentMethod = document.getElementById('paymentMethod').value;
    let cardnumber = document.getElementById('cardNumber').value;
    let expirationdate = document.getElementById('expiryDate').value;
    let cvv = document.getElementById('cvv').value;

    if (fullname.trim() === '' || email.trim() === '' || phone.trim() === '' || address.trim() === '' || paymentMethod === '' || cardnumber.trim() === '' || expirationdate.trim() === '' || cvv.trim() === '') {
        alert('Please fill in all fields');
        return false;
    }

    // Assuming transaction data format: "date,Time,name,price"
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const transactionData = `${currentDate},${currentTime},${fullname},${calculateTotalPrice()}`;

    // Save transaction data to localStorage
    const playerEmail = localStorage.getItem("CurrentLogin");
    let transactions = localStorage.getItem(`${playerEmail}transactionData`) ? localStorage.getItem(`${playerEmail}transactionData`).split(';') : [];
    transactions.push(transactionData);
    localStorage.setItem(`${playerEmail}transactionData`, transactions.join(';'));

    // Optionally, you can redirect to a success page or perform other actions here
    alert('Payment successful! Transaction recorded.');

    // Clear the form after successful submission
    document.getElementById('checkoutForm').reset();
	window.location.href = '../../index.html';
});

// Function to calculate total price (adjust as needed)
function calculateTotalPrice() {
    // Placeholder function to calculate total price based on selected items or form data
    return 100; // Example total price
}
