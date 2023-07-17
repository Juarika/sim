const rutaForm = document.getElementById('rutaForm');
const rutaList = document.getElementById('rutaList');
const rutaDetalles = document.getElementById('rutaDetalles');
const puntosList = document.getElementById('puntosList');
const puntoForm = document.getElementById('puntoForm');

const API_URL = 'http://localhost:3000';

// Función para crear una nueva Ruta
const crearRuta = async (nombre) => {
    const response = await fetch(`${API_URL}/Rutas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ NomRuta: nombre }),
    });
    return response.json();
};

const eliminarPunto = async (id) => {
    await fetch(`${API_URL}/Puntos/${id}`, {
        method: 'DELETE',
    });
    mostrarDetallesRuta(currentRoute);
};

// Función para obtener todas las Rutas
const obtenerRutas = async () => {
    const response = await fetch(`${API_URL}/Rutas`);
    return response.json();
};

// Función para obtener los puntos de una Ruta específica
const obtenerPuntosPorRuta = async (rutaId) => {
    const response = await fetch(`${API_URL}/Puntos/?RutaId=${rutaId}`);
    return response.json();
};

// Función para mostrar las Rutas en la lista
const mostrarRutas = async (rutas) => {
    rutaList.innerHTML = '';
    puntosList.innerHTML = '';
    rutas.forEach((ruta) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${ruta.NomRuta}</strong> 
            <button onclick="eliminarRuta(${ruta.id})">Eliminar</button>`;
        listItem.addEventListener('click', () => mostrarDetallesRuta(ruta));
        rutaList.appendChild(listItem);
    });
};

// Función para mostrar los detalles de una Ruta y sus Puntos
let currentRoute = null; // Variable para mantener el objeto de la ruta seleccionada

const mostrarDetallesRuta = async (ruta) => {
    rutaDetalles.style.display = 'block';
    document.getElementById('rutaNombreDetalle').innerText = ruta.NomRuta;
    currentRoute = ruta;
    const puntos = await obtenerPuntosPorRuta(ruta.id);
    mostrarPuntos(puntos);
};

// Función para mostrar los Puntos de una Ruta en la lista
const mostrarPuntos = (puntos) => {
    puntosList.innerHTML = '';
    puntos.forEach((punto) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${punto.NomPuntos} 
            <button onclick="eliminarPunto(${punto.id})">Eliminar Punto</button>`;
        puntosList.appendChild(listItem);
    });
};

// Función para crear un nuevo Punto en una Ruta
const crearPunto = async (nombre, rutaId, imagen) => {
    const response = await fetch(`${API_URL}/Puntos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ NomPuntos: nombre, RutaId: rutaId, Imagen: imagen }),
    });
    return response.json();
};

// Función para eliminar una Ruta y sus Puntos
const eliminarRuta = async (id) => {
    await fetch(`${API_URL}/Rutas/${id}`, {
        method: 'DELETE',
    });
    rutaDetalles.style.display = 'none';
    actualizarListaRutas();
};

rutaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombreRuta = document.getElementById('rutaNombre').value;
    crearRuta(nombreRuta)
        .then(() => {
            rutaForm.reset();
            actualizarListaRutas();
        })
        .catch((error) => console.error('Error al crear la Ruta:', error));
});

// Formulario para crear Puntos en una Ruta
puntoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombrePunto = document.getElementById('puntoNombre').value;
    const imagenPunto = document.getElementById('puntoImagen').value;
    crearPunto(nombrePunto, currentRoute.id, imagenPunto)
        .then(() => {
            puntoForm.reset();
            mostrarDetallesRuta(currentRoute); // Actualizar la lista de puntos después de crear uno nuevo
        })
        .catch((error) => console.error('Error al crear el Punto:', error));
});

// Cargar las Rutas al iniciar la aplicación
const actualizarListaRutas = async () => {
    const rutas = await obtenerRutas();
    mostrarRutas(rutas);
};

// Iniciar la aplicación
actualizarListaRutas();
