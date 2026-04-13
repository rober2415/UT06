"use strict";

export class Coordinate {
    #latitude; // Latitud de la ubicación.
    #longitude; // Longitud de la ubicación.

    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    get latitude() {
        return this.#latitude;
    }
    set latitude(latitude) {
        this.#latitude = latitude;
    }

    get longitude() {
        return this.#longitude;
    }
    set longitude(longitude) {
        this.#longitude = longitude;
    }

    toString() {
        return `${this.#latitude},${this.#longitude}`;
    }
}