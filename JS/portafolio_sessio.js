// document.addEventListener("DOMContentLoaded", () => {
//     const uploadForm = document.getElementById("uploadFormContainer");

//     fetch("/Promocions_SA_Publicitaries/PHP/login.php", {
//         method: "POST"
//     })
//     .then(res => res.text())
//     .then(data => {
//         if (data.trim() === "already_logged") {
//             console.log("✅ Sessió iniciada. Formulari mostrat.");
//             if (uploadForm) uploadForm.style.display = "block";
//         } else {
//             console.log("ℹ️ No hi ha sessió activa. Formulari ocult.");
//             if (uploadForm) uploadForm.style.display = "none";
//         }
//     });
// });
