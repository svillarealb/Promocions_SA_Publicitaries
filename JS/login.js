document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (!loginForm) {
        console.error("❌ No s'ha trobat el formulari amb ID 'loginForm'");
        return;
    }

    console.log("✅ Formulari de login detectat. Escoltant el submit...");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(loginForm);
        console.log("📦 Dades enviades:", {
            username: formData.get("username"),
            password: formData.get("password")
        }); 

        fetch("/Promocions_SA_Publicitaries/PHP/login.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log("📥 Resposta del servidor:", data);

            const cleanData = data.trim();
            if (cleanData === "success") {
                console.log("✅ Sessió iniciada correctament!");
                alert("✅ Sessió iniciada correctament!");
                location.reload();
            } else if (cleanData === "error") {
                console.warn("⚠️ Credencials incorrectes.");
                alert("❌ Usuari o contrasenya incorrectes.");
            } else if (cleanData === "already_logged") {
                console.info("ℹ️ Ja hi ha sessió iniciada.");
                location.reload();
            } else {
                console.warn("❔ Resposta inesperada del servidor:", cleanData);
                alert("⚠️ Resposta desconeguda.");
            }
        })
        .catch(error => {
            console.error("💥 Error en la petició:", error);
        });
    });
});
