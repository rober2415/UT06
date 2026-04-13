"use strict";

import {
  EmptyValueException,
  NotNullValueException,
  InvalidTypeException,
  RegisteredException,
  NotRegisteredException,
  RegisteredEmailException
} from "../Exception.js";

import { Category } from "./Category.js";
import { User } from "./User.js";
import { Production } from "./Production.js";
import { Person } from "./Person.js";
import { Movie } from "./Movie.js";
import { Serie } from "./Serie.js";

class VideoSystem {
  // Propiedad para almacenar la instancia
  static #instance;

  // Propiedad privada
  #name;

  // Colecciones
  #categories = new Map();
  #actors = new Map();
  #directors = new Map();

  // Conjuntos
  #users = new Set();
  #productions = new Set();

  // Categoría por defecto
  #defaultCategory = new Category("Por defecto", "Categoría por defecto");

  /**
   * Constructor privado
   */
  constructor(name = "VideoSystem") {
    if (VideoSystem.#instance) {
      return VideoSystem.#instance;
    }
    this.#name = name;

    // Colección por defecto
    this.#categories.set(this.#defaultCategory.name, {
      category: this.#defaultCategory, productions: new Map()
    });

    VideoSystem.#instance = this;
  }

  /**
   * Método para la instancia Singleton y proteger el constructor
   */
  static getInstance(name) {
    if (!VideoSystem.#instance) {
      // Solo la primera vez se usa el nombre 
      VideoSystem.#instance = new VideoSystem(name);
    }
    return VideoSystem.#instance;
  }

  /**
   * Devuelve el nombre del sistema
   */
  get name() {
    return this.#name;
  }
  set name(name) {
    if (!name) {
      throw new EmptyValueException();
    }
    this.#name = name;
  }

  /**
   * Devuelve un iterador que permite recorrer las categorías del sistema
   */
  *getCategories() {
    for (const cat of this.#categories.values()) {
      yield cat;
    }
  }

  /**
   * Añade una nueva categoría
   */
  addCategory(...categories) {
    for (const cat of categories) {
      // Tipo inválido
      if (!(cat instanceof Category)) {
        throw new InvalidTypeException("Category");
      }
      // Ya registrado
      if (this.#categories.has(cat.name)) {
        throw new RegisteredException("categoria");
      }
      // Añadir categoría
      this.#categories.set(cat.name, {
        category: cat,
        productions: new Map()
      });
    }
    //Number con el nº de elementos
    return this.#categories.size;
  }

  /**
  * Elimina una categoría.
  * Al eliminar la categoría, sus productos pasan a la de por defecto.
  */
  removeCategory(...categories) {
    for (const cat of categories) {
      // No registrado
      if (!this.#categories.has(cat.name)) {
        throw new NotRegisteredException("categoria");
      }
      // Mover producciones a la categoría por defecto antes de eliminar
      const productions = this.#categories.get(cat.name);
      const defaultSet = this.#categories.get(this.#defaultCategory.name);
      for (const prod of productions.productions.values()) {
        defaultSet.productions.set(prod.title, prod);
      }
      // Eliminar categoría
      this.#categories.delete(cat.name)
    }
    // Number con el nº de elementos
    return this.#categories.size;
  }

  /**
   * Devuelve un iterador que permite recorrer los usuarios del sistema 
   */
  *getUsers() {
    for (const us of this.#users.values()) {
      yield us;
    }
  }

  /**
   * Añade un nuevo usuario
   */
  addUser(...users) {
    for (const user of users) {
      // Tipo inválido
      if (!(user instanceof User)) {
        throw new InvalidTypeException("User");
      }
      // Ya registrado
      for (const u of this.#users.values()) {
        if (u.username === user.username) {
          throw new RegisteredException("usuario");
        }
        if (u.email === user.email) {
          throw new RegisteredEmailException("email");
        }
      }
      // Añadir usuario
      this.#users.add(user);
    }
    // Number con el nº de elementos
    return this.#users.size;
  }

  /**
   * Elimina un usuario del sistema
   */
  removeUser(...users) {
    for (const user of users) {
      // Tipo inválido
      if (!(user instanceof User)) {
        throw new InvalidTypeException("User");
      }
      // No registrado
      if (!this.#users.has(user)) {
        throw new NotRegisteredException("usuario");
      }
      // Eliminar categoría
      this.#users.delete(user);
    }
    // Number con el nº de elementos
    return this.#users.size;
  }

  /**
   * Devuelve un iterador que permite recorrer las producciones del sistema
   */
  *getProductions() {
    for (const prod of this.#productions.values()) {
      yield prod;
    }
  }

  /**
   * Añade una nueva producción
   */
  addProduction(...productions) {
    for (const production of productions) {
      // Tipo inválido
      if (!(production instanceof Production)) {
        throw new InvalidTypeException("Production");
      }
      // Ya registrado     
      for (const product of this.#productions.values()) {
        if (product.title === production.title &&
          product.nationality === production.nationality &&
          product.publication === production.publication) {
          throw new RegisteredException("producción");
        }
      }
      // Añadir producción
      this.#productions.add(production);
    }
    // Number con el nº de elementos
    return this.#productions.size;
  }

  /**
   * Elimina una producción del sistema
   */
  removeProduction(...productions) {
    for (const production of productions) {
      // Tipo inválido
      if (!(production instanceof Production)) {
        throw new InvalidTypeException("Production");
      }
      // No registrado
      if (!this.#productions.has(production)) {
        throw new NotRegisteredException("producción");
      }
      // Eliminar producción
      this.#productions.delete(production);
    }
    // Number con el nº de elementos
    return this.#productions.size;
  }

  /**
   * Devuelve un iterador que permite 
   * recorrer los actores registrados en el sistema
   */
  *getActors() {
    for (const act of this.#actors.values()) {
      yield act;
    }
  }

  /**
   * Añade un nuevo actor
   */
  addActor(...actors) {
    for (const actor of actors) {
      // Tipo inválido
      if (!(actor instanceof Person)) {
        throw new InvalidTypeException("Person");
      }
      // Ya registrado
      if (this.#actors.has(actor.name)) {
        throw new RegisteredException("actor");
      }
      // Añadir categoría
      this.#actors.set(actor.name, {
        actor,
        productions: new Map()
      });
    }
    //Number con el nº de elementos
    return this.#actors.size;
  }

  /**
   * Elimina un actor del sistema
   */
  removeActor(...actors) {
    for (const actor of actors) {
      // Tipo inválido
      if (!(actor instanceof Person)) {
        throw new InvalidTypeException("Person");
      }
      // No registrado
      if (!this.#actors.has(actor.name)) {
        throw new NotRegisteredException("actor");
      }
      // Eliminar actor
      this.#actors.delete(actor.name)
    }
    // Number con el nº de elementos
    return this.#actors.size;
  }

  /**
   * Devuelve un iterador que permite recorrer 
   * los directores registrados en el sistema
   */
  *getDirectors() {
    for (const dir of this.#directors.values()) {
      yield dir;
    }
  }

  /**
   * Añade un nuevo director
   */
  addDirector(...directors) {
    for (const director of directors) {
      // Tipo inválido
      if (!(director instanceof Person)) {
        throw new InvalidTypeException("Person");
      }
      // Ya registrado
      if (this.#directors.has(director.name)) {
        throw new RegisteredException("director");
      }
      // Añadir director
      this.#directors.set(director.name, {
        director,
        productions: new Map()
      });
    }
    //Number con el nº de elementos
    return this.#directors.size;
  }

  /**
   * Elimina un director del sistema
   */
  removeDirector(...directors) {
    for (const director of directors) {
      // Tipo inválido
      if (!(director instanceof Person)) {
        throw new InvalidTypeException("Person");
      }
      // No registrado
      if (!this.#directors.has(director.name)) {
        throw new NotRegisteredException("director");
      }
      // Eliminar director
      this.#directors.delete(director.name)
    }
    // Number con el nº de elementos
    return this.#directors.size;
  }

  /**
   * Asigna uno más producciones a una categoría
   * Si el objeto Category o Production no existen se añaden al sistema
   */
  assignCategory(category, ...productions) {
    // Category null
    if (category === null) {
      throw new NotNullValueException("category");
    }
    // Si la categoría no existe, se añade al sistema 
    if (!this.#categories.has(category.name)) {
      this.addCategory(category);
    }
    const storedCategory = this.#categories.get(category.name);
    for (const production of productions) {
      // Production null
      if (production === null) {
        throw new NotNullValueException("production");
      }
      // Si la producción no existe, se añade al sistema 
      if (!this.#productions.has(production)) {
        this.addProduction(production);
      }
      // Asignar la producción a la categoría 
      storedCategory.productions.set(production.title, production);
    }
    // Number con el nº total de producciones asignadas a la categoría
    return storedCategory.productions.size;
  }

  /**
   * Desasigna una o más producciones de una categoría
   */
  deassignCategory(category, ...productions) {
    // Category null
    if (category === null) {
      throw new NotNullValueException("category");
    }
    const storedCategory = this.#categories.get(category.name);
    for (const production of productions) {
      // Production null
      if (production === null) {
        throw new NotNullValueException("production");
      }
      // Eliminar la producción de la categoría 
      storedCategory.productions.delete(production.title);
    }
    // Number con el nº total de producciones asignadas a la categoría
    return storedCategory.productions.size;
  }


  /**
   * Asigna uno más producciones a un director
   * Si el director o el objeto Production no existen se añaden al sistema
   */
  assignDirector(director, ...productions) {
    // Director null
    if (director === null) {
      throw new NotNullValueException("director");
    }
    // Si el director no existe, se añade al sistema 
    if (!this.#directors.has(director.name)) {
      this.addDirector(director);
    }
    for (const production of productions) {
      // Production null
      if (production === null) {
        throw new NotNullValueException("production");
      }
      // Si la producción no existe, se añade al sistema 
      if (!this.#productions.has(production)) {
        this.addProduction(production);
      }
      // Asignar la producción al director 
      this.#directors.get(director.name).productions.set(production.title, production);
    }
    // Number con el nº total de producciones asignadas al director
    return this.#directors.get(director.name).productions.size;
  }

  /**
   * Desasigna una o más producciones de un director
   */
  deassignDirector(director, ...productions) {
    // Director null
    if (director === null) {
      throw new NotNullValueException("director");
    }
    for (const production of productions) {
      // Production null
      if (production === null) {
        throw new NotNullValueException("production");
      }
      // Eliminar la producción del director 
      this.#directors.get(director.name).productions.delete(production.title);
    }
    // Number con el nº total de producciones asignadas al director
    return this.#directors.get(director.name).productions.size;
  }

  /**
   * Asigna uno más producciones a un actor
   * Si el actor o el objeto Production no existen se añaden al sistema
   */
  assignActor(actor, ...productions) {
    // Actor null
    if (actor === null) {
      throw new NotNullValueException("actor");
    }
    // Si el actor no existe, se añade al sistema 
    if (!this.#actors.has(actor.name)) {
      this.addActor(actor);
    }
    const storedActor = this.#actors.get(actor.name);
    for (const production of productions) {
      // Production null
      if (production === null) {
        throw new NotNullValueException("production");
      }
      // Si la producción no existe, se añade al sistema 
      if (!this.#productions.has(production)) {
        this.addProduction(production);
      }
      // Asignar la producción al actor
      storedActor.productions.set(production.title, production);
    }
    // Number con el nº total de producciones asignadas al actor
    return storedActor.productions.size;
  }

  /**
   * Desasigna una o más producciones de un actor
   */
  deassignActor(actor, ...productions) {
    // Actor null
    if (actor === null) {
      throw new NotNullValueException("actor");
    }
    const storedActor = this.#actors.get(actor.name);
    for (const production of productions) {
      // Production null
      if (production === null) {
        throw new NotNullValueException("production");
      }
      // Eliminar la producción del actor 
      storedActor.productions.delete(production.title);
    }
    // Number con el nº total de producciones asignadas al actor
    return storedActor.productions.size;
  }

  /**
   * Obtiene un iterador con la relación de los actores del
   * reparto una producción y sus personajes
   */
  *getCast(production) {
    // Production null
    if (production === null) {
      throw new NotNullValueException("production");
    }
    // Actores de la colección
    const storedActors = this.#actors.values();
    for (const actor of storedActors) {
      // Si el actor está en la producción, se devuelve
      if (actor.productions.has(production.title)) {
        yield actor.actor;
      }
    }
  }

  /**
   * Obtiene un iterador con las producciones de un director
   */
  *getProductionsDirector(director) {
    // Production null
    if (director === null) {
      throw new NotNullValueException("director");
    }
    // Directores de la colección
    const storedDirectors = this.#directors.get(director.name);

    // Si la producción tiene director asignado, se devuelve
    for (const production of storedDirectors.productions.values()) {
      yield production;
    }
  }

  /**
   * Obtiene un iterador con las producciones de un actor
   * y su papel en la producción
   */
  *getProductionsActor(actor) {
    // Actor null
    if (actor === null) {
      throw new NotNullValueException("actor");
    }
    // Actores de la colección
    const storedActors = this.#actors.get(actor.name);

    // Si la producción tiene actor asignado, se devuelve
    for (const production of storedActors.productions.values()) {
      yield production;
    }
  }

  /**
   * Obtiene un iterador con las producciones de una categoría determinada
   */
  *getProductionsCategory(category) {
    // Category null
    if (category === null) {
      throw new NotNullValueException("category");
    }
    // Categorías de la colección
    const storedCategories = this.#categories.get(category.name);
    // Si la producción tiene una categoría asignada, se devuelve
    for (const production of storedCategories.productions.values()) {
      yield production;
    }
  }

  /**
   * Devuelve un objeto Person si está registrado, o crea un nuevo
   * Si es nuevo NO lo añade al manager
   */
  createPerson(name, lastname1, lastname2, born, picture) {
    if (this.#actors.has(name)) {
      return this.#actors.get(name).actor;
    }
    if (this.#directors.has(name)) {
      return this.#directors.get(name).director;
    }
    return new Person(name, lastname1, lastname2, born, picture);
  }

  /**
   * Devuelve un objeto Production si está registrado, o crea un nuevo
   * Si es nuevo NO lo añade al manager
   */
  createProduction(title, type, nationality, publication, synopsis, image, extra1, extra2, extra3) {
    for (const prod of this.#productions) {
      if (prod.title === title) {
        return prod;
      }
    }

    if (type === 'Movie') {
      return new Movie(title, nationality, publication, synopsis, image, extra1, extra2);
    } else if (type === 'Serie') {
      return new Serie(title, nationality, publication, synopsis, image, extra1, extra2, extra3);
    } else {
      return new Production(title, nationality, publication, synopsis, image);
    }
  }

  /**
   * Devuelve un objeto User si está registrado, o crea un nuevo
   * Si es nuevo NO lo añade al manager
   */
  createUser(username, email, password) {
    for (const user of this.#users) {
      if (user.username === username || user.email === email) {
        return user;
      }
    }
    return new User(username, email, password);
  }

  /**
   * Devuelve un objeto Category si está registrado, o crea un nuevo
   * Si es nuevo NO lo añade al manager
   */
  createCategory(name, description) {
    if (this.#categories.has(name)) {
      return this.#categories.get(name).category;
    }
    return new Category(name, description);
  }

  /**
   * Obtiene un iterador que cumpla un criterio concreto en base a una función de callback
   * El iterador puede estar ordenado en base a la segunda función
   */
  findProductions(filterFn, sortFn) {
    // Filtrar en base a la función
    let result = Array.from(this.#productions).filter(filterFn);
    // Ordenar en base a la función si se proporciona
    if (sortFn !== undefined) {
      result.sort(sortFn);
    }
    // Iiterador
    return result[Symbol.iterator]();
  }

  /**
   * Obtiene un iterador con la relación de las producciones en una categoría,
   * que cumplan los criterios de la función
   * El iterador puede estar ordenado en base a una función de ordenación
   */
  filterProductionsInCategory(category, filterFn, sortFn) {
    // Category null
    if (category === null) {
      throw new NotNullValueException("category");
    }
    // Si la categoría no existe 
    if (!this.#categories.has(category.name)) {
      throw new NotRegisteredException("categoria");
    }
    // Obtener las producciones de la categoría
    const storedCategory = this.#categories.get(category.name);
    // Filtrar en base a la función
    let result = Array.from(storedCategory.productions.values()).filter(filterFn);
    // Ordernar en base a la función
    result.sort(sortFn);
    // Iterador
    return result[Symbol.iterator]();
  }

}

// Exportamos la clase
export default VideoSystem;