import { cargarMap,  } from "../js/map.js";
import { getData } from "../js/db.js";

const main = document.getElementById('main');

export function mostrarRuta(data){
  main.innerHTML = '<div id="map"></div>';
  cargarMap('')
  const accordion = document.createElement('div');
  accordion.classList = 'accordion accordion-flush'
  accordion.id = 'accordionFlushExample'
  data.forEach(e => {
    const div = document.createElement('div');
    div.classList = 'accordion-item';
    let id = e.id;
    div.innerHTML = `
    <h2 class="accordion-header" id="flush-h${id}">
      <button class="accordion-button collapsed load-route-btn" data-route="${id}" type="button" data-bs-toggle="collapse" data-bs-target="#flush-c${id}" aria-expanded="false" aria-controls="flush-c${id}">
        RUTA #${id} || Ruta ${e.NomRuta}
      </button>
    </h2>
    <div id="flush-c${id}" class="accordion-collapse collapse" aria-labelledby="flush-h${id}" data-bs-parent="#accordionFlushExample">
      <div class="accordion-body" id="cont${id}">
        ID: ${id}<br>
        Puntos:
      </div>
    </div>`;
    getData('Puntos', mostrarPuntos)
    accordion.appendChild(div);
    function mostrarPuntos(dataP) {
      dataP.forEach(f => {
        const div = document.getElementById(`cont${id}`);
        div.innerHTML += `${f.RutaId == id ? '<br>=>' + f.NomPuntos : ''}`
      });
    }
  });
  main.appendChild(accordion)
  mostrarIconos(data)
}

function mostrarIconos(data) {
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const loadBtn = item.querySelector('.load-route-btn');
    loadBtn.addEventListener('click', function() {
      const routeName = loadBtn.getAttribute('data-route');
      loadRouteOnMap(routeName, data);
    });
  });
}