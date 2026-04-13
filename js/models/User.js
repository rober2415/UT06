"use strict";

export class User {
    #username; // Nombre del usuario
    #email; // Nombre del usuario
    #password; // Contraseña del usuario.

    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    get username() {
        return this.#username;
    }
    set username(username) {
        this.#username = username;
    }

    get email() {
        return this.#email;
    }
    set email(email) {
        this.#email = email;
    }

    get password() {
        return this.#password;
    }
    set password(password) {
        this.#password = password;
    }

    toString() {
        return `${this.#username},${this.#email}, ${this.#password}`;
    }
}