"use strict";

export class Production {
    #title; // Título de la producción.
    #nationality; // Define la nacionalidad de la producción.
    #publication; // Fecha de publicación de la producción.
    #synopsis; // Resumen del contenido de la producción.
    #image; // String con la ruta donde está ubicada la imagen.

    constructor(title, nationality = "Sin nacionalidad", publication, synopsis = "Sin sinopsis", image = "Sin imagen") {
        this.title = title;
        this.nationality = nationality;
        this.publicaction = publication;
        this.synopsis = synopsis;
        this.image = image;
    }

    get title() {
        return this.#title;
    }
    set title(title) {
        this.#title = title;
    }

    get nationality() {
        return this.#nationality;
    }
    set nationality(nationality) {
        this.#nationality = nationality;
    }

    get publication() {
        return this.#publication;
    }
    set publicaction(publication) {
        this.#publication = publication;
    }

    get synopsis() {
        return this.#synopsis;
    }
    set synopsis(synopsis) {
        this.#synopsis = synopsis;
    }

    get image() {
        return this.#image;
    }
    set image(image) {
        this.#image = image;
    }

    toString() {
        return `${this.#title}, ${this.#nationality}, ${this.#publication}, ${this.#synopsis}, ${this.image}`;
    }
}
