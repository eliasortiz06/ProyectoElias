document.addEventListener("DOMContentLoaded", () => {
  const galeria = document.querySelector('.galeria');
  const btnPrev = document.querySelector('.btn-carrusel.prev');
  const btnNext = document.querySelector('.btn-carrusel.next');
  let index = 0;
  let peliculas = []; 

  // Cargar datos desde el JSON
  fetch('/data/coleccion.json')
    .then(response => response.json())
    .then(data => {
      peliculas = data; 

      peliculas.forEach(pelicula => {
        const divPelicula = document.createElement('div');
        divPelicula.classList.add('pelicula');
        divPelicula.innerHTML = `
          <img src="${pelicula.imagen}" alt="${pelicula.nombre}">
          <p class="subtitulo">${pelicula.date}</p>
        `;
        galeria.appendChild(divPelicula);
      });

      showPelicula();
    })
    .catch(error => {
      console.error('Error al cargar los datos del JSON:', error);
    });

  function showPelicula() {
    const peliculaElems = document.querySelectorAll('.pelicula');
    const offset = -index * 100;
    galeria.style.transform = `translateX(${offset}%)`;
  }

  btnNext.addEventListener('click', () => {
    const peliculaElems = document.querySelectorAll('.pelicula');
    index = (index + 1) % peliculaElems.length;
    showPelicula();
  });

  btnPrev.addEventListener('click', () => {
    const peliculaElems = document.querySelectorAll('.pelicula');
    index = (index - 1 + peliculaElems.length) % peliculaElems.length;
    showPelicula();
  });
});



