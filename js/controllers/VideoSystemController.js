"use strict";

class VideoSystemController {
    #MODEL;
    #VIEW;

    constructor(model, view) {
        this.#MODEL = model;
        this.#VIEW = view;

        // Carga inicial
        this.onLoad();

        // Inicio
        this.onInit();

        // Manejadores
        this.#VIEW.bindInit(this.handleInit);
        this.#VIEW.bindActors(this.handleActors);
        this.#VIEW.bindDirectors(this.handleDirectors);

        // Pasar manejador para cerrar ventanas
        this.#VIEW.bindCloseAllWindows(this.handleCloseAllWindows);

        // Acciones de objeto hystoryActions
        const historyActions = {
            init: () => this.handleInit(),
            categories: () => this.handleInit(),
            actors: () => this.handleActors(),
            directors: () => this.handleDirectors(),
            productionsByCategory: (state) => this.handleProductionsByCategory(state.category),
            productionDetail: (state) => this.handleShowProductionDetail(state.production),
            actorDetail: (state) => this.handleShowActorDetail(state.actor),
            directorDetail: (state) => this.handleShowDirectorDetail(state.director),
        };

        // Restaurar estado página
        window.addEventListener('popstate', (event) => {
            if (event.state) {
                historyActions[event.state.action](event.state);
            }
        });

        // Apilar inicio de la aplicación
        if (!history.state) {
            history.replaceState({ action: 'init' }, null);
        }

    }

    #LOAD_VIDEOSYSTEM_OBJECTS() {
        // Crear categorías
        const cat1 = this.#MODEL.createCategory("Categoría1", "Descripción categoría 1");
        const cat2 = this.#MODEL.createCategory("Categoría2", "Descripción categoría 2");
        const cat3 = this.#MODEL.createCategory("Categoría3", "Descripción categoría 3");
        // Añadir categorías
        this.#MODEL.addCategory(cat1, cat2, cat3);

        // // Crear producciones
        const prod1 = this.#MODEL.createProduction("Titulo1", "Movie", "Nacionalidad1", new Date(2001, 10, 10), "Sinopsis1", "Sin imagen");
        const prod2 = this.#MODEL.createProduction("Titulo2", "Serie", "Nacionalidad2", new Date(2002, 10, 10), "Sinopsis2", "Sin imagen");
        const prod3 = this.#MODEL.createProduction("Titulo3", "Movie", "Nacionalidad3", new Date(2003, 10, 10), "Sinopsis3", "Sin imagen");
        const prod4 = this.#MODEL.createProduction("Titulo4", "Serie", "Nacionalidad4", new Date(2004, 10, 10), "Sinopsis4", "Sin imagen");
        const prod5 = this.#MODEL.createProduction("Titulo5", "Movie", "Nacionalidad5", new Date(2005, 10, 10), "Sinopsis5", "Sin imagen");
        const prod6 = this.#MODEL.createProduction("Titulo6", "Serie", "Nacionalidad6", new Date(2006, 10, 10), "Sinopsis6", "Sin imagen");
        const prod7 = this.#MODEL.createProduction("Titulo7", "Movie", "Nacionalidad7", new Date(2007, 10, 10), "Sinopsis7", "Sin imagen");
        const prod8 = this.#MODEL.createProduction("Titulo8", "Serie", "Nacionalidad8", new Date(2008, 10, 10), "Sinopsis8", "Sin imagen");
        // Añadir producción
        this.#MODEL.addProduction(prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8);

        // // Asignar producciones a categoría
        this.#MODEL.assignCategory(cat1, prod1, prod4, prod7, prod2, prod5);
        this.#MODEL.assignCategory(cat2, prod2, prod5, prod8, prod3, prod6);
        this.#MODEL.assignCategory(cat3, prod3, prod6, prod1, prod4, prod7);

        // Crear actores
        const act1 = this.#MODEL.createPerson("Actor1", "PApellido1", "SApellido1", new Date(2001, 10, 10), "Sin imagen");
        const act2 = this.#MODEL.createPerson("Actor2", "PApellido2", "SApellido2", new Date(2002, 10, 10), "Sin imagen");
        const act3 = this.#MODEL.createPerson("Actor3", "PApellido3", "SApellido3", new Date(2003, 10, 10), "Sin imagen");
        const act4 = this.#MODEL.createPerson("Actor4", "PApellido4", "SApellido4", new Date(2004, 10, 10), "Sin imagen");
        const act5 = this.#MODEL.createPerson("Actor5", "PApellido5", "SApellido5", new Date(2005, 10, 10), "Sin imagen");
        const act6 = this.#MODEL.createPerson("Actor6", "PApellido6", "SApellido6", new Date(2006, 10, 10), "Sin imagen");
        const act7 = this.#MODEL.createPerson("Actor7", "PApellido7", "SApellido7", new Date(2007, 10, 10), "Sin imagen");
        const act8 = this.#MODEL.createPerson("Actor8", "PApellido8", "SApellido8", new Date(2008, 10, 10), "Sin imagen");
        // Añadir actores
        this.#MODEL.addActor(act1, act2, act3, act4, act5, act6, act7, act8);

        // // Asignar actores a producción
        this.#MODEL.assignActor(act1, prod1, prod8);
        this.#MODEL.assignActor(act2, prod2, prod7);
        this.#MODEL.assignActor(act3, prod3, prod6);
        this.#MODEL.assignActor(act4, prod4, prod5);
        this.#MODEL.assignActor(act5, prod5, prod4);
        this.#MODEL.assignActor(act6, prod6, prod3);
        this.#MODEL.assignActor(act7, prod7, prod2);
        this.#MODEL.assignActor(act8, prod8, prod1);

        // Crear directores
        const dir1 = this.#MODEL.createPerson("Director1", "PApellido1", "SApellido1", new Date(2001, 10, 10), "Sin imagen");
        const dir2 = this.#MODEL.createPerson("Director2", "PApellido2", "SApellido2", new Date(2002, 10, 10), "Sin imagen");
        const dir3 = this.#MODEL.createPerson("Director3", "PApellido3", "SApellido3", new Date(2003, 10, 10), "Sin imagen");
        const dir4 = this.#MODEL.createPerson("Director4", "PApellido4", "SApellido4", new Date(2004, 10, 10), "Sin imagen");
        const dir5 = this.#MODEL.createPerson("Director5", "PApellido5", "SApellido5", new Date(2005, 10, 10), "Sin imagen");
        const dir6 = this.#MODEL.createPerson("Director6", "PApellido6", "SApellido6", new Date(2006, 10, 10), "Sin imagen");
        const dir7 = this.#MODEL.createPerson("Director7", "PApellido7", "SApellido7", new Date(2007, 10, 10), "Sin imagen");
        const dir8 = this.#MODEL.createPerson("Director8", "PApellido8", "SApellido8", new Date(2008, 10, 10), "Sin imagen");
        // Añadir directores
        this.#MODEL.addDirector(dir1, dir2, dir3, dir4, dir5, dir6, dir7, dir8);

        // // Asignar directores a producción
        this.#MODEL.assignDirector(dir1, prod8);
        this.#MODEL.assignDirector(dir2, prod7);
        this.#MODEL.assignDirector(dir3, prod6);
        this.#MODEL.assignDirector(dir4, prod5);
        this.#MODEL.assignDirector(dir5, prod4);
        this.#MODEL.assignDirector(dir6, prod3);
        this.#MODEL.assignDirector(dir7, prod2);
        this.#MODEL.assignDirector(dir8, prod1);

        // Crear usuarios
        const us1 = this.#MODEL.createUser("usuario1", "email1", "password1");
        const us2 = this.#MODEL.createUser("usuario2", "email2", "password2");
        // Añadir usuarios
        this.#MODEL.addUser(us1, us2);
    }

    // Eventos de aplicación
    onLoad = () => {
        this.#LOAD_VIDEOSYSTEM_OBJECTS();
        this.onAddCategory();
        this.onAddActor();
        this.onAddDirector();
        // Menú admin
        this.#VIEW.showAdminMenu();
        this.#VIEW.bindAdminMenu(
            this.handleNewProductionForm,
            this.handleRemoveProductionForm
        );
    }

    onInit = () => {
        this.handleCategories();
        this.handleRandomProductions();
    }

    onAddCategory = () => {
        this.#VIEW.showCategoriesInMenu(this.#MODEL.getCategories());
    };

    onAddActor = () => {
        this.#VIEW.showActorsInMenu();
    };

    onAddDirector = () => {
        this.#VIEW.showDirectorsInMenu();
    };

    /**
     * Manejador de inicio
     */
    handleInit = () => {
        this.onInit();
    }

    /**
     * Manejador categorías
     */
    handleCategories = () => {
        // Pasar categorías del modelo a la vista
        this.#VIEW.showCategories(this.#MODEL.getCategories());

        // Pasar manejador al método para mostrar producciones por categoría
        this.#VIEW.bindProductionsByCategory(this.handleProductionsByCategory);
    }

    /**
     * Manejador produciones aleatorias
     */
    handleRandomProductions = () => {
        // Array de producciones
        const allProductions = Array.from(this.#MODEL.getProductions());
        // Mezclar
        const random = allProductions.sort(() => 0.5 - Math.random());
        // Elegir 3
        const randomList = random.slice(0, 3);

        // Pasar producciones a la vista
        this.#VIEW.showRandomProductions(randomList);

        // Pasar manejador al método para mostrar detalles de producción
        this.#VIEW.bindProductionDetail(this.handleShowProductionDetail);
    }

    /**
     * Manejador para filtrar producciones por categoría
     */
    handleProductionsByCategory = (categoryName) => {
        // Obtener categorías por nombre
        let category = null;
        for (const cat of this.#MODEL.getCategories()) {
            if (cat.category.name === categoryName) {
                category = cat.category;
            }
        }

        // Obtener producciones de la categoría
        const productions = this.#MODEL.getProductionsCategory(category);

        // Pasar producciones y categoría a la vista
        this.#VIEW.showProductionsByCategory(productions, categoryName);

        // Pasar manejador al método para mostrar detalles de producción
        this.#VIEW.bindProductionDetail(this.handleShowProductionDetail);

        // Pasar manejador al método para motrar producciones por categoría
        this.#VIEW.bindProductionsByCategory(this.handleProductionsByCategory);
    }

    /**
     * Manejador para mostrar produccion
     */
    handleShowProductionDetail = (title) => {
        // Obtener producciones por título
        let production = null;
        for (const prod of this.#MODEL.getProductions()) {
            if (prod.title === title) {
                production = prod;
            }
        }

        // Obtener actores que contengan la producción
        const actProduction = [];
        for (const act of this.#MODEL.getCast(production)) {
            actProduction.push(act.name);
        }

        // Obtener directores que contengan la producción
        const dirProduction = [];
        for (const dir of this.#MODEL.getDirectors()) {
            if (dir.productions.has(title)) {
                dirProduction.push(dir.director.name);
            }
        }

        // Pasar producción, actor y director a la vista
        this.#VIEW.showProductionDetail(production, actProduction, dirProduction);

        // Pasar manejador al método para mostrar detalles del actor
        this.#VIEW.bindActorDetail(this.handleShowActorDetail);

        // Pasar manejador al método para mostrar detalles del director
        this.#VIEW.bindDirectorDetail(this.handleShowDirectorDetail);

        // Pasar manejador al método para mostrar producción en nueva ventana
        this.#VIEW.bindShowProductionInNewWindow(this.handleOpenProductionWindow);

        // Pasar manejador al método para mostrar detalles de producción
        this.#VIEW.bindProductionDetail(this.handleShowProductionDetail);
    }

    /**
     * Manejador actores
     */
    handleActors = () => {
        // Pasar actores del modelo a la vista
        this.#VIEW.showActors(this.#MODEL.getActors());

        // Pasar manejador al método para mostrar detalles del actor
        this.#VIEW.bindActorDetail(this.handleShowActorDetail);
    }

    /**
     * Manejador para mostrar actor
     */
    handleShowActorDetail = (name) => {
        // Obtener actores por nombre
        let actor = null;
        for (const act of this.#MODEL.getActors()) {
            if (act.actor.name === name) {
                actor = act.actor;
            }
        }

        // Obtener actores que contengan la producción
        const actProduction = [];
        for (const prod of this.#MODEL.getProductionsActor(actor)) {
            actProduction.push(prod);
        }

        // Pasar actor y producción del modelo a la vista
        this.#VIEW.showActorDetail(actor, actProduction);

        // Pasar manejador al método para mostrar detalles de producción
        this.#VIEW.bindProductionDetail(this.handleShowProductionDetail);

        // Pasar manejador al método para mostrar actor en nueva ventana
        this.#VIEW.bindShowActorInNewWindow(this.handleOpenActorWindow);

        // Pasar manejador al método para mostrar detalles del actor
        this.#VIEW.bindActorDetail(this.handleShowActorDetail);
    }

    /**
     * Manejador directores
     */
    handleDirectors = () => {
        // Pasar directores del modelo a la vista
        this.#VIEW.showDirectors(this.#MODEL.getDirectors());

        // Pasar manejador al método para mostrar detalles del director
        this.#VIEW.bindDirectorDetail(this.handleShowDirectorDetail);
    }

    /**
    * Manejador para mostrar director
    */
    handleShowDirectorDetail = (name) => {
        // Obtener directores por nombre
        let director = null;
        for (const dir of this.#MODEL.getDirectors()) {
            if (dir.director.name === name) {
                director = dir.director;
            }
        }

        // Obtener directores que contengan la producción
        const dirProduction = [];
        for (const dir of this.#MODEL.getProductionsDirector(director)) {
            dirProduction.push(dir);
        }

        // Pasar el director y producción del modelo a la vista
        this.#VIEW.showDirectorDetail(director, dirProduction);

        // Pasar manejador al método para mostrar detalles de producción
        this.#VIEW.bindProductionDetail(this.handleShowProductionDetail);

        // Pasar manejador al método para mostrar director en nueva ventana
        this.#VIEW.bindShowDirectorInNewWindow(this.handleOpenDirectorWindow);

        // Pasar manejador al método para mostrar detalles del director
        this.#VIEW.bindDirectorDetail(this.handleShowDirectorDetail);
    }

    /**
     * Manejador para abrir la ventana externa
     */
    handleOpenProductionWindow = (title) => {
        // Obtener producciones por título
        let production = null;
        for (const prod of this.#MODEL.getProductions()) {
            if (prod.title === title) {
                production = prod;
            }
        }
        // Pasar la producción a la vista
        this.#VIEW.showProductionInNewWindow(production);
    }

    /**
     * Manejador para abrir la ventana externa
     */
    handleOpenActorWindow = (name) => {
        // Obtener actores por nombre
        let actor = null;
        for (const act of this.#MODEL.getActors()) {
            if (act.actor.name === name) {
                actor = act.actor;
            }
        }
        // Pasar el actor a la vista
        this.#VIEW.showActorInNewWindow(actor);
    }

    /**
     * Manejador para abrir la ventana externa
     */
    handleOpenDirectorWindow = (name) => {
        // Obtener actores por nombre
        let director = null;
        for (const dir of this.#MODEL.getDirectors()) {
            if (dir.director.name === name) {
                director = dir.director;
            }
        }
        // Pasar el director a la vista
        this.#VIEW.showDirectorInNewWindow(director);
    }

    /**
     * Manejador para cerrar todas las ventanas abiertas
     */
    handleCloseAllWindows = () => {
        this.#VIEW.closeAllWindows();
    }

    /**
     * Manejador mostrar el formulario de crear produccion
     */
    handleNewProductionForm = () => {
        // Obtener categorías
        const categories = this.#MODEL.getCategories();
        // Obtener actores
        const actors = this.#MODEL.getActors();
        // Obtener directores
        const directors = this.#MODEL.getDirectors();
        // Pasar categorías y actores a la vista
        this.#VIEW.showNewProductionForm(categories, actors, directors);
        // Pasar manejador al método para mostrar formulario
        this.#VIEW.bindNewProductionForm(this.handleCreateProduction);
    };

    /**
     * Manejador crear produccion
     */
    handleCreateProduction = (title, type, nationality, publication, synopsis, image, categories, actors, directors) => {
        let done;
        let error;
        let production;

        try {
            // Crear producción
            production = this.#MODEL.createProduction(title, type, nationality, publication, synopsis, image);
            // Añadir producción
            this.#MODEL.addProduction(production);

            // Obtener categorías
            for (const catName of categories) {
                // Obtener categorías
                const categoryObj = this.#MODEL.createCategory(catName);
                // Asignar producción a categoría
                this.#MODEL.assignCategory(categoryObj, production);
            }

            // Obtener actores
            for (const actName of actors) {
                // Obtener actores
                const actorObj = this.#MODEL.createPerson(actName);
                // Asignar producción a actor
                this.#MODEL.assignActor(actorObj, production);
            }

            // Obtener directores
            for (const dirName of directors) {
                // Obtener directores
                const directorObj = this.#MODEL.createPerson(dirName);
                // Asignar producción a director
                this.#MODEL.assignDirector(directorObj, production);
            }
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        // Pasar el resultado al modal de la vista
        this.#VIEW.showNewProductionModal(done, production, error);
    };

    /**
     * Manejador mostrar el formulario de eliminar produccion
     */
    handleRemoveProductionForm = () => {
        // Pasar el iterador del modelo a la vista
        this.#VIEW.showRemoveProductionForm(this.#MODEL.getCategories());

        // Enlazamos el cambio del filtro
        this.#VIEW.bindRemoveProductionCategory((categoryName) => {

            // Obtener categorías
            const category = this.#MODEL.createCategory(categoryName);
            // Obtener producciones por categoría
            const productions = this.#MODEL.getProductionsCategory(category);

            // Pasar producciones a la vista
            this.#VIEW.showRemoveProductionForm2(productions);

            // Pasar manejador al método para eliminar producción
            this.#VIEW.bindRemoveProduction(this.handleRemoveProduction);
        });
    };

    /**
     * Manejador eliminar produccion
     */
    handleRemoveProduction = (title) => {
        let done;
        let error;
        let production;

        try {
            // Obtener la producción
            production = this.#MODEL.createProduction(title);

            // Obtener categorías
            const categories = this.#MODEL.getCategories();

            // Desasignar la producción
            for (const cat of categories) {
                this.#MODEL.deassignCategory(cat.category, production);
            }

            // Eliminar la producción
            this.#MODEL.removeProduction(production);

            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        // Pasar el resultado al modal de la vista
        this.#VIEW.showRemoveProductionModal(done, production, error);
    }

}

export default VideoSystemController;