document.addEventListener("DOMContentLoaded", function () {
    fetchProducts();
});

function fetchProducts() {
    fetch("compare.php?action=getProducts")
        .then(response => response.json())
        .then(data => {
            let product1Dropdown = document.getElementById("product1");
            let product2Dropdown = document.getElementById("product2");

            data.forEach(product => {
                let option1 = new Option(product.name, product.id);
                let option2 = new Option(product.name, product.id);

                product1Dropdown.add(option1);
                product2Dropdown.add(option2);
            });
        })
        .catch(error => console.error("Error fetching products:", error));
}

function compareProducts() {
    let product1 = document.getElementById("product1").value;
    let product2 = document.getElementById("product2").value;

    if (!product1 || !product2) {
        alert("Please select two products to compare.");
        return;
    }

    let formData = new FormData();
    formData.append("product1", product1);
    formData.append("product2", product2);

    fetch("compare.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        displayComparison(data);
    })
    .catch(error => console.error("Error comparing products:", error));
}

function displayComparison(products) {
    let resultDiv = document.getElementById("comparison-result");
    if (products.length < 2) {
        resultDiv.innerHTML = "<p>Comparison failed. Please try again.</p>";
        return;
    }

    let comparisonTable = `
        <table border="1">
            <tr>
                <th>Feature</th>
                <th>${products[0].name}</th>
                <th>${products[1].name}</th>
            </tr>
            <tr>
                <td>Brand</td>
                <td>${products[0].brand}</td>
                <td>${products[1].brand}</td>
            </tr>
            <tr>
                <td>Category</td>
                <td>${products[0].category}</td>
                <td>${products[1].category}</td>
            </tr>
            <tr>
                <td>Price</td>
                <td>$${products[0].price}</td>
                <td>$${products[1].price}</td>
            </tr>
            <tr>
                <td>Features</td>
                <td>${products[0].features}</td>
                <td>${products[1].features}</td>
            </tr>
            <tr>
                <td>Image</td>
                <td><img src="${products[0].image_url}" width="100"></td>
                <td><img src="${products[1].image_url}" width="100"></td>
            </tr>
        </table>
    `;

    resultDiv.innerHTML = comparisonTable;
}

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
