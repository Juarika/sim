let col = [4.570868, -74.297333]

export function cargarMap(method) {
  const map = L.map('map').setView(col, 5);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  map.eachLayer(layer => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  const searchControl = L.Control.extend({
    onAdd: function(map) {
    const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
    container.innerHTML = `
        <input type="text" id="search-input" placeholder="Buscar ciudad...">
        <button id="search-button">Buscar</button>`;
    container.style.backgroundColor = 'white';
    container.style.padding = '5px';
    container.style.width = '200px';

    L.DomEvent.disableClickPropagation(container);
    L.DomEvent.on(container, 'mousewheel', L.DomEvent.stopPropagation);
    const searchInput = container.querySelector('#search-input');
    const searchButton = container.querySelector('#search-button');
    searchButton.addEventListener('click', function() {
        const city = searchInput.value;
        if (city !== '') {
            searchCity(city, map, 'black');
            cityImput.value = city;
        }
    });

    if (method == 'llenarMap'){
      searchCity(city, map, 'black');

    }

    return container;
  
// const bounds = L.latLngBounds(points);
//   map.fitBounds(bounds);

}})
new searchControl().addTo(map);
}


 
export function searchCity(city, map, color) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)} Colombia&key=23beb59fcb134573b05ad4756eecab8d`;
    map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    }); 
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                const result = data.results[0];
                const lat = result.geometry.lat;
                const lng = result.geometry.lng;

                map.setView([lat, lng], 7);
                fetch('./assets/svg/geo.svg')
                    .then(response => response.text())
                    .then(svgText => {
                        icon(svgText, lat, lng, result.formatted, color, map);
                    })
                    .catch(error => console.error('Error loading SVG:', error));
            }
        })
        .catch(error => console.error('Error searching city:', error));
}

function icon(svgText, lat, lng, formatted, color, map) {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
  const path = svgDoc.querySelector('path');
  path.setAttribute('fill', color);
    
  const svgString = new XMLSerializer().serializeToString(svgDoc);
  const customIcon = L.icon({
      iconUrl: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString),
      iconSize: [38, 95],
      iconAnchor: [19, 61],
      popupAnchor: [0, -31]   
  });
  
  L.marker([lat, lng], { icon: customIcon })
      .addTo(map)
      .bindPopup(formatted)
}

function llenarIcon(data) {

}