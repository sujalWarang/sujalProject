document.getElementById("show-form-btn").addEventListener("click", () => {
    document.getElementById("product-form").style.display = "block";
});

document.getElementById("add-product-btn").addEventListener("click", async () => {
    const name = document.getElementById("product-name").value;
    const brand = document.getElementById("product-brand").value;
    const category = document.getElementById("product-category").value;
    const price = document.getElementById("product-price").value;
    const imageUrl = document.getElementById("product-image").value;
    const feature = document.getElementById("product-feature").value;

    if (!name || !brand || !category || !price || !imageUrl) {
        document.getElementById("message").innerHTML = "<p style='color:red;'>All fields are required!</p>";
        return;
    }

    try {
        const response = await fetch("add_product.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ name, brand, category, price, imageUrl, feature })
        });

        const result = await response.json();
        if (result.success) {
            document.getElementById("message").innerHTML = `<p style='color:green;'>${result.message}</p>`;
            document.getElementById("product-form").style.display = "none"; // Hide form after success
        } else {
            document.getElementById("message").innerHTML = `<p style='color:red;'>${result.message}</p>`;
        }
    } catch (error) {
        document.getElementById("message").innerHTML = "<p style='color:red;'>Server error! Please try again.</p>";
    }

    // Clear form
    document.getElementById("product-name").value = "";
    document.getElementById("product-brand").value = "";
    document.getElementById("product-category").value = "";
    document.getElementById("product-price").value = "";
    document.getElementById("product-image").value = "";
    document.getElementById("product-feature").value = "";
});

document.getElementById("product-image").addEventListener("change", function() {
    const fileName = this.files[0] ? this.files[0].name : "No file chosen";
    document.getElementById("file-name").textContent = fileName;
});
