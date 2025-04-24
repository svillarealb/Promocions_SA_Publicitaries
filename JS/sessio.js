document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginButton");
    const logoutBtn = document.getElementById("logoutBtn");
    const message = document.getElementById("message");

    // Comprovar si hi ha sessió activa
    fetch("/Promocions_SA_Publicitaries/PHP/login.php", {
        method: "POST"
    })
    .then(res => res.text())
    .then(data => {
        if (data.trim() === "already_logged") {
            console.log("✅ Sessió iniciada");
            if (loginBtn) loginBtn.style.display = "none";
            if (logoutBtn) logoutBtn.style.display = "inline-block";
            if (message) message.style.display = "inline-block";
        } else {
            console.log("ℹ️ No hi ha sessió activa");
            if (loginBtn) loginBtn.style.display = "inline-block";
            if (logoutBtn) logoutBtn.style.display = "none";
            if (message) message.style.display = "none";
        }
    });

    // Botó logout
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            fetch("/Promocions_SA_Publicitaries/PHP/logout.php")
                .then(() => {
                    console.log("🔒 Sessió tancada");
                    window.location.reload();
                });
        });
    }
});



//  