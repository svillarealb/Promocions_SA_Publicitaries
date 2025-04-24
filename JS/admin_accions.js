document.addEventListener("DOMContentLoaded", () => {
    // EDITAR
    document.querySelectorAll('.dropdown-item.text-primary').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
  
        const col = btn.closest(".project-horizontal");
        const title = col.querySelector("h5").textContent.trim();
        const description = col.querySelector(".resum-comentari").textContent.trim();
        const id = btn.getAttribute("data-id");
  
        const comentari = btn.closest("div").querySelector(".veureMes")?.getAttribute("data-comentari") || "";
  
        const form = document.getElementById("uploadForm");
        form.querySelector("[name='titulo']").value = title;
        form.querySelector("[name='descripcion']").value = description;
        form.querySelector("[name='comentari']").value = comentari;
  
        // Afegim o actualitzem el camp ocult amb l'id
        let hidden = form.querySelector("input[name='id']");
        if (!hidden) {
          hidden = document.createElement("input");
          hidden.type = "hidden";
          hidden.name = "id";
          form.appendChild(hidden);
        }
        hidden.value = id;
  
        // Canviem el text del botó
        const btnSubmit = form.querySelector("button[type='submit']");
        btnSubmit.textContent = "💾 Actualitzar Projecte";
  
        // Mostrem el formulari (si està ocult)
        document.getElementById("uploadFormContainer").style.display = "block";
  
        // Desplacem a la vista del formulari
        form.scrollIntoView({ behavior: "smooth" });
      });
    });
  });
  