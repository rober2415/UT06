"use strict";

import { Production } from "./Production.js";

export class Serie extends Production {
    #resources; // Array de Recursos con el contenido de los episodios.
    #locations; // Array con diferentes ubicaciones donde transcurre la película.
    #seasons; // Número de temporadas.

    constructor(title, nationality = "Sin nacionalidad", publication, synopsis = "Sin sinopsis", image = "Sin imagen", resources = null, locations = [], seasons) {
        super(title, nationality, publication, synopsis, image);
        this.resources = resources;
        this.locations = locations;
        this.seasons = seasons;
    }

    get resources() {
        return this.#resources;
    }
    set resources(resources) {
        this.#resources = resources;
    }

    get locations() {
        return this.#locations;
    }
    set locations(locations) {
        this.#locations = locations;
    }

    get seasons() {
        return this.#seasons;
    }
    set seasons(seasons) {
        this.#seasons = seasons;
    }

    toString() {
        return `${super.toString()}, ${this.#resources},${this.locations}, ${this.#seasons}`;
    }
}

