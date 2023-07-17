import { loadHome } from '../modules/home.js';
import { cargarMap, searchCity } from './map.js';
import { getData } from './db.js';
import { mostrarRuta } from '../modules/rutas.js';

// loadHome();

document.getElementById('home').addEventListener('click',() => {
  loadHome();
})
document.getElementById('rutas').addEventListener('click',() => {
  getData('Rutas', mostrarRuta)
})

