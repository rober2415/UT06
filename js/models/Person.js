"use strict";

export class Person {
    #name;  // Nombre de la persona.
    #lastname1; // Primer apellido de la persona.
    #lastname2; // Segundo apellido de la persona.
    #born; // Fecha de nacimiento.
    #picture; // String con la ruta donde está ubicada la imagen.

    constructor(name, lastname1, lastname2="", born, picture="Sin imagen") {
        this.name = name;
        this.lastname1 = lastname1;
        this.lastname2 = lastname2;
        this.born = born;
        this.picture = picture;
    }

    get name() {
        return this.#name;
    }
    set name(name) {
        this.#name = name;
    }

    get lastname1() {
        return this.#lastname1;
    }
    set lastname1(lastname1) {
        this.#lastname1 = lastname1;
    }

    get lastname2() {
        return this.#lastname2;
    }
    set lastname2(lastname2) {
        this.#lastname2 = lastname2;
    }

    get born() {
        return this.#born;
    }
    set born(born) {
        this.#born = born;
    }

    get picture() {
        return this.#picture;
    }
    set picture(picture) {
        this.#picture = picture;
    }

    toString() {
        return `Person ${this.#name}, ${this.#lastname1}, ${this.#lastname2}, ${this.#born}, ${this.#picture}}`;
    }
}

