"use strict";

// Excepciones personalizadas
export class Exception extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

// Excepción vacio
export class EmptyValueException extends Exception {
    constructor(expectedType) {
        super(`Error: El valor ${expectedType} no puede ser null.`);
    }
}

// Excepción null
export class NotNullValueException extends Exception {
    constructor(expectedType) {
        super(`Error: El valor ${expectedType} no puede ser null.`);
    }
}

// Excepción tipo
export class InvalidTypeException extends Exception {
    constructor(expectedType) {
        super(`Error: Solo se admiten objetos del tipo ${expectedType}`);
    }
}

// Excepción ya registrado
export class RegisteredException extends Exception {
    constructor(expectedType) {
        super(`Error: el/la ${expectedType} ya existe.`);
    }
}

// Excepción no registrado
export class NotRegisteredException extends Exception {
    constructor(expectedType) {
        super(`Error: el/la ${expectedType} no existe.`);
    }
}

export class RegisteredEmailException extends Exception {
    constructor(expectedType) {
        super(`Error: el ${expectedType} ya existe.`);
    }
}