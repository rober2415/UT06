"use strict";

import { Movie } from '../models/Movie.js';
import { Serie } from '../models/Serie.js';
import { newProductionValidation, assignProductionValidation, deassignProductionValidation } from './Validation.js';

class VideoSystemView {
    constructor() {
        // Menú de navegación
        this.menu = document.getElementById('navbar-nav');
        // Contenedor principal
        this.main = document.getElementById('content');

        // Ventanas
        this.newWindow = null;
        this.openedWindows = [];
    }

    // Manejador de eventos
    #EXCECUTE_HANDLER(handler, handlerArguments, scrollElement, data, url, event) {
        handler(...handlerArguments);
        const scroll = document.querySelector(scrollElement);
        if (scroll) scroll.scrollIntoView();
        // History
        history.pushState(data, null, url);
        event.preventDefault();
    }

    /**
     * Limpiar contenido del HTML
     */
    #emptyMain() {
        this.main.replaceChildren();
    }

    /**
     * Enlazar manejador handleInit con el evento
     */
    bindInit(handler) {
        // Evento click inicio
        document.getElementById('navInicio').addEventListener('click', (event) => {
            this.#EXCECUTE_HANDLER(handler, [], 'body', { action: 'init' }, '#', event);
        });

        // Evento click logo
        document.getElementById('logo').addEventListener('click', (event) => {
            this.#EXCECUTE_HANDLER(handler, [], 'body', { action: 'init' }, '#', event);
        });
    }

    /**
     * Mostrar categorías
     */
    showCategories(categories) {
        // Limpiar contenido
        this.#emptyMain();

        // Crear contenedor para la lista de categorías
        const container = document.createElement('div');
        // Crear título
        const h2 = document.createElement('h2');
        h2.classList.add('h2', 'fw-bold', 'mb-4', 'border-start', 'border-5', 'border-black', 'ps-3', 'text-uppercase');
        h2.innerHTML = 'Categorías';
        // Añadir título al final
        container.append(h2);

        // Crear contenedor con las cards
        const row = document.createElement('div');
        row.classList.add('row', 'row-cols-1', 'row-cols-md-2', 'row-cols-lg-2', 'row-cols-xl-3', 'row-cols-xxl-4', 'mb-4', 'g-4');
        container.append(row);
        for (const cat of categories) {
            row.insertAdjacentHTML("beforeend", ` 
                <div class="col">
                    <a href="#" data-category="${cat.category.name}">
                    <div class="card bg-section h-100 shadow">
                        <div class="card-header p-0 text-center">
                            <h5 class="card-title fw-bold">${cat.category.name}</h5>
                        </div>
                        <div class="card-body d-flex flex-column p-3 text-center">
                            <p>${cat.category.description}</p>   
                        </div>
                    </div>
                    </a>
                </div>`
            );
        }
        // Añadir contenedor al final
        this.main.append(container);
    }

    /**
     * Mostrar categorías en menú
     */
    showCategoriesInMenu(categories) {
        // Añadir menú categorías
        const li = document.createElement('li');
        li.classList.add('nav-item');
        li.classList.add('dropdown');
        li.insertAdjacentHTML('beforeend',
            `<a class="nav-link dropdown-toggle text-uppercase" href="#" id="navCategorias" role="button"
			data-bs-toggle="dropdown">Categorías</a>`
        );

        // Crear contenedor para añadir categorías
        const container = document.createElement('ul');
        container.classList.add('dropdown-menu');
        // Añadir lista de categorías
        for (const cat of categories) {
            container.insertAdjacentHTML('beforeend', `
                <li><a data-category="${cat.category.name}" class="dropdown-item text-uppercase" href="#">${cat.category.name}</a></li>`);
        }
        // Añadir contenedor de categorías al final del menú
        li.append(container);
        // Añadir menú al final
        this.menu.append(li);
    }

    /**
    * Mostrar producciones aleatorias
    */
    showRandomProductions(productions) {
        // Crear contenedor para mostrar de producciones
        const container = document.createElement('div');
        // Crear título
        const h2 = document.createElement('h2');
        h2.classList.add('h2', 'fw-bold', 'mb-4', 'border-start', 'border-5', 'border-black', 'ps-3', 'text-uppercase');
        h2.innerHTML = 'Producciones';
        // Añadir título al final
        container.append(h2);

        // Crear contenedor con las cards de producciones
        const row = document.createElement('div');
        row.classList.add('row', 'row-cols-1', 'row-cols-md-2', 'row-cols-lg-2', 'row-cols-xl-3', 'row-cols-xxl-4', 'mb-4', 'g-4');
        container.append(row);
        for (const prod of productions) {
            row.insertAdjacentHTML("beforeend", ` 
                <div class="col">
                    <a href="#" data-production="${prod.title}">
                    <div class="card bg-section h-100 shadow">
                        <div class="card-header p-0 text-center">
                            <img src="${prod.image}">
                        </div>
                        <div class="card-body d-flex flex-column text-left">
                            <ul>
                                <li class="list-unstyled mb-0"><strong>Nacionalidad: </strong>${prod.nationality}</li>
                                <li class="list-unstyled mb-0"><strong>Publicación: </strong>${prod.publication.toLocaleDateString()}</li>
                                <li class="list-unstyled mb-0"><strong>Sinopsis: </strong>${prod.synopsis}</li>
                            </ul>
                        </div>
                        <div class="card-footer d-flex flex-column p-3">
                            <h5 class="card-title fw-bold text-center">${prod.title}</h5>  
                        </div>
                    </div>
                    </a>
                </div>`
            );
        }
        // Añadir contenedor al final
        this.main.append(container);
    }

    /**
     * Mostrar producciones
     */
    showProductionsByCategory(productions, categoryName) {
        // Limpiar contenido
        this.#emptyMain();

        // Crear contenedor para la lista de producciones por categoría
        const container = document.createElement('div');
        // Crear título
        const h2 = document.createElement('h2');
        h2.classList.add('h2', 'fw-bold', 'mb-4', 'border-start', 'border-5', 'border-black', 'ps-3', 'text-uppercase');
        h2.innerHTML = categoryName ? `Producciones de ${categoryName}` : `Producciones`;
        // Añadir título al final
        container.append(h2);

        // Crear contenedor con las cards de producciones
        const row = document.createElement('div');
        row.classList.add('row', 'row-cols-1', 'row-cols-md-2', 'row-cols-lg-2', 'row-cols-xl-3', 'row-cols-xxl-4', 'g-4');
        container.append(row);
        for (const prod of productions) {
            row.insertAdjacentHTML("beforeend", ` 
                <div class="col">
                    <a href="#" data-production="${prod.title}">
                    <div class="card bg-section h-100 shadow">
                        <div class="card-header p-0 text-center">
                            <img src="${prod.image}">
                        </div>
                        <div class="card-body d-flex flex-column text-left">
                            <ul>
                                <li class="list-unstyled mb-0"><strong>Nacionalidad: </strong>${prod.nationality}</li>
                                <li class="list-unstyled mb-0"><strong>Publicación: </strong>${prod.publication.toLocaleDateString()}</li>
                                <li class="list-unstyled mb-0"><strong>Sinopsis: </strong>${prod.synopsis}</li>
                            </ul>
                        </div>
                        <div class="card-footer d-flex flex-column p-3">
                            <h5 class="card-title fw-bold text-center">${prod.title}</h5>  
                        </div>
                    </div>
                    </a>
                </div>`
            );
        }
        // Añadir contenedor al final
        this.main.append(container);
    }

    /**
     * Enlazar manejador handleProductionsByCategory con el evento
     */
    bindProductionsByCategory(handler) {
        // Buscar todos los enlaces de categorías
        const links = document.querySelectorAll('a[data-category]');

        for (const link of links) {
            // Evento click
            link.addEventListener('click', (event) => {
                // Obtener nombre categoría
                const { category } = event.currentTarget.dataset;

                // Ejecutar manejador
                this.#EXCECUTE_HANDLER(
                    handler,
                    [category],
                    '#content',
                    { action: 'productionsByCategory', category },
                    '#productionsByCategory',
                    event);
            });
        }
    }

    /**
     * Mostrar detalles de producción
     */
    showProductionDetail(prod, actNames = [], dirNames = []) {
        // Limpiar contenido
        this.#emptyMain();

        // Crear enlaces para los actores
        let actors = "";
        if (actNames.length > 0) {
            for (const actName of actNames) {
                actors += `<a href="#" data-actor="${actName}" class="badge bg-secondary">${actName}</a> `;
            }
        } else {
            actors = "Sin actores";
        }

        // Crear enlaces para los directores
        let directores = "";
        if (dirNames.length > 0) {
            for (const dirName of dirNames) {
                directores += `<a href="#" data-director="${dirName}" class="badge bg-secondary">${dirName}</a> `;
            }
        } else {
            directores = "Sin directores";
        }

        // Tipo y temporadas
        let tipo = "";
        let resource = "";
        let seasons = "";
        if (prod instanceof Movie) {
            tipo = "Película";
            resource = prod.resource;
            seasons = "Sin temporadas";
        } else if (prod instanceof Serie) {
            tipo = "Serie";
            resource = prod.resources;
            seasons = prod.seasons;
        }

        // Crear contenedor para los detalles
        const container = document.createElement('div');
        container.insertAdjacentHTML('beforeend', `
            <div class="row">
                <div class="col-md-8">
                    <h2 class="h2 fw-bold mb-4 border-start border-5 border-black ps-3 text-uppercase">${prod.title}</h2>
                    <div class="mb-4">
                        <span class="badge bg-dark">${tipo}</span>
                        <span class="badge bg-secondary mb-2">${prod.nationality}</span>
                        <span class="badge bg-outline-dark border text-dark mb-2">
                            ${prod.publication.toLocaleDateString()}
                        </span>
                    </div>
                    
                    <strong>Sinopsis</strong>
                    <p class="text-muted">${prod.synopsis}</p>

                    <hr class="my-4">

                    <ul>
                        <li><strong>Dirección:</strong> <div class="d-inline-block">${directores}</div></li>
                        <li><strong>Reparto:</strong> <div class="d-inline-block">${actors}</div></li>
                        <li><strong>Recurso:</strong> <div class="d-inline-block">${resource}</div></li>
                        <li><strong>Localización:</strong> <div class="d-inline-block">${prod.locations}</div></li>
                        <li><strong>Temporadas:</strong> <div class="d-inline-block">${seasons}</div></li>
                    </ul>

                    <div class="mt-4">
                        <button id="btnProd-open-window" class="btn btn-main btn-lg shadow-sm" data-production="${prod.title}">
                            Ver en nueva ventana
                        </button>
                    </div>
                </div>

                <div class="col-md-4 bg-light d-flex align-items-center justify-content-center">
                    <img src="${prod.image}" class="img-fluid w-100 h-100" style="object-fit: cover; min-height: 400px;">
                </div>
            </div>`
        );
        // Añadir contenedor al final
        this.main.append(container);
    }

    /**
     * Enlazar manejador handleShowProductionDetail con el evento
     */
    bindProductionDetail(handler) {
        // Buscar todos los enlaces de producciones
        const links = this.main.querySelectorAll('a[data-production]');

        for (const link of links) {
            // Evento click
            link.addEventListener('click', (event) => {
                // Ottener el nombre de producción
                const { production } = event.currentTarget.dataset;

                // Ejecutar manejador
                this.#EXCECUTE_HANDLER(
                    handler,
                    [production],
                    '#content',
                    { action: 'productionDetail', production },
                    '#productionDetail',
                    event
                );
            });
        }
    }

    /**
     * Mostrar actores
     */
    showActors(actors) {
        // Limpiar contenido
        this.#emptyMain();

        // Crear contenedor para la lista de actores
        const container = document.createElement('div');
        // Crear título
        const h2 = document.createElement('h2');
        h2.classList.add('h2', 'fw-bold', 'mb-4', 'border-start', 'border-5', 'border-black', 'ps-3', 'text-uppercase');
        h2.innerHTML = 'Actores';
        // Añadir título al final
        container.append(h2);

        // Crear contenedor con las cards de actores
        const row = document.createElement('div');
        row.classList.add('row', 'row-cols-1', 'row-cols-md-2', 'row-cols-lg-2', 'row-cols-xl-3', 'row-cols-xxl-4', 'g-4');
        container.append(row);
        for (const act of actors) {
            row.insertAdjacentHTML("beforeend", ` 
                <div class="col">
                    <a href="#" data-actor="${act.actor.name}">
                    <div class="card bg-section h-100 shadow overflow-hidden">
                        <div class="card-header p-0 text-center">
                            <img src="${act.actor.picture}">
                        </div>
                        <div class="card-body d-flex flex-column text-left">
                            <ul>
                                <li class="list-unstyled mb-0"><strong>Nacimiento: </strong>${act.actor.born.toLocaleDateString()}</li>
                                <li class="list-unstyled mb-0"><strong>Apellido 1: </strong>${act.actor.lastname1}</li>
                                <li class="list-unstyled mb-0"><strong>Apellido 2: </strong>${act.actor.lastname2}</li>
                            </ul>
                        </div>
                        <div class="card-footer d-flex flex-column p-3">
                            <h5 class="card-title fw-bold text-center">${act.actor.name}</h5>  
                        </div>
                    </div>
                    </a>
                </div>`
            );
        }
        // Añadir contenedor al final
        this.main.append(container);
    }

    /**
     * Mostrar categorías en menú
     */
    showActorsInMenu() {
        // Añadir menú actores
        const li = document.createElement('li');
        li.classList.add('nav-item');
        li.insertAdjacentHTML('beforeend',
            `<a id="navActores" class="nav-link text-uppercase" href="#" role="button">Actores</a>`
        );
        // Añadir menú al final
        this.menu.append(li);
    }

    /**
     * Enlazar manejador handleActors con el evento
     */
    bindActors(handler) {
        // Buscar enlace de actores
        const navAct = document.getElementById('navActores');

        // Evento click
        navAct.addEventListener('click', (event) => {
            // Ejecución de manejador
            this.#EXCECUTE_HANDLER(
                handler,
                [],
                '#content',
                { action: 'actors' },
                '#actors',
                event);
        });
    }

    /**
     * Mostrar detalles de actor
     */
    showActorDetail(act, prodNames = []) {
        // Limpiar contenido
        this.#emptyMain();

        // Crear enlaces para los actores
        let productions = "";
        if (prodNames.length > 0) {
            for (const prod of prodNames) {
                productions += `<a href="#" data-production="${prod.title}" class="badge bg-secondary">${prod.title}</a> `;
            }
        } else {
            productions = "Sin producciones";
        }

        // Crear contenedor para los detalles
        const container = document.createElement('div');
        container.insertAdjacentHTML('beforeend', `
            <div class="row">
                <div class="col-md-8">
                    <h2 class="h2 fw-bold mb-4 border-start border-5 border-black ps-3 text-uppercase">${act.name} ${act.lastname1} ${act.lastname2}</h2>
                    <div>
                        <strong>Nombre</strong>
                        <p class="text-muted">${act.name}</p>

                        <strong>Apellidos</strong>
                        <p class="text-muted">${act.lastname1} ${act.lastname2}</p>
                        
                        <strong>Nacimiento</strong>
                        <p class="text-muted">${act.born.toLocaleDateString()}</p>

                        <hr class="my-4">

                        <strong>Producciones:</strong> 
                        <span>${productions}</span>
                    </div>
                    <div class="mt-4">
                        <button id="btnAct-open-window" class="btn btn-main btn-lg shadow-sm" data-actor="${act.name}">
                            Ver en nueva ventana
                        </button>
                    </div>
                </div>

                <div class="col-md-4 bg-light d-flex align-items-center justify-content-center">
                    <img src="${act.picture}" class="img-fluid w-100 h-100" style="object-fit: cover; min-height: 100%;">
                </div>
            </div>`
        );
        // Añadir contenedor al final
        this.main.append(container);
    }

    /**
     * Enlazar manejador handleShowActorDetail con el evento
     */
    bindActorDetail(handler) {
        // Buscar todos los enlaces de actores
        const links = this.main.querySelectorAll('a[data-actor]');

        for (const link of links) {
            // Evento click
            link.addEventListener('click', (event) => {
                // Obtener el nombre del actor
                const { actor } = event.currentTarget.dataset;

                // Ejecutar manejador
                this.#EXCECUTE_HANDLER(
                    handler,
                    [actor],
                    '#content',
                    { action: 'actorDetail', actor },
                    '#actorDetail',
                    event
                );
            });
        }
    }

    /**
     * Mostrar directores
     */
    showDirectors(directors) {
        // Limpiar contenido
        this.#emptyMain();

        // Crear contenedor para la lista de directores
        const container = document.createElement('div');
        // Crear título
        const h2 = document.createElement('h2');
        h2.classList.add('h2', 'fw-bold', 'mb-4', 'border-start', 'border-5', 'border-black', 'ps-3', 'text-uppercase');
        h2.innerHTML = 'Directores';
        // Añadir título al final
        container.append(h2);

        // Crear contenedor con las cards de directores
        const row = document.createElement('div');
        row.classList.add('row', 'row-cols-1', 'row-cols-md-2', 'row-cols-lg-2', 'row-cols-xl-3', 'row-cols-xxl-4', 'g-4');
        container.append(row);
        for (const dir of directors) {
            row.insertAdjacentHTML("beforeend", ` 
                <div class="col">
                    <a href="#" data-director="${dir.director.name}">
                    <div class="card bg-section h-100 shadow">
                        <div class="card-header p-0 text-center">
                            <img src="${dir.director.picture}">
                        </div>
                        <div class="card-body d-flex flex-column text-left">
                            <ul>
                                <li class="list-unstyled mb-0"><strong>Nacimiento: </strong>${dir.director.born.toLocaleDateString()}</li>
                                <li class="list-unstyled mb-0"><strong>Apellido 1: </strong>${dir.director.lastname1}</li>
                                <li class="list-unstyled mb-0"><strong>Apellido 2: </strong>${dir.director.lastname2}</li>
                            </ul>
                        </div>
                        <div class="card-footer d-flex flex-column p-3">
                            <h5 class="card-title fw-bold text-center">${dir.director.name}</h5>  
                        </div>
                    </div>
                    </a>
                </div>`
            );
        }
        // Añadir contenedor al final
        this.main.append(container);
    }

    /**
     * Mostrar categorías en menú
     */
    showDirectorsInMenu() {
        // Añadir menú directores
        const li = document.createElement('li');
        li.classList.add('nav-item');
        li.insertAdjacentHTML('beforeend',
            `<a id="navDirectores" class="nav-link text-uppercase" href="#" role="button">Directores</a>`
        );
        // Añadir menú al final
        this.menu.append(li);
    }

    /**
    * Enlazar manejador handleDirectors con el evento
    */
    bindDirectors(handler) {
        // Buscar enlace de directores
        const navAct = document.getElementById('navDirectores');

        // Evento click
        navAct.addEventListener('click', (event) => {
            // Ejecución de manejador
            this.#EXCECUTE_HANDLER(
                handler,
                [],
                '#content',
                { action: 'directors' },
                '#directors',
                event);
        });
    }

    /**
     * Mostrar detalles de director
     */
    showDirectorDetail(dir, prodNames = []) {
        // Limpiar contenido
        this.#emptyMain();

        // Crear enlaces para los directores
        let productions = "";
        if (prodNames.length > 0) {
            for (const prod of prodNames) {
                productions += `<a href="#" data-production="${prod.title}" class="badge bg-secondary">${prod.title}</a> `;
            }
        } else {
            productions = "Sin producciones";
        }

        // Crear contenedor para los detalles
        const container = document.createElement('div');
        container.insertAdjacentHTML('beforeend', `
            <div class="row">
                <div class="col-md-8">
                    <h2 class="h2 fw-bold mb-4 border-start border-5 border-black ps-3 text-uppercase">${dir.name} ${dir.lastname1} ${dir.lastname2}</h2>
                    <div>
                        <strong>Nombre</strong>
                        <p class="text-muted">${dir.name}</p>
                        <strong>Apellidos</strong>
                        <p class="text-muted">${dir.lastname1} ${dir.lastname2}</p> 
                        <strong>Nacimiento</strong>
                        <p class="text-muted">${dir.born.toLocaleDateString()}</p>
                        <hr class="my-4">
                        <strong>Producciones:</strong> 
                        <span>${productions}</span>
                    </div>
                    <div class="mt-4">
                        <button id="btnDir-open-window" class="btn btn-main btn-lg shadow-sm" data-director="${dir.name}">
                            Ver en nueva ventana
                        </button>
                    </div>
                </div>

                <div class="col-md-4 bg-light d-flex align-items-center justify-content-center">
                    <img src="${dir.picture}" class="img-fluid w-100 h-100" style="object-fit: cover; min-height: 100%;">
                </div>
            </div>`
        );
        // Añadir contenedor al final
        this.main.append(container);
    }

    /**
     * Enlazar manejador handleShowDirectorDetail con el evento
     */
    bindDirectorDetail(handler) {
        // Buscar todos los enlaces de producciones
        const links = this.main.querySelectorAll('a[data-director]');

        for (const link of links) {
            // Evento click
            link.addEventListener('click', (event) => {
                // Obtener el nombre del director
                const { director } = event.currentTarget.dataset;

                // Ejecutar manejador
                this.#EXCECUTE_HANDLER(
                    handler,
                    [director],
                    '#content',
                    { action: 'directorDetail', director },
                    '#directorDetail',
                    event
                );
            });
        }
    }

    /**
    * Mostrar producción en ventana nueva 
    */
    showProductionInNewWindow(prod, actNames, dirNames) {
        // Acceder al main y header de la ventana hija
        const main = this.newWindow.document.querySelector('main');
        const header = this.newWindow.document.querySelector('header nav');

        // Limpiar contenido
        main.replaceChildren();
        if (header) header.replaceChildren();

        if (prod) {
            // Título página nueva
            this.newWindow.document.title = `Detalles de ${prod.title}`;

            // Crear enlaces para los actores
            let actors = "";
            if (actNames.length > 0) {
                for (const actName of actNames) {
                    actors += `<span class="badge bg-secondary">${actName} </span>`;
                }
            } else {
                actors = "Sin actores";
            }

            // Crear enlaces para los directores
            let directores = "";
            if (dirNames.length > 0) {
                for (const dirName of dirNames) {
                    directores += `<span class="badge bg-secondary">${dirName}</span> `;
                }
            } else {
                directores = "Sin directores";
            }

            // Tipo y temporadas
            let tipo = "";
            let resource = "";
            let seasons = "";
            if (prod instanceof Movie) {
                tipo = "Película";
                resource = prod.resource;
                seasons = "Sin temporadas";
            } else if (prod instanceof Serie) {
                tipo = "Serie";
                resource = prod.resources;
                seasons = prod.seasons;
            }

            // Crear contenedor para los detalles de producción
            const container = this.newWindow.document.createElement('div');
            container.classList.add('container');
            container.insertAdjacentHTML('beforeend', `
                <div class="row">
                    <div class="col-md-8 p-4">
                        <h2 class="h2 fw-bold mb-4 border-start border-5 border-black ps-3 text-uppercase">${prod.title}</h2>
            
                        <div class="mb-4">
                            <span class="badge bg-dark">${tipo}</span>
                            <span class="badge bg-secondary mb-2">${prod.nationality}</span>
                            <span class="badge bg-outline-dark border text-dark mb-2 ms-2">
                                ${prod.publication.toLocaleDateString()}
                            </span>
                        </div>
                        
                        <strong>Sinopsis</strong>
                        <p class="text-muted">${prod.synopsis}</p>

                        <hr class="my-4">

                        <ul>
                            <li><strong>Dirección:</strong> <div class="d-inline-block">${directores}</div></li>
                            <li><strong>Reparto:</strong> <div class="d-inline-block">${actors}</div></li>
                            <li><strong>Recurso:</strong> <div class="d-inline-block">${resource}</div></li>
                            <li><strong>Localización:</strong> <div class="d-inline-block">${prod.locations}</div></li>
                            <li><strong>Temporadas:</strong> <div class="d-inline-block">${seasons}</div></li>
                        </ul>

                        <div class="mt-4">
                            <button class="btn btn-main" onclick="window.close()">Cerrar Ficha</button>
                        </div>
                    </div>

                    <div class="col-md-4 bg-light d-flex align-items-center justify-content-center">
                        <img src="${prod.image}" class="img-fluid w-100 h-100" style="object-fit: cover; min-height: 400px;">
                    </div>
                </div>`
            );
            // Añadir contenedor al final
            main.append(container);
        }
        // Hacer scroll al inicio de la nueva ventana
        this.newWindow.document.body.scrollIntoView();
    }

    /**
     * Enlazar manejador handleOpenNewWindow con el evento
     */
    bindShowProductionInNewWindow(handler) {
        // Buscar enlace de boton btnProd
        const bOpen = document.getElementById('btnProd-open-window')

        if (bOpen) {
            // Evento click
            bOpen.addEventListener('click', (event) => {
                // Obtener el nombre de producción
                const { production } = bOpen.dataset;

                // Detener propagación en padres o repetidos
                event.preventDefault();
                event.stopPropagation();

                // Abrir la ventana
                this.newWindow = window.open('newwindow.html', '_blank', 'width=800,height=500');

                // Añadir ventana al array
                this.openedWindows.push(this.newWindow);
                this.openedWindows = this.openedWindows.filter(win => win && !win.closed);

                // Esperar a que cargue
                this.newWindow.addEventListener('load', () => {
                    handler(production);
                }, { once: true });
            });
        }
    }

    /**
    * Mostrar actor en ventana nueva
    */
    showActorInNewWindow(act) {
        // Acceder al main y header de la ventana hija
        const main = this.newWindow.document.querySelector('main');
        const header = this.newWindow.document.querySelector('header nav');

        // Limpiar contenido
        main.replaceChildren();
        if (header) header.replaceChildren();

        if (act) {
            // Título página nueva
            this.newWindow.document.title = `Detalles de ${act.name}`;

            // Crear contenedor para los detalles del actor
            const container = this.newWindow.document.createElement('div');
            container.classList.add('container');
            container.insertAdjacentHTML('beforeend', `
                <div class="row">
                    <div class="col-md-8 p-4">
                        <h2 class="h2 fw-bold mb-4 border-start border-5 border-black ps-3 text-uppercase">${act.name} ${act.lastname1} ${act.lastname2}</h2>
                        <div>
                            <stron>Nombre</stron>
                            <p class="text-muted">${act.name}</p>

                            <strong>Apellidos</strong>
                            <p class="text-muted">${act.lastname1} ${act.lastname2}</p>
                            
                            <strong>Nacimiento</strong>
                            <p class="text-muted">${act.born.toLocaleDateString()}</p>

                            <hr class="my-4">
                        </div>
                        <div class="mt-4">
                            <button class="btn btn-main" onclick="window.close()">Cerrar Ficha</button>
                        </div>
                    </div>

                    <div class="col-md-4 bg-light d-flex align-items-center justify-content-center">
                        <img src="${act.picture}" class="img-fluid w-100 h-100" style="object-fit: cover; min-height: 100%;">
                    </div>
                </div>`
            );
            // Añadir contenedor al final
            main.append(container);
        }
        // Hacer scroll al inicio de la nueva ventana
        this.newWindow.document.body.scrollIntoView();
    }

    /**
     * Enlazar manejador handleOpenActorWindow con el evento
     */
    bindShowActorInNewWindow(handler) {
        // Buscar enlace de boton btnAct
        const bOpen = document.getElementById('btnAct-open-window')

        if (bOpen) {
            // Evento click
            bOpen.addEventListener('click', (event) => {
                // Obtener el nombre del actor
                const { actor } = bOpen.dataset;

                // Detener propagación en padres o repetidos
                event.preventDefault();
                event.stopPropagation();

                // Abrir la ventana
                this.newWindow = window.open('newwindow.html', '_blank', 'width=800,height=500');

                // Añadir ventana al array
                this.openedWindows.push(this.newWindow);
                this.openedWindows = this.openedWindows.filter(win => win && !win.closed);

                // Esperar a que cargue
                this.newWindow.addEventListener('load', () => {
                    handler(actor);
                }, { once: true });
            });
        }
    }

    /**
     * Mostrar director en ventana nueva
     */
    showDirectorInNewWindow(dir) {
        // Acceder al main y header de la ventana hija
        const main = this.newWindow.document.querySelector('main');
        const header = this.newWindow.document.querySelector('header nav');

        // Limpiar contenido
        main.replaceChildren();
        if (header) header.replaceChildren();

        if (dir) {
            // Título página nueva
            this.newWindow.document.title = `Detalles de ${dir.name}`;

            // Crear contenedor para los detalles del director
            const container = this.newWindow.document.createElement('div');
            container.classList.add('container');
            container.insertAdjacentHTML('beforeend', `
                <div class="row">
                    <div class="col-md-8 p-4">
                        <h2 class="h2 fw-bold mb-4 border-start border-5 border-black ps-3 text-uppercase">${dir.name} ${dir.lastname1} ${dir.lastname2}</h2>
                        <div>
                            <strong>Nombre</strong>
                            <p class="text-muted">${dir.name}</p>
                            <strong>Apellidos</strong>
                            <p class="text-muted">${dir.lastname1} ${dir.lastname2}</p> 
                            <strong>Nacimiento</strong>
                            <p class="text-muted">${dir.born.toLocaleDateString()}</p>
                            <hr class="my-4">
                        </div>
                        <div class="mt-4">
                            <button class="btn btn-main" onclick="window.close()">Cerrar Ficha</button>
                        </div>
                    </div>

                    <div class="col-md-4 bg-light d-flex align-items-center justify-content-center">
                        <img src="${dir.picture}" class="img-fluid w-100 h-100" style="object-fit: cover; min-height: 100%;">
                    </div>
                </div>`
            );
            // Añadir contenedor al final
            main.append(container);
        }
        // Hacer scroll al inicio de la nueva ventana
        this.newWindow.document.body.scrollIntoView();
    }

    /**
     * Enlazar manejador handleOpenDirectorWindow con el evento
     */
    bindShowDirectorInNewWindow(handler) {
        // Buscar enlace de boton btnDir
        const bOpen = document.getElementById('btnDir-open-window')

        if (bOpen) {
            // Evento click
            bOpen.addEventListener('click', (event) => {
                // Obtener el nombre del director
                const { director } = bOpen.dataset;

                // Detener propagación en padres o repetidos
                event.preventDefault();
                event.stopPropagation();

                // Abrir la ventana
                this.newWindow = window.open('newwindow.html', '_blank', 'width=800,height=500');

                // Añadir ventana al array
                this.openedWindows.push(this.newWindow);
                this.openedWindows = this.openedWindows.filter(win => win && !win.closed);

                // Esperar a que cargue
                this.newWindow.addEventListener('load', () => {
                    handler(director);
                }, { once: true });
            });
        }
    }

    /**
     * Cerrar ventanas
     */
    closeAllWindows() {
        for (const win of this.openedWindows) {
            if (win && !win.closed) {
                // Cerrar ventannas
                win.close();
            }
        }
        // Vaciar el array
        this.openedWindows = [];
    }

    /**
     * Enlazar manejador handleCloseAllWindows con el evento
     */
    bindCloseAllWindows(handler) {
        // Buscar enlace de cerrar ventanas
        const navClose = document.getElementById('navCerrarVentanas');
        if (navClose) {
            // Evento click
            navClose.addEventListener('click', (event) => {
                event.preventDefault();
                handler();
            });
        }
    }

    /**
     * Mostrar opciones admin
     */
    showAdminMenu() {
        const menuOption = document.createElement('li');
        menuOption.classList.add('nav-item', 'dropdown', 'text-uppercase');
        menuOption.insertAdjacentHTML(
            'afterbegin',
            '<a class="nav-link dropdown-toggle" href="#" id="navServices" role="button" data-bs-toggle="dropdown" aria-expanded="false">	Adminitración</a>',
        );
        const suboptions = document.createElement('ul');
        suboptions.classList.add('dropdown-menu');
        suboptions.insertAdjacentHTML('beforeend', '<li><a id="newProduction" class="dropdown-item" href="#new-production">Crear producción</a></li>');
        suboptions.insertAdjacentHTML('beforeend', '<li><a id="remProduction" class="dropdown-item" href="#rem-production">Eliminar producción</a></li>');
        suboptions.insertAdjacentHTML('beforeend', '<li><a id="assProduction" class="dropdown-item" href="#new-production">Asignar producción</a></li>');
        suboptions.insertAdjacentHTML('beforeend', '<li><a id="desProduction" class="dropdown-item" href="#rem-production">Desasignar producción</a></li>');
        menuOption.append(suboptions);
        this.menu.append(menuOption);
    }

    /**
     * Enlazar manejador admin con el evento
     */
    bindAdminMenu(hNewProductionForm, hRemoveProduction, hAssignProduction, hDeassignProduction) {
        const newProductionLink = document.getElementById('newProduction');
        newProductionLink.addEventListener('click', (event) => {
            this.#EXCECUTE_HANDLER(hNewProductionForm, [], '#new-production', { action: 'newProduction' }, '#', event);
        });
        const delProductionLink = document.getElementById('remProduction');
        delProductionLink.addEventListener('click', (event) => {
            this.#EXCECUTE_HANDLER(hRemoveProduction, [], '#remove-production', { action: 'removeProduction' }, '#', event);
        });
        const assignProductionLink = document.getElementById('assProduction');
        assignProductionLink.addEventListener('click', (event) => {
            this.#EXCECUTE_HANDLER(hAssignProduction, [], '#ass-production', { action: 'assProduction' }, '#', event);
        });
        const deassignProductionLink = document.getElementById('desProduction');
        deassignProductionLink.addEventListener('click', (event) => {
            this.#EXCECUTE_HANDLER(hDeassignProduction, [], '#des-production', { action: 'desProduction' }, '#', event);
        });
    }

    /**
     * Mostrar formulario producciones
     */
    showNewProductionForm(categories, actors, directors) {
        // Limpiar contenido
        this.#emptyMain();

        // Crear contenedor
        const container = document.createElement('div');
        // Crear título
        const h2 = document.createElement('h2');
        h2.classList.add('h2', 'fw-bold', 'mb-4', 'border-start', 'border-5', 'border-black', 'ps-3', 'text-uppercase');
        h2.innerHTML = 'Crear producción';
        // Añadir título al final
        container.append(h2);

        // Crear formulario
        const form = document.createElement('form');
        form.name = 'fNewProduction';
        form.setAttribute('role', 'form');
        form.setAttribute('novalidate', '');

        // Título
        form.insertAdjacentHTML('beforeend', ` 
                <div class="mb-3">
                    <label class="form-label" for="npTitle">Título</label>
                    <input type="text" class="form-control" id="npTitle" name="npTitle" required>
                    <div class="invalid-feedback">El título es obligatorio.</div>
                    <div class="valid-feedback">Título correcto.</div>
                </div>
        `);

        // Tipo
        form.insertAdjacentHTML('beforeend', ` 
            <div class="mb-3">
                <label class="form-label" for="npType">Tipo</label>
                <select class="form-select" id="npType" name="npType" required>
                    <option value="">Selecciona tipo...</option>
                    <option value="Movie">Película</option>
                    <option value="Serie">Serie</option>
                </select>
                <div class="invalid-feedback">Selecciona un tipo.</div>
                <div class="valid-feedback">Título correcto.</div>
            </div>
        `);

        // Temporadas (Campos específicos serie)
        form.insertAdjacentHTML('beforeend', `
            <div id="serieFields" style="display:none;">
                <label class="form-label mt-2" for="npSeasons">Temporadas</label>
                <input type="number" class="form-control" id="npSeasons" name="npSeasons" required>
                <div class="invalid-feedback">Las temporadas es obligatorio.</div>
                    <div class="valid-feedback">Temporadas correcto.</div>
            </div>
        `);

        // Categorías
        form.insertAdjacentHTML('beforeend', ` 
                <div class="mb-3">
                    <label class="form-label">Categorías</label>
                    <select class="form-select" id="npCategories" name="npCategories" multiple required>
                        
                    </select>
                    <div class="invalid-feedback">Selecciona al menos una categoría.</div>
                    <div class="valid-feedback">Categorías seleccionadas.</div>
                </div>
        `);
        // Mostrar categorías
        const npCategories = form.querySelector('#npCategories');
        for (const cat of categories) {
            const category = cat.category;
            npCategories.insertAdjacentHTML('beforeend', `<option value="${category.name}">${category.name}</option>`);
        }

        // Actores
        form.insertAdjacentHTML('beforeend', ` 
                <div class="mb-3">
                    <label class="form-label">Actores</label>
                    <select class="form-select" id="npActors" name="npActors" multiple required>
                        
                    </select>
                    <div class="invalid-feedback">Selecciona al menos un actor.</div>
                    <div class="valid-feedback">Actores seleccionados.</div>
                </div>
        `);
        // Mostrar actores
        const npActors = form.querySelector('#npActors');
        for (const act of actors) {
            const actor = act.actor;
            npActors.insertAdjacentHTML('beforeend', `<option value="${actor.name}">${actor.name}</option>`);
        }

        // Directores
        form.insertAdjacentHTML('beforeend', ` 
                <div class="mb-3">
                    <label class="form-label">Directores</label>
                    <select class="form-select" id="npDirectors" name="npDirectors" multiple required>
                        
                    </select>
                    <div class="invalid-feedback">Selecciona al menos un director.</div>
                    <div class="valid-feedback">Directores seleccionados.</div>
                </div>
        `);
        // Mostrar directores
        const npDirectors = form.querySelector('#npDirectors');
        for (const dir of directors) {
            const director = dir.director;
            npDirectors.insertAdjacentHTML('beforeend', `<option value="${director.name}">${director.name}</option>`);
        }

        // Nacionalidad
        form.insertAdjacentHTML('beforeend', ` 
                <div class="mb-3">
                    <label class="form-label" for="npNationality">Nacionalidad</label>
                    <input type="text" class="form-control" id="npNationality" name="npNationality" required>
                    <div class="invalid-feedback">La nacionalidad es obligatoria.</div>
                    <div class="valid-feedback">Nacionalidad correcta.</div>
                </div>
        `);

        // Fecha de publicación
        form.insertAdjacentHTML('beforeend', ` 
                <div class="mb-3">
                    <label class="form-label" for="npPubDate">Fecha Publicación</label>
                    <input type="date" class="form-control" id="npPubDate" name="npPubDate" required>
                    <div class="invalid-feedback">Selecciona una fecha válida.</div>
                    <div class="valid-feedback">Fecha correcta.</div>
                </div>
        `);

        // Imagen
        form.insertAdjacentHTML('beforeend', ` 
                <div class="mb-3">
                    <label class="form-label" for="npImage">Imagen</label>
                    <input type="url" class="form-control" id="npImage" name="npImage" required>
                    <div class="invalid-feedback">Introduce una URL válida.</div>
                    <div class="valid-feedback">Imagen correcta.</div>
                </div>
        `);

        // Sinopsis
        form.insertAdjacentHTML('beforeend', ` 
                <div class="mb-3">
                    <label class="form-label" for="npSynopsis">Sinopsis</label>
                    <textarea class="form-control" id="npSynopsis" name="npSynopsis" rows="3"></textarea>
                    <div class="valid-feedback">Opcional.</div>
                </div>
        `);

        // Recursos
        form.insertAdjacentHTML('beforeend', `
            <div class="mb-3">
                <label class="form-label" for="npResource">Recurso</label>
                <input type="text" class="form-control" id="npResource" name="npResource" required>
                <div class="invalid-feedback">Recursos es obligatorio.</div>
                <div class="valid-feedback">Recursos correcto.</div>
            </div>
        `);

        // Localizaciones
        form.insertAdjacentHTML('beforeend', `
            <div class="mb-3">
                <label class="form-label" for="npLocation">Localización</label>
                <input type="text" class="form-control" id="npLocation" name="npLocation" required>
                <div class="invalid-feedback">La localización es obligatoria.</div>
                <div class="valid-feedback">Localización correcta.</div>
            </div>
        `);

        // Botones
        form.insertAdjacentHTML('beforeend', ` 
                <button type="reset" class="btn btn-secondary">Limpiar</button>
                <button type="submit" class="btn btn-success">Guardar</button>
        `);

        // Eventos selección producción
        const typeSelect = form.querySelector('#npType');
        const serieFields = form.querySelector('#serieFields');

        typeSelect.addEventListener('change', () => {
            if (typeSelect.value === 'Serie') {
                serieFields.style.display = 'block';
            } else {
                serieFields.style.display = 'none';
            }
        });

        // Añadir formulario al final del contenedor
        container.append(form);
        // Añadir contenedor al final
        this.main.append(container);
    }

    /**
     * Mostrar modal confirmación
     */
    showNewProductionModal(done, production, error) {
        // Contenedor modal
        const messageModalContainer = document.getElementById('messageModal');
        const messageModal = new bootstrap.Modal('#messageModal');

        // Título
        const title = document.getElementById('messageModalTitle');
        title.innerHTML = done ? 'Producción creada correctamente' : 'Error al crear producción';

        // Mensaje
        const body = messageModalContainer.querySelector('.modal-body');
        body.replaceChildren();
        if (done) {
            body.insertAdjacentHTML(
                'afterbegin',
                `<div class="p-3">La producción <strong>${production.title}</strong> ha sido creada correctamente.</div>`
            );
        } else {
            body.insertAdjacentHTML(
                'afterbegin',
                `<div class="error text-danger p-3">
                <i class="bi bi-exclamation-triangle"></i>
                La producción <strong>${production.title} - ${production.title}</strong> no ha podido crearse correctamente.
                </div>`
            );
        }

        // Mostrar modal
        messageModal.show();

        // Evento cerrar modal
        messageModalContainer.addEventListener('hidden.bs.modal', () => {
            if (done) document.fNewProduction.reset();
            document.fNewProduction.npTitle.focus();
        }, { once: true });
    }

    /**
     * Enlazar manejador handleCreateProduction con la validación
     */
    bindNewProductionForm(handler) {
        newProductionValidation(handler);
    }

    /**
     * Genera el contenedor con el filtro de categorías
     */
    showRemoveProductionForm(categories) {
        // Limpiar contenido
        this.#emptyMain();

        // Crear contenedor
        const container = document.createElement('div');
        container.id = 'remove-production-container';
        container.classList.add('container');

        // Crear formulario
        container.insertAdjacentHTML('afterbegin', `
        <h2 class="h2 fw-bold mb-4 border-start border-5 border-black ps-3 text-uppercase">
            Eliminar producción
        </h2>
        <div class="row mb-4">
            <div class="col-md-12">
                <label class="form-label" for="rpCategories">Filtrar por Categoría</label>
                <select class="form-select" id="rpCategories">
                    <option value="" selected>Selecciona una categoría...</option>
                </select>
            </div>
        </div>
        <div id="production-list" class="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3 row-cols-xxl-4 g-4">
        </div>
    `);

        // Selección de categoría
        const select = container.querySelector('#rpCategories');
        for (const catObj of categories) {
            select.insertAdjacentHTML('beforeend', `<option value="${catObj.category.name}">${catObj.category.name}</option>`);
        }

        this.main.append(container);
    }

    /**
     * Mostrar producciones borrar
     */
    showRemoveProductionForm2(productions) {
        const productionList = document.getElementById('production-list');

        // Limpiar contenido
        productionList.replaceChildren();

        let exist = false;
        for (const prod of productions) {
            exist = true;
            // Crear formulario
            productionList.insertAdjacentHTML('beforeend', `
            <div class="col">
                <figure class="card card-product-grid card-lg">
                    <div class="img-wrap">
                        <img src="${prod.image}" class="card-img-top" alt="${prod.title}" style="height: 300px; object-fit: cover;">
                    </div>
                    <figcaption class="info-wrap p-3">
                        <div class="row">
                            <div class="col-md-12">
                                <h5 class="title">${prod.title}</h5>
                                <p class="text-muted small">${prod.nationality} | ${prod.publication.getFullYear()}</p>
                            </div>
                        </div>
                    </figcaption>
                    <div class="bottom-wrap p-3 border-top">
                        <button data-title="${prod.title}" class="btn btn-danger float-right">
                            <i class="bi bi-trash"></i> Eliminar
                        </button>
                    </div>
                </figure>
            </div>`);
        }

        // Sin producciones
        if (!exist) {
            row.insertAdjacentHTML('beforeend', `
            <div class="col-12">
                <p class="text-danger"><i class="bi bi-exclamation-triangle"></i> No existen producciones registradas en el sistema.</p>
            </div>`);
        }
    }

    /**
     * Mostrar modal confirmación
     */
    showRemoveProductionModal(done, production, error) {
        // Contenedor modal
        const productionList = document.getElementById('production-list');
        const messageModalContainer = document.getElementById('messageModal');
        const messageModal = new bootstrap.Modal('#messageModal');

        // Título
        const title = document.getElementById('messageModalTitle');
        title.innerHTML = done ? 'Producción eliminada correctamente' : 'Error al eliminar producción';

        // Mensaje
        const body = messageModalContainer.querySelector('.modal-body');
        body.replaceChildren();
        if (done) {
            body.insertAdjacentHTML(
                'afterbegin',
                `<div class="p-3">La producción <strong>${production.title}</strong> ha sido eliminada correctamente.</div>`
            );
        } else {
            body.insertAdjacentHTML(
                'afterbegin',
                `<div class="error text-danger p-3">
                <i class="bi bi-exclamation-triangle"></i>
                    No se pudo eliminar la producción.
                </div>`
            );
        }

        // Mostrar modal
        messageModal.show();

        // Evento cerrar modal
        const listener = (event) => {
            if (done) {
                const button = productionList.querySelector(`button[data-title="${production.title}"]`);
                button.closest('.col').remove();
            }
        };
        messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
    }

    /**
     * Enlazar manejador handleRemoveProductionForm con el evento
     */
    bindRemoveProductionCategory(handler) {
        const select = document.getElementById('rpCategories');
        select.addEventListener('change', (event) => {
            handler(event.target.value);
        });
    }

    /**
     * Enlazar manejador handleRemoveProduction con el evento
     */
    bindRemoveProduction(handler) {
        const productionList = document.getElementById('production-list');
        const buttons = productionList.querySelectorAll('button');

        for (const but of buttons) {
            but.addEventListener('click', function (event) {
                handler(this.dataset.title);
                event.preventDefault();
            });
        }
    }

    /**
     * Mostrar formulario asignar producciones
     */
    showAssignProductionForm(productions, actors, directors) {
        // Limpiar contenido
        this.#emptyMain();

        // Crear contenedor para la asignación
        const container = document.createElement('div');
        const h2 = document.createElement('h2');
        h2.classList.add('h2', 'fw-bold', 'mb-4', 'border-start', 'border-5', 'border-black', 'ps-3', 'text-uppercase');
        h2.innerHTML = 'Asignar producción';
        container.append(h2);

        const form = document.createElement('form');
        form.name = 'fAssignProduction';
        form.setAttribute('role', 'form');
        form.setAttribute('novalidate', '');

        // Sección producciones
        form.insertAdjacentHTML('beforeend', ` 
            <div class="mb-3">
                <label class="form-label">Selecciona produccion</label>
                <select class="form-select" id="acProduction" name="acProduction" required>
                    <option value="" selected>Selecciona una producción...</option>
                </select>
                <div class="invalid-feedback">Selecciona al menos una producción.</div>
                <div class="valid-feedback">Producción seleccionada.</div>
            </div>
        `);
        // Obtener producciones
        const acProduction = form.querySelector('#acProduction');
        for (const prod of productions) {
            acProduction.insertAdjacentHTML('beforeend', `<option value="${prod.title}">${prod.title}</option>`);
        }

        // Sección actores
        form.insertAdjacentHTML('beforeend', ` 
            <div class="mb-3">
                <label class="form-label">Selecciona actores</label>
                <select class="form-select" id="acActors" name="acActors" multiple required>
                    
                </select>
                <div class="invalid-feedback">Selecciona actores.</div>
                <div class="valid-feedback">Actores seleccionados.</div>
            </div>
        `);
        // Obtener actores
        const acActors = form.querySelector('#acActors');
        for (const act of actors) {
            const actor = act.actor;
            acActors.insertAdjacentHTML('beforeend', `<option value="${actor.name}">${actor.name}</option>`);
        }

        // Sección directores
        form.insertAdjacentHTML('beforeend', ` 
            <div class="mb-3">
                <label class="form-label">Selecciona directores</label>
                <select class="form-select" id="acDirectors" name="acDirectors" multiple required>
                    
                </select>
                <div class="invalid-feedback">Selecciona directores.</div>
                <div class="valid-feedback">Directores seleccionados.</div>
            </div>
        `);
        // Obtener directores
        const acDirectors = form.querySelector('#acDirectors');
        for (const dir of directors) {
            const director = dir.director;
            acDirectors.insertAdjacentHTML('beforeend', `<option value="${director.name}">${director.name}</option>`);
        }

        form.insertAdjacentHTML('beforeend', ` 
                <button type="reset" class="btn btn-secondary">Limpiar</button>
                <button type="submit" class="btn btn-success">Guardar</button>
        `);

        container.append(form);
        this.main.append(container);
    }

    /**
     * Mostrar modal confirmación
     */
    showAssignProductionModal(done, production, error) {
        // Contenedor modal
        const messageModalContainer = document.getElementById('messageModal');
        const messageModal = new bootstrap.Modal('#messageModal');

        // Título
        const title = document.getElementById('messageModalTitle');
        title.innerHTML = done ? 'Produción asignada correctamente' : 'Error al asignar produción';

        // Mensaje
        const body = messageModalContainer.querySelector('.modal-body');
        body.replaceChildren();
        if (done) {
            body.insertAdjacentHTML(
                'afterbegin',
                `<div class="p-3">La producción <strong>${production.title}</strong> ha sido asignada correctamente.</div>`
            );
        } else {
            body.insertAdjacentHTML(
                'afterbegin',
                `<div class="error text-danger p-3">
                <i class="bi bi-exclamation-triangle"></i>
                La producción <strong>${production.title} - ${production.title}</strong> no ha podido asignar correctamente.
                </div>`
            );
        }

        // Mostrar modal
        messageModal.show();

        // Evento cerrar modal
        messageModalContainer.addEventListener('hidden.bs.modal', () => {
            if (done) document.fAssignProduction.reset();
            document.fAssignProduction.acProduction.focus();
        }, { once: true });
    }

    /**
     * Enlazar manejador handleAssignProduction con validación
     */
    bindAssignProductionForm(handler) {
        assignProductionValidation(handler);
    }

    /**
     * Mostrar formulario desasignar producción
     */
    showDeassignProductionForm(productions) {
        // Limpiar contenido
        this.#emptyMain();
        const container = document.createElement('div');
        container.classList.add('container');
        container.innerHTML = `<h2 class="h2 fw-bold mb-4 border-start border-5 border-black ps-3 text-uppercase">Desasignar producción</h2>`;

        const form = document.createElement('form');
        form.name = 'fDeassignProduction';
        form.setAttribute('novalidate', '');

        // *He desabilitado required para dar la flexibilidad de desasignar un actor o un director
        form.innerHTML = `
        <div class="mb-3">
            <label class="form-label">Producción</label>
            <select class="form-select" id="dcProduction" name="dcProduction" required>
                <option value="" hidden>Selecciona una producción...</option>
            </select>
            <div class="invalid-feedback">Selecciona una producción.</div>
            <div class="valid-feedback">Producción seleccionada.</div>
        </div>
        <div class="mb-3">
            <label class="form-label">Actores asignados</label>
            <select class="form-select" id="dcActors" name="dcActors" multiple>
                <option value="">Selecciona primero una producción...</option>
            </select>
            <div class="invalid-feedback">Selecciona al menos un actor para eliminar.</div>
            <div class="valid-feedback">Actor seleccionado.</div>
        </div>
        <div class="mb-3">
            <label class="form-label">Directores asignados</label>
            <select class="form-select" id="dcDirectors" name="dcDirectors" multiple>
                <option value="">Selecciona primero una producción...</option>
            </select>
            <div class="invalid-feedback">Selecciona al menos un director para eliminar.</div>
            <div class="valid-feedback">Director seleccionado.</div>
        </div>
        <button type="submit" class="btn btn-danger">Desasignar</button>
        <button type="reset" class="btn btn-secondary">Limpiar</button>
    `;
        // Mostrar producciones
        const dcProduction = form.querySelector('#dcProduction');
        for (const prod of productions) {
            dcProduction.insertAdjacentHTML('beforeend', `<option value="${prod.title}">${prod.title}</option>`);
        }

        container.append(form);
        this.main.append(container);
    }

    /**
     * Actualizar producciones según la categoría elegida
     */
    updateDeassignProductions(actors, directors) {
        const dcActors = document.getElementById('dcActors');
        // Limpiar contenido
        dcActors.replaceChildren();
        // Mostrar actores
        for (const act of actors) {
            dcActors.insertAdjacentHTML('beforeend', `<option value="${act}">${act}</option>`);
        }

        const dcDirectors = document.getElementById('dcDirectors');
        // Limpiar contenido
        dcDirectors.replaceChildren();
        // Mostrar directores
        for (const dir of directors) {
            dcDirectors.insertAdjacentHTML('beforeend', `<option value="${dir}">${dir}</option>`);
        }
    }

    /**
     * Enlazar manejador handleUpdateDeassignList con evento
     */
    bindUpdateDeassignProductions(handler) {
        // Evento change
        document.forms.fDeassignProduction.dcProduction.addEventListener('change', (event) => {
            handler(event.target.value);
        });
    }

    /**
     * Mostrar modal confirmación
     */
    showDeassignProductionModal(done, production, error) {
        // Contenedor modal
        const messageModalContainer = document.getElementById('messageModal');
        const messageModal = new bootstrap.Modal('#messageModal');

        // Título
        const title = document.getElementById('messageModalTitle');
        title.innerHTML = done ? 'Producción desasignada correctamente' : 'Error al desasignar producción';

        // Mensaje
        const body = messageModalContainer.querySelector('.modal-body');
        body.replaceChildren();
        if (done) {
            body.insertAdjacentHTML(
                'afterbegin',
                `<div class="p-3">La producción <strong>${production.title}</strong> ha sido desasignada correctamente.</div>`
            );
        } else {
            body.insertAdjacentHTML(
                'afterbegin',
                `<div class="error text-danger p-3">
                <i class="bi bi-exclamation-triangle"></i>
                La producción <strong>${production.title} - ${production.title}</strong> no ha podido desasignarse correctamente.
                </div>`
            );
        }

        // Mostrar modal
        messageModal.show();

        // Evento cerrar modal
        messageModalContainer.addEventListener('hidden.bs.modal', () => {
            if (done) document.fDeassignProduction.reset();
            document.fDeassignProduction.dcProduction.focus();
        }, { once: true });
    }

    /**
     * Enlazar manejador handleDeassignProduction con evento
     */
    bindDeassignProductionForm(handler) {
        deassignProductionValidation(handler);
    }
}

export default VideoSystemView;