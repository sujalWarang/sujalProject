document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cartItems");
    const purchaseBtn = document.getElementById("purchaseBtn");
    const clearCartBtn = document.getElementById("clearCartBtn");

    // Function to get cart items from localStorage
    function getCart() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    // Function to save cart items to localStorage
    function saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    // Function to render cart items
    function renderCart() {
        const cart = getCart();
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>No items in your cart yet.</p>";
        } else {
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" width="50">
                    <span>${item.name} - $${item.price}</span>
                </div>
            `).join("");
        }
    }

    // Event Listener for Add to Cart buttons
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            const name = this.getAttribute("data-name");
            const price = parseFloat(this.getAttribute("data-price"));
            const image = this.getAttribute("data-image");

            let cart = getCart();
            cart.push({ id, name, price, image });
            saveCart(cart);
        });
    });

    // Event Listener for "Make Payment" button
    purchaseBtn.addEventListener("click", function () {
        window.location.href = "payment.html"; // Redirect to Payment Page
    });

    // Event Listener for "Clear Cart" button
    clearCartBtn.addEventListener("click", function () {
        localStorage.removeItem("cart");
        renderCart(); // Refresh cart display
    });

    // Load cart on page load
    renderCart();
});

// Handle Sign In & Sign Out
document.addEventListener("DOMContentLoaded", () => {
    const signInButton = document.getElementById("signInButton");

    if (!signInButton) return; // Ensure button exists

    // Check if user is logged in
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
        signInButton.textContent = "Log Out"; // Change button text
        signInButton.addEventListener("click", () => {
            localStorage.removeItem("loggedInUser"); // Remove session
            alert("You have been logged out!");
            window.location.reload(); // Refresh page
        });
    } else {
        signInButton.textContent = "Sign In"; // Ensure correct label
        signInButton.addEventListener("click", () => {
            window.location.href = "login.html"; // Redirect to login page
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("purchase_history.php")
        .then(response => response.json())
        .then(data => {
            let historyContainer = document.getElementById("purchase-history");
            historyContainer.innerHTML = "<h2>Purchase History</h2>";
            data.forEach(item => {
                historyContainer.innerHTML += `<p>${item.product_name} - ₹${item.price}</p>`;
            });
        })
        .catch(error => console.error("Error:", error));
});


document.addEventListener("DOMContentLoaded", function() {
    const authButton = document.getElementById("authButton");
    const authButtonText = document.getElementById("authButtonText");
    
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
        authButtonText.textContent = "Log Out";
        authButton.href = "#";
        authButton.addEventListener("click", function() {
            localStorage.removeItem("isLoggedIn");
            window.location.reload();
        });
    }
});