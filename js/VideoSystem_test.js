"use strict";

import { VideoSystem } from "./models/VideoSystem.js";
import { VideoSystemView } from "./views/VideoSystemView.js";

function testVideoSystem() {
    // Instanacia singleton
    const nuevaInstancia = VideoSystem.getInstance("Nueva");
    const nuevaInstancia2 = VideoSystem.getInstance("nueva2");

    // Instancia de la vista
    const view = new VideoSystemView();

    // Comprobación singleton
    console.log(`Nombre de la instancia 1: ${nuevaInstancia.name}`);
    console.log(`Nombre de la instancia 2: ${nuevaInstancia2.name}`);

    // createCategory
    const cat1 = nuevaInstancia.createCategory("Categoría1", "Descripción categoría1");
    const cat2 = nuevaInstancia.createCategory("Categoría2");
    const cat3 = nuevaInstancia.createCategory("Categoría1", "Descripción categoría1");

    // addCategory
    nuevaInstancia.addCategory(cat1, cat2);

    // Muestro categorías
    for (const cat of nuevaInstancia.categories) {
        console.log(cat);
    }

    // Errores addCategory
    try {
        nuevaInstancia.addCategory("notcategory");
    } catch (error) {
        console.error("Error addCategory no puede ser null: ", error.message);
    }

    try {
        nuevaInstancia.addCategory(cat3);
    } catch (error) {
        console.error("Error addCategory ya existe: ", error.message);
    }

    // removeCategory
    nuevaInstancia.removeCategory(cat2);

    // Muestro categorías
    console.log("Categorías después de borrar:")
    for (const cat of nuevaInstancia.categories) {
        console.log(cat);
    }

    // Error removeCategory
    try {
        nuevaInstancia.removeCategory(cat1);
    } catch (error) {
        console.error("Error removeCategory no registrada: ", error.message);
    }

    // createUser
    const user1 = nuevaInstancia.createUser("usuario1", "email1", "password1");
    const user2 = nuevaInstancia.createUser("usuario2", "email2", "password2");
    const user3 = nuevaInstancia.createUser("usuario1", "email1", "password3");
    const user4 = nuevaInstancia.createUser("usuario4", "email1", "password4");

    // addUser
    nuevaInstancia.addUser(user1, user2);

    // Muestro usuarios
    for (const user of nuevaInstancia.users) {
        console.log("Usuarios después de añadir", user.toString());
    }

    // Errores addUser
    try {
        nuevaInstancia.addUser("notuser");
    } catch (error) {
        console.error("Error addUser tipo: ", error.message);
    }

    try {
        nuevaInstancia.addUser(user3);
    } catch (error) {
        console.error("Error addUser user ya existe: ", error.message);
    }

    try {
        nuevaInstancia.addUser(user4);
    } catch (error) {
        console.error("Error addUser email ya existe: ", error.message);
    }

    // removeUser
    nuevaInstancia.removeUser(user1);

    // Muestro usuarios
    for (const user of nuevaInstancia.users) {
        console.log("Usuarios después de borrar", user.toString());
    }

    // Errores removeUser
    try {
        nuevaInstancia.removeUser("notuser");
    } catch (error) {
        console.error("Error removeUser tipo: ", error.message);
    }
    try {
        nuevaInstancia.removeUser(user1);
    } catch (error) {
        console.error("Error removeUser ", error.message);
    }

    // createProduction
    const production1 = nuevaInstancia.createProduction("Titulo1", "Nacionalidad1", new Date(2001, 10, 10), "Sinopsis1", "Sin imagen");
    const production2 = nuevaInstancia.createProduction("Titulo2", "Nacionalidad2", new Date(2002, 10, 10), "Sinopsis2", "Sin imagen");
    const production3 = nuevaInstancia.createProduction("Titulo1", "Nacionalidad1", new Date(2001, 10, 10), "Sinopsis1", "Sin imagen");
    const production4 = nuevaInstancia.createProduction("Titulo3", "Nacionalidad2", new Date(2003, 10, 10), "Sinopsis1", "Sin imagen");
    const production5 = nuevaInstancia.createProduction("Titulo4", "Nacionalidad2", new Date(2004, 10, 10), "Sinopsis1", "Sin imagen");

    // addProduction
    nuevaInstancia.addProduction(production3, production4);
    nuevaInstancia.addProduction(production5);
    nuevaInstancia.addProduction(production1);
    nuevaInstancia.addProduction(production2);

    // Muestro producciones
    for (const production of nuevaInstancia.productions) {
        console.log(production.toString());
    }

    // Errores addProduction
    try {
        nuevaInstancia.addProduction("notproduction");
    } catch (error) {
        console.error("Error addProduction tipo: ", error.message);
    }

    try {
        nuevaInstancia.addProduction(production3);
    } catch (error) {
        console.error("Error addProduction ya existe: ", error.message);
    }

    // removeProduction
    nuevaInstancia.removeProduction(production1);

    // Muestro produciones
    for (const production of nuevaInstancia.productions) {
        console.log("Produciones después de borrar", production.toString());
    }

    // Errores removeProduction
    try {
        nuevaInstancia.removeProduction("notproduction");
    } catch (error) {
        console.error("Error removeProduction tipo: ", error.message);
    }
    try {
        nuevaInstancia.removeProduction(production1);
    } catch (error) {
        console.error("Error removeProduction no existe: ", error.message);
    }

    // createPerson
    const actor1 = nuevaInstancia.createPerson("Nombre1", "Primer Apellido1", "Segundo Apellido1", new Date(2001, 10, 10), "Sin imagen");
    const actor2 = nuevaInstancia.createPerson("Nombre2", "Primer Apellido2", "Segundo Apellido2", new Date(2002, 10, 10), "Sin imagen");
    const actor3 = nuevaInstancia.createPerson("Nombre1", "Primer Apellido1", "Segundo Apellido1", new Date(2001, 10, 10), "Sin imagen");

    // addActor
    nuevaInstancia.addActor(actor1, actor2);

    // Muestro los actores
    for (const actor of nuevaInstancia.actors) {
        console.log(actor.toString());
    }

    // Errores addActor
    try {
        nuevaInstancia.addActor("nottype");
    } catch (error) {
        console.error("Error addActor tipo: ", error.message);
    }

    try {
        nuevaInstancia.addActor(actor3);
    } catch (error) {
        console.error("Error addActor ya existe: ", error.message);
    }

    // removeActor
    nuevaInstancia.removeActor(actor1);

    // Muestro los actores
    for (const actor of nuevaInstancia.actors) {
        console.log(actor.toString());
    }

    // Errores removeActor
    try {
        nuevaInstancia.removeActor("notactor");
    } catch (error) {
        console.error("Error removeActor tipo: ", error.message);
    }
    try {
        nuevaInstancia.removeActor(actor1);
    } catch (error) {
        console.error("Error removeActor no existe: ", error.message);
    }

    // createPerson
    const director1 = nuevaInstancia.createPerson("Nombre1", "Primer Apellido1", "Segundo Apellido1", new Date(2001, 10, 10), "Sin imagen");
    const director2 = nuevaInstancia.createPerson("Nombre2", "Primer Apellido2", "Segundo Apellido2", new Date(2002, 10, 10), "Sin imagen");

    // addDirector
    nuevaInstancia.addDirector(director1, director2);

    // Muestro los directores
    for (const director of nuevaInstancia.directors) {
        console.log(director.toString());
    }

    // Errores addDirector
    try {
        nuevaInstancia.addDirector("nottype");
    } catch (error) {
        console.error("Error addDirector tipo: ", error.message);
    }

    try {
        nuevaInstancia.addDirector(director1);
    } catch (error) {
        console.error("Error addDirector ya existe: ", error.message);
    }

    // removeDirector
    nuevaInstancia.removeDirector(director1);

    // Muestro los directores
    for (const director of nuevaInstancia.directors) {
        console.log(director.toString());
    }

    // Errores removeDirector
    try {
        nuevaInstancia.removeDirector("notdirector");
    } catch (error) {
        console.error("Error removeDirector tipo: ", error.message);
    }
    try {
        nuevaInstancia.removeDirector(director1);
    } catch (error) {
        console.error("Error removeDirector no existe: ", error.message);
    }

    // assignCategory
    nuevaInstancia.assignCategory(cat1, production1);
    nuevaInstancia.assignCategory(cat2, production1);
    nuevaInstancia.assignCategory(cat2, production2);

    // Errores assignCategory
    try {
        nuevaInstancia.assignCategory(null, production1);
    } catch (error) {
        console.error("Error assignCategory: ", error.message);
    }

    try {
        nuevaInstancia.assignCategory(cat1, null);
    } catch (error) {
        console.error("Error assignCategory: ", error.message);
    }

    // deassignCategory
    nuevaInstancia.deassignCategory(cat1, production1);

    // Errores deassignCategory
    try {
        nuevaInstancia.deassignCategory(null, production1);
    } catch (error) {
        console.error("Error deassignCategory: ", error.message);
    }

    try {
        nuevaInstancia.deassignCategory(cat1, null);
    } catch (error) {
        console.error("Error deassignCategory: ", error.message);
    }

    // assignDirector
    nuevaInstancia.assignDirector(director1, production1);
    nuevaInstancia.assignDirector(director2, production1);
    nuevaInstancia.assignDirector(director2, production2);

    // Errores assignDirector
    try {
        nuevaInstancia.assignDirector(null, production1);
    } catch (error) {
        console.error("Error assignDirector: ", error.message);
    }

    try {
        nuevaInstancia.assignDirector(director1, null);
    } catch (error) {
        console.error("Error assignDirector: ", error.message);
    }

    // deassignDirector
    nuevaInstancia.deassignDirector(director1, production1);

    // Errores deassignDirector
    try {
        nuevaInstancia.deassignDirector(null, production1);
    } catch (error) {
        console.error("Error deassignDirector: ", error.message);
    }

    try {
        nuevaInstancia.deassignDirector(director1, null);
    } catch (error) {
        console.error("Error deassignDirector: ", error.message);
    }

    // assignActor
    nuevaInstancia.assignActor(actor1, production1);
    nuevaInstancia.assignActor(actor2, production1);
    nuevaInstancia.assignActor(actor2, production2);

    // Errores assignActor
    try {
        nuevaInstancia.assignActor(null, production1);
    } catch (error) {
        console.error("Error assignActor :", error.message);
    }

    try {
        nuevaInstancia.assignActor(actor1, null);
    } catch (error) {
        console.error("Error assignActor :", error.message);
    }

    // deassignActor
    nuevaInstancia.deassignActor(actor1, production1);

    // Errores deassignActor
    try {
        nuevaInstancia.deassignActor(null, production1);
    } catch (error) {
        console.error("Error deassignActor: ", error.message);
    }

    try {
        nuevaInstancia.deassignActor(actor1, null);
    } catch (error) {
        console.error("Error deassignActor: ", error.message);
    }

    // getCast
    console.log("Actores de production2:");
    for (const actor of nuevaInstancia.getCast(production2)) {
        console.log(actor.toString());
    }

    // Error getCast
    try {
        nuevaInstancia.getCast(null);
    } catch (error) {
        console.error("Error getCast: ", error.message);
    }

    // getProductionsDirector
    console.log("Producciones de director2:");
    for (const production of nuevaInstancia.getProductionsDirector(director2)) {
        console.log(production.toString());
    }

    // Error getProductionsDirector
    try {
        nuevaInstancia.getProductionsDirector(null);
    } catch (error) {
        console.error("Error getProductionsDirector: ", error.message);
    }

    // getProductionsActor
    console.log("Producciones de actor2:");
    for (const production of nuevaInstancia.getProductionsActor(actor2)) {
        console.log(production.title);
    }

    // Error getProductionsActor
    try {
        nuevaInstancia.getProductionsActor(null);
    } catch (error) {
        console.error("Error getProductionsActor: ", error.message);
    }

    // getProductionsCategory
    console.log("Producciones de cat2:");
    for (const production of nuevaInstancia.getProductionsCategory(cat2)) {
        console.log(production.toString());
    }

    // Error getProductionsCategory
    try {
        nuevaInstancia.getProductionsCategory(null);
    } catch (error) {
        console.error("Error getProductionsCategory: ", error.message);
    }

    // findProductions  
    console.log("Producciones nacionalidad2 ordenadas por fecha:");
    for (const production of nuevaInstancia.findProductions(
        (production) => production.nationality === "Nacionalidad2",
        (a, b) => a.publication - b.publication
    )) {
        console.log(production.toString());
    }

    // filterProductionsInCategory
    console.log("Producciones en categoría2 ordenadas por fecha:");
    for (const production of nuevaInstancia.filterProductionsInCategory(
        cat2,
        production => production.publication.getFullYear() > 2000,
        (a, b) => a.publication - b.publication
    )) {
        console.log(production.toString());
    }

    // Errores filterProductionsInCategory
    try {
        for (const production of nuevaInstancia.filterProductionsInCategory(
            null,
            production => production.publication.getFullYear() > 2000,
            (a, b) => a.publication - b.publication
        )) {
            console.log(production.toString());
        }
    } catch (error) {
        console.error("Error null filterProductionsInCategory: ", error.message);
    }

    try {
        for (const production of nuevaInstancia.filterProductionsInCategory(
            "notcategory",
            production => production.publication.getFullYear() > 2000,
            (a, b) => a.publication - b.publication
        )) {
            console.log(production.toString());
        }
    } catch (error) {
        console.error("Error no registrada filterProductionsInCategory: ", error.message);
    }
}

window.onload = testVideoSystem;