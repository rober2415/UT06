"use strict";

import { Production } from "./Production.js";

export class Movie extends Production {
    #resource; // Recurso con el contenido de la película.
    #locations; // Array con diferentes ubicaciones donde transcurre la película.

    constructor(title, nationality = "Sin nacionalidad", publication, synopsis = "Sin sinopsis", image = "Sin imagen", resource = null, locations = []) {
        super(title, nationality, publication, synopsis, image);
        this.resource = resource;
        this.locations = locations;
    }

    get resource() {
        return this.#resource;
    }
    set resource(resource) {
        this.#resource = resource;
    }

    get locations() {
        return this.#locations;
    }
    set locations(locations) {
        this.#locations = locations;
    }

    toString() {
        return `${super.toString()},${this.#resource}, ${this.#locations}`;
    }
}