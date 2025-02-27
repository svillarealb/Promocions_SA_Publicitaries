document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let formData = new FormData(this);

    fetch("HTML/login.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if (data === "success") {
            window.location.reload(); // Refresca la pàgina si el login és correcte
        } else {
            document.getElementById("loginError").style.display = "block";
        }
    });
});
