
// Navigation Handlers
document.getElementById("signInButton").onclick = () => {
    window.location.href = "login.html";
};

document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let totalAmount = 0;

    cart.forEach(item => {
        let itemElement = document.createElement("p");
        itemElement.textContent = `${item.name} - ₹${item.price}`;
        cartContainer.appendChild(itemElement);
        totalAmount += item.price;
    });

    document.getElementById("total-amount").textContent = totalAmount;

    document.getElementById("pay-now").addEventListener("click", function () {
        window.location.href = "paymentProcess.html"; // Redirect to Payment Page
        processPayment(cart, totalAmount);
    });
});

function processPayment(cart, totalAmount) {
    fetch("process_payment.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, totalAmount, userId: 1 }) // Example user ID
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Payment Successful! Redirecting...");
            localStorage.removeItem("cart");
            window.location.href = "home.html"; // Redirect to home page
        } else {
            alert("Payment Failed. Try again.");
        }
    })
    .catch(error => console.error("Error:", error));
}

document.getElementById("payment-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let email = document.getElementById("email").value;

    fetch("payment.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, cart: cart }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            alert("Payment successful!");
            localStorage.removeItem("cart");
            window.location.href = "home.html"; // Redirect to home page
        }
    })
    .catch(error => console.error("Error:", error));
});
