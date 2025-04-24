document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#formContacte");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const nom = document.getElementById("nom").value.trim();
      const correu = document.getElementById("email").value.trim();
      const missatge = document.getElementById("missatge").value.trim();
  
      // Mostra popup "Enviant..."
      mostrarPopup("📨 Enviant correu...", "info");
  
      fetch("/Promocions_SA_Publicitaries/PHP/enviar_contacte.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `nom=${encodeURIComponent(nom)}&email=${encodeURIComponent(correu)}&missatge=${encodeURIComponent(missatge)}`
      })
        .then((res) => res.text())
        .then((data) => {
          console.log("Resposta del servidor:", data);
          if (data.trim() === "OK") {
            mostrarPopup("✅ Missatge enviat amb èxit!", "success");
            form.reset();
          } else {
            mostrarPopup("❌ Error en enviar el missatge.", "danger");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          mostrarPopup("❌ Error inesperat.", "danger");
        });
    });
  
    function mostrarPopup(missatge, tipus = "info") {
      const modal = document.getElementById("popup-missatge");
      const text = document.getElementById("popup-missatge-text");
  
      text.textContent = missatge;
      modal.classList.remove("d-none");
  
      // Si no és "info", tanca automàticament al cap de 2s
      if (tipus !== "info") {
        setTimeout(() => {
          modal.classList.add("d-none");
        }, 2000);
      }
    }
  });
  