const imagenes = [
    { img: '/IMG/Proyecto/proyecto1.jpg', texto: 'Valla en centro urbano' },
    { img: '/IMG/Proyecto/proyecto2.jpg', texto: 'Publicidad en autopista' },
    { img: '/IMG/Proyecto/proyecto3.jpg', texto: 'Circuito digital' }
];
let index = 0;
const img = document.getElementById('img').querySelector('img');
const texto = document.getElementById('texto');
const puntos = document.getElementById('puntos');

imagenes.forEach((_, i) => {
    const punto = document.createElement('div');
    punto.classList.add('punto');
    if (i === 0) punto.classList.add('activo');
    punto.addEventListener('click', () => mostrarImagen(i));
    puntos.appendChild(punto);
});

function mostrarImagen(i) {
    img.style.opacity = 0;
    texto.style.opacity = 0;
    img.classList.remove('zoom');
    setTimeout(() => {
        index = i;
        img.src = imagenes[i].img;
        texto.innerHTML = `<h3>${imagenes[i].texto}</h3>`;
        document.querySelectorAll('.punto').forEach((p, idx) => {
            p.classList.toggle('activo', idx === i);
        });
        img.style.opacity = 1;
        texto.style.opacity = 1;
        setTimeout(() => img.classList.add('zoom'), 300);
    }, 500);
}

document.getElementById('atras').addEventListener('click', () => {
    index = (index - 1 + imagenes.length) % imagenes.length;
    mostrarImagen(index);
});
document.getElementById('adelante').addEventListener('click', () => {
    index = (index + 1) % imagenes.length;
    mostrarImagen(index);
});
