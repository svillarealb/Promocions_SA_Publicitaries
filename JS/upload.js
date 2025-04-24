document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("uploadForm");
  
    if (!form) {
      console.error("❌ No s'ha trobat el formulari amb ID 'uploadForm'");
      return;
    }
  
    const cancelBtn = document.getElementById("cancelEditBtn");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => {
        form.reset();
  
        const hidden = form.querySelector("input[name='id']");
        if (hidden) hidden.remove();
  
        if (document.getElementById("imatgeEditContainer"))
          document.getElementById("imatgeEditContainer").style.display = "none";
        if (document.getElementById("inputImatgeWrapper"))
          document.getElementById("inputImatgeWrapper").style.display = "block";
        if (document.getElementById("cancelEditWrapper"))
          document.getElementById("cancelEditWrapper").style.display = "none";
        if (document.getElementById("editBanner"))
          document.getElementById("editBanner").classList.add("d-none");
  
        form.querySelector("button[type='submit']").textContent = "📤 Pujar Projecte";
  
        mostrarPopupMissatge("ℹ️ Edició cancel·lada.", "info");
      });
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const formData = new FormData(form);
  
      fetch("/Promocions_SA_Publicitaries/PHP/upload.php", {
        method: "POST",
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        console.log("📥 Resposta JSON:", data);
      
        if (data.success) {
          mostrarPopupMissatge(data.message, "success");
          form.reset();
      
          if (document.getElementById("imatgeEditContainer"))
            document.getElementById("imatgeEditContainer").style.display = "none";
          if (document.getElementById("inputImatgeWrapper"))
            document.getElementById("inputImatgeWrapper").style.display = "block";
          if (document.getElementById("cancelEditWrapper"))
            document.getElementById("cancelEditWrapper").style.display = "none";
          if (document.getElementById("editBanner"))
            document.getElementById("editBanner").classList.add("d-none");
      
          const hidden = form.querySelector("input[name='id']");
          if (hidden) hidden.remove();
      
          setTimeout(() => location.reload(), 800);
        } else {
          mostrarPopupMissatge(data.message || "⚠️ Error desconegut.", "error");
        }
      })
      .catch(err => {
        console.error("💥 Error en la petició:", err);
        mostrarPopupMissatge("❌ Error en la petició.", "error");
      });
        });
  });
  