document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("carouselContainer");
    let currentIndex = 0;
    let cards = [];
  
    fetch("/Promocions_SA_Publicitaries/PHP/get_valles.php")
      .then(res => res.json())
      .then(data => {
        data.forEach(valla => {
          const card = document.createElement("div");
          card.classList.add("valla-card");
  
          card.innerHTML = `
          <div class="img-wrapper">
            <img src="/Promocions_SA_Publicitaries/IMG/VALLAS/${valla.imatge}" alt="${valla.tipus_suport}">
          </div>
          <div class="info">
            <h5>${valla.tipus_suport}</h5>
            <p><strong>Mida:</strong> ${valla.mida}</p>
            <p><strong>Situació:</strong> ${valla.situacio}</p>
            <p><strong>Preu exposició:</strong> ${valla.preu_exposicio} €/mes</p>
            <p><strong>Preu producció:</strong> ${valla.preu_produccio} €</p>
            <p><strong>Contractació:</strong> ${valla.temps_minim}</p>
            <p><strong>Flux vianants:</strong> ${valla.flux_vianants}</p>
            <p><strong>Llocs d’interès:</strong> ${valla.llocs_interes}</p>
          </div>
        `;
        
  
          container.appendChild(card);
          cards.push(card);
        });
  
        updateCards();
  
        document.getElementById("nextBtn").addEventListener("click", () => {
          if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateCards();
          }
        });
  
        document.getElementById("prevBtn").addEventListener("click", () => {
          if (currentIndex > 0) {
            currentIndex--;
            updateCards();
          }
        });

        function updateCards() {
            cards.forEach((card, index) => {
              card.classList.remove("active");
              if (index === currentIndex) {
                card.classList.add("active");
              }
            });
    
            const cardWidth = cards[0].offsetWidth + 20; // Amb margin
            const containerWidth = container.offsetWidth;
            const offset = cardWidth * currentIndex;
    
            container.style.transform = `translateX(calc(50% - ${offset}px))`;
          }
      });
  });
  