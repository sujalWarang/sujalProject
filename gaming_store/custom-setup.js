document.addEventListener("DOMContentLoaded", function() {
    const selects = document.querySelectorAll("select");
    const totalPriceElement = document.getElementById("totalPrice");
    const addToCartBtn = document.getElementById("addToCart");
    const clearAllBtn = document.getElementById("clearAll");

    function updateTotalPrice() {
        let totalPrice = 0;
        selects.forEach(select => {
            totalPrice += parseFloat(select.value);
        });
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    selects.forEach(select => {
        select.addEventListener("change", updateTotalPrice);
    });

    addToCartBtn.addEventListener("click", function() {
        alert("Your custom setup has been added to the cart!");
    });

    clearAllBtn.addEventListener("click", function() {
        selects.forEach(select => {
            select.selectedIndex = 0;
        });
        updateTotalPrice();
    });
});
