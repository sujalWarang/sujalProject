document.addEventListener("DOMContentLoaded", () => {
    // Handle "Add to Cart" for pre-built setups
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let setupCard = this.closest(".setup-card");
            let setupName = setupCard.querySelector("h3").textContent;
            let setupImage = setupCard.querySelector("img").src;
            let setupPrice = setupCard.querySelector(".price").textContent;

            addToCart(setupName, setupImage, setupPrice);
        });
    });

    // Handle "Add to Cart" for custom setups
    document.getElementById("custom-setup-form").addEventListener("submit", function (event) {
        event.preventDefault();

        let monitor = document.getElementById("monitor");
        let keyboard = document.getElementById("keyboard");
        let mouse = document.getElementById("mouse");
        let headset = document.getElementById("headset");

        let setupName = `Custom Setup: ${monitor.options[monitor.selectedIndex].text}, 
                        ${keyboard.options[keyboard.selectedIndex].text}, 
                        ${mouse.options[mouse.selectedIndex].text}, 
                        ${headset.options[headset.selectedIndex].text}`;
        
        let setupImage = "images/custom-setup.jpeg"; // Add a default custom setup image
        let setupPrice = document.getElementById("totalPrice").textContent;

        addToCart(setupName, setupImage, `$${setupPrice}`);
    });

    // Function to add items to cart (stored in localStorage)
    function addToCart(name, image, price) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        let newItem = {
            name: name,
            image: image,
            price: price
        };

        cart.push(newItem);
        localStorage.setItem("cart", JSON.stringify(cart));

        alert(`${name} added to cart!`);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const monitor = document.getElementById("monitor");
    const keyboard = document.getElementById("keyboard");
    const mouse = document.getElementById("mouse");
    const headset = document.getElementById("headset");
    const totalPriceElement = document.getElementById("totalPrice");

    function updateTotalPrice() {
        let total = 
            parseFloat(monitor.selectedOptions[0].getAttribute("data-price")) +
            parseFloat(keyboard.selectedOptions[0].getAttribute("data-price")) +
            parseFloat(mouse.selectedOptions[0].getAttribute("data-price")) +
            parseFloat(headset.selectedOptions[0].getAttribute("data-price"));

        totalPriceElement.textContent = total.toFixed(2);
    }

    // Add event listeners
    monitor.addEventListener("change", updateTotalPrice);
    keyboard.addEventListener("change", updateTotalPrice);
    mouse.addEventListener("change", updateTotalPrice);
    headset.addEventListener("change", updateTotalPrice);

    // Initialize total price on page load
    updateTotalPrice();
});
