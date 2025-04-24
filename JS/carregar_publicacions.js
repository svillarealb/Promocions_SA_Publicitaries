function mostrarPopupMissatge(missatge, tipus = "info") {
  const popup = document.getElementById("popupMessage");
  popup.textContent = missatge;

  // Reset de classes
  popup.className = "position-fixed top-0 start-50 translate-middle-x mt-3 px-4 py-2 rounded shadow";
  popup.classList.remove("d-none");

  if (tipus === "success") {
    popup.classList.add("bg-success", "text-white");
  } else if (tipus === "error") {
    popup.classList.add("bg-danger", "text-white");
  } else {
    popup.classList.add("bg-dark", "text-white");
  }

  setTimeout(() => {
    popup.classList.add("d-none");
  }, 2000);
}




document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("projectesContainer");
  let esAdmin = false;

  fetch("/Promocions_SA_Publicitaries/PHP/comprovar_sessio.php")
    .then(res => res.text())
    .then(data => {
      esAdmin = data.trim() === "true";
      // ✅ Mostrar botó i controlar desplegament del formulari si és admin
      if (esAdmin) {
        const botoToggle = document.getElementById("toggleUploadForm");
        const formulariContainer = document.getElementById("uploadFormContainer");
        if (formulariContainer) formulariContainer.style.display = "none";
        if (botoToggle && formulariContainer) {
          // ✅ Estat inicial
          formulariContainer.style.display = "none";
          botoToggle.classList.remove("d-none");
          botoToggle.textContent = "📤 Pujar nou projecte";
      
          // 🔄 Acció del botó
          botoToggle.addEventListener("click", () => {
            const visible = formulariContainer.style.display === "block";
            formulariContainer.style.display = visible ? "none" : "block";
            botoToggle.textContent = visible
              ? "📤 Pujar nou projecte"
              : "🔽 Amagar formulari";
      
            if (!visible) {
              formulariContainer.scrollIntoView({ behavior: "smooth" });
            }
          });
        }
      }
      fetch("/Promocions_SA_Publicitaries/PHP/get_publicacions.php")
        .then(res => res.json())
        .then(data => {
          if (!data.length) {
            container.innerHTML = "<p>No hi ha publicacions encara.</p>";
            return;
          }

          data.forEach(pub => {
            const col = document.createElement("div");
            col.className = "col mb-4";

            const iconaOpcions = esAdmin ? `
              <div class="dropdown text-end">
                <button class="btn btn-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fas fa-ellipsis-v"></i>
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item text-primary btn-editar" href="#" data-id="${pub.id}">Editar</a></li>
                  <li><a class="dropdown-item text-danger btn-eliminar" href="#" data-id="${pub.id}">Eliminar</a></li>
                </ul>
              </div>` : "";

            col.innerHTML = `
              <div class="project-horizontal d-flex shadow-sm rounded-4 overflow-hidden">
                <div class="project-img-container">
                  <img src="/Promocions_SA_Publicitaries/uploads/${pub.imagen}" alt="${pub.titulo}" class="img-fluid">
                </div>
                <div class="project-text p-3 d-flex flex-column justify-content-between w-100">
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 class="fw-bold mb-2">${pub.titulo}</h5>
                      <p class="resum-comentari mb-1 text-muted">${pub.resum_comentari}</p>
                    </div>
                    ${iconaOpcions}
                  </div>
                  <div>
                    <a href="#" class="veureMes mt-2 fw-semibold"
                      data-title="${pub.titulo}"
                      data-img="/Promocions_SA_Publicitaries/uploads/${pub.imagen}"
                      data-comentari="${pub.comentario}">
                      veure més →
                    </a>
                    <p class="text-muted">${pub.fecha}</p>
                  </div>
                </div>
              </div>
            `;

            container.appendChild(col);

            if (esAdmin) {
              const editarBtn = col.querySelector('.btn-editar');
               editarBtn.addEventListener('click', (e) => {
                e.preventDefault();

                const title = pub.titulo;
                const description = pub.descripcion;
                const comentari = pub.comentario;
                const id = pub.id;

                const form = document.getElementById("uploadForm");
                form.querySelector("[name='titulo']").value = title;
                form.querySelector("[name='descripcion']").value = description;
                form.querySelector("[name='comentari']").value = comentari;

                let hidden = form.querySelector("input[name='id']");
                if (!hidden) {
                  hidden = document.createElement("input");
                  hidden.type = "hidden";
                  hidden.name = "id";
                  form.appendChild(hidden);
                }
                hidden.value = id;

                const btnSubmit = form.querySelector("button[type='submit']");
                btnSubmit.textContent = "💾 Actualitzar projecte";

                // Mostrar preview i amagar input file
                document.getElementById("imatgeEditContainer").style.display = "block";
                document.getElementById("inputImatgeWrapper").style.display = "none";

                const previewImg = document.getElementById("imatgeActualPreview");
                previewImg.src = `/Promocions_SA_Publicitaries/uploads/${pub.imagen}`;
                previewImg.style.display = "block";

                document.getElementById("uploadFormContainer").style.display = "block";
                document.getElementById("cancelEditWrapper").style.display = "block";
                mostrarPopupMissatge("✏️ Editant projecte: " + title, "info");
                document.getElementById("uploadFormContainer").scrollIntoView({ behavior: "smooth" });

              });

              const eliminarBtn = col.querySelector('.btn-eliminar');
              eliminarBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = eliminarBtn.getAttribute("data-id");

                if (confirm("Estàs segur que vols eliminar aquest projecte?")) {
                  fetch('/Promocions_SA_Publicitaries/PHP/eliminar_projecte.php', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: 'id=' + encodeURIComponent(id)
                  })
                    .then(res => res.text())
                    .then(data => {
                      if (data.trim() === "deleted") {
                        mostrarPopupMissatge("✅ Projecte eliminat correctament.", "success");
                        location.reload();
                      } else {
                        mostrarPopupMissatge("❌ Error al eliminar: " + data, "success");
                      }
                    });
                }
              });
            }
          });

        
          
          

          document.querySelectorAll('.veureMes').forEach(btn => {
            btn.addEventListener('click', (e) => {
              e.preventDefault();
              const title = btn.getAttribute("data-title");
              const img = btn.getAttribute("data-img");
              const comentari = btn.getAttribute("data-comentari");

              document.getElementById("modalLabel").textContent = title;
              document.getElementById("modalImage").src = img;
              document.getElementById("modalComentari").textContent = comentari;

              const modal = new bootstrap.Modal(document.getElementById('projectModal'));
              modal.show();
            });
          });

          // Event per mostrar input de nova imatge si es vol canviar
          const canviarBtn = document.getElementById("canviarImatgeBtn");
          if (canviarBtn) {
            canviarBtn.addEventListener("click", () => {
              document.getElementById("imatgeEditContainer").style.display = "none";
              document.getElementById("inputImatgeWrapper").style.display = "block";
            });
          }
        });
    });
});
