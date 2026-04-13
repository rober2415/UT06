"use strict";

export class Category {
    #name; // Nombre de la categoría.
    #description; // Descripción de la categoría.

    constructor(name, description = "Sin descripción") {
        this.name = name;
        this.description = description;
    }

    get name() {
        return this.#name;
    }
    set name(name) {
        this.#name = name;
    }

    get description() {
        return this.#description;
    }
    set description(description) {
        this.#description = description;
    }

    toString() {
        return `${this.#name}, ${this.#description}`;
    }
}