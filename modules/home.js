const main = document.getElementById('main');
const carousel = document.createElement('div');

export function loadHome(){    
    main.innerHTML = '';
    carousel.innerHTML = '';
    carousel.classList = 'carousel slide carousel-fade';
    carousel.id = 'carouselHome';
    carousel.setAttribute('data-bs-ride', 'carousel');
    const div = document.createElement('div');
    div.classList = 'carousel-inner';
    for (let i = 1; i <= 10; i++) {
        div.innerHTML+=`
        <div class="carousel-item ${ i==1 ? 'active' : '' }">
            <img src="./assets/img/img${i}.jpg" class="d-block w-100" alt="img${1}">
        </div>`;
    }
    carousel.appendChild(div);
    carousel.innerHTML += `
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselHome" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselHome" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Siguiente</span>
    </button>`;
    main.appendChild(carousel);
}

