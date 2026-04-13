"use strict";

export class Resource {
    #duration; // Nº de minutos de la película.
    #link; // Ruta donde se ubica el recurso.

    constructor(duration, link) {
        this.duration = duration;
        this.link = link;
    }

    get duration() {
        return this.#duration;
    }
    set duration(duration) {
        this.#duration = duration;
    }

    get link() {
        return this.#link;
    }
    set link(link) {
        this.#link = link;
    }

    toString(){
        return `${this.#duration}, ${this.#duration}`;
    }
}