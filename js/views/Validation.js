function showFeedBack(input, valid, message) {
    const validClass = (valid) ? 'is-valid' : 'is-invalid';
    // Seleccionar div de feedback correspondiente
    const messageDiv = (valid) ? input.parentElement.querySelector('div.valid-feedback') : input.parentElement.querySelector('div.invalid-feedback');
    // Ocultar mensajes previos del mismo contenedor padre
    for (const div of input.parentElement.getElementsByTagName('div')) {
        div.classList.remove('d-block');
    }
    // Mostrar el mensaje correspondiente
    messageDiv.classList.remove('d-none');
    messageDiv.classList.add('d-block');
    // Limpiar clases (estados) y aplicar nueva
    input.classList.remove('is-valid');
    input.classList.remove('is-invalid');
    input.classList.add(validClass);
    // Mostrar mensaje si existe
    if (message) {
        messageDiv.innerHTML = message;
    }
}

/**
 * Validar elemento de formulario
 */
function defaultCheckElement(event) {
    // Permitir seleccionar mas de 1 valor
    if (this.tagName !== 'SELECT') {
        this.value = this.value.trim();
    }
    // Comprobar estado
    if (!this.checkValidity()) {
        showFeedBack(this, false);
    } else {
        showFeedBack(this, true);
    }
}

/**
 * Validar producción 
 */
function newProductionValidation(handler) {
    // Seleccionar formulario fNewProduction
    const form = document.forms.fNewProduction;
    // Anular validación HTML
    form.setAttribute('novalidate', '');

    // Evento submit
    form.addEventListener('submit', function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        // Título
        if (!this.npTitle.checkValidity()) {
            isValid = false;
            showFeedBack(this.npTitle, false);
            firstInvalidElement = this.npTitle;
        } else showFeedBack(this.npTitle, true);

        // Tipo
        if (!this.npType.value) { // Si no hay radio seleccionado, value es ""
            isValid = false;
            showFeedBack(this.querySelector('#npMovie'), false); // Aplicamos error al primer radio
            if (!firstInvalidElement) firstInvalidElement = this.querySelector('#npMovie');
        } else {
            showFeedBack(this.querySelector('#npMovie'), true);
        }

        // Categorías
        if (!this.npCategories.checkValidity()) {
            isValid = false;
            showFeedBack(this.npCategories, false);
            if (!firstInvalidElement) firstInvalidElement = this.npCategories;
        } else showFeedBack(this.npCategories, true);

        // Actores
        if (!this.npActors.checkValidity()) {
            isValid = false;
            showFeedBack(this.npActors, false);
            if (!firstInvalidElement) firstInvalidElement = this.npActors;
        } else showFeedBack(this.npActors, true);

        // Directores
        if (!this.npDirectors.checkValidity()) {
            isValid = false;
            showFeedBack(this.npDirectors, false);
            if (!firstInvalidElement) firstInvalidElement = this.npDirectors;
        } else showFeedBack(this.npDirectors, true);

        // Nacionalidad
        if (!this.npNationality.checkValidity()) {
            isValid = false;
            showFeedBack(this.npNationality, false);
            if (!firstInvalidElement) firstInvalidElement = this.npNationality;
        } else showFeedBack(this.npNationality, true);

        // Fecha
        if (!this.npPubDate.checkValidity()) {
            isValid = false;
            showFeedBack(this.npPubDate, false);
            if (!firstInvalidElement) firstInvalidElement = this.npPubDate;
        } else showFeedBack(this.npPubDate, true);

        // Imagen
        if (!this.npImage.checkValidity()) {
            isValid = false;
            showFeedBack(this.npImage, false);
            if (!firstInvalidElement) firstInvalidElement = this.npImage;
        } else showFeedBack(this.npImage, true);

        // Eliminar espacios
        this.npSynopsis.value = this.npSynopsis.value.trim();
        // Marcar sinopsys como válida (opcional)
        showFeedBack(this.npSynopsis, true);

        // Comprobar validación
        if (!isValid) {
            // Focus sobre el primer error
            firstInvalidElement.focus();
        } else {
            // Extraer valores select
            const categories = [...this.npCategories.selectedOptions].map(o => o.value);
            const actors = [...this.npActors.selectedOptions].map(o => o.value);
            const directors = [...this.npDirectors.selectedOptions].map(o => o.value);

            // Ejecutar manejador
            handler(
                this.npTitle.value,
                this.npType.value,
                this.npNationality.value,
                new Date(this.npPubDate.value),
                this.npSynopsis.value,
                this.npImage.value,
                categories,
                actors,
                directors
            );
        }

        // Evitar envío y recarga de formulario
        event.preventDefault();
        event.stopPropagation();
    });

    // Evento reset de validación
    form.addEventListener('reset', function () {
        for (const div of this.querySelectorAll('div.valid-feedback, div.invalid-feedback')) {
            div.classList.remove('d-block');
            div.classList.add('d-none');
        }
        for (const input of this.querySelectorAll('input, select')) {
            input.classList.remove('is-valid');
            input.classList.remove('is-invalid');
        }
        this.npTitle.focus();
    });

    // Eventos de validación
    form.npTitle.addEventListener('change', defaultCheckElement);
    form.npTitle.addEventListener('change', defaultCheckElement);
    form.npNationality.addEventListener('change', defaultCheckElement);
    form.npPubDate.addEventListener('change', defaultCheckElement);
    form.npImage.addEventListener('change', defaultCheckElement);
    form.npCategories.addEventListener('change', defaultCheckElement);
    form.npActors.addEventListener('change', defaultCheckElement);
    form.npDirectors.addEventListener('change', defaultCheckElement);
    form.npSynopsis.addEventListener('change', defaultCheckElement);
}

/**
 * Validar asignación producción
 */
function assignProductionValidation(handler) {
    // Seleccionar formulario fAssignProduction
    const form = document.forms.fAssignProduction;
    // Anular validación HTML
    form.setAttribute('novalidate', '');

    // Evento submit
    form.addEventListener('submit', function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        // Producciones
        if (!this.acProduction.checkValidity()) {
            isValid = false;
            showFeedBack(this.acProduction, false);
            firstInvalidElement = this.acProduction;
        } else {
            showFeedBack(this.acProduction, true);
        }

        // Actores
        if (!this.acActors.checkValidity()) {
            isValid = false;
            showFeedBack(this.acActors, false);
            firstInvalidElement = this.acActors;
        } else {
            showFeedBack(this.acActors, true);
        }

        // Directores
        if (!this.acDirectors.checkValidity()) {
            isValid = false;
            showFeedBack(this.acDirectors, false);
            firstInvalidElement = this.acDirectors;
        } else {
            showFeedBack(this.acDirectors, true);
        }

        // Comprobar validación
        if (!isValid) {
            // Focus sobre el primer error
            firstInvalidElement.focus();
        } else {
            // Extraer valores select
            const actors = [...this.acActors.selectedOptions].map(opt => opt.value);
            const directors = [...this.acDirectors.selectedOptions].map(opt => opt.value);
            // Ejecutar manejador
            handler(
                this.acProduction.value,
                actors,
                directors
            );
        }

        // Evitar envío y recarga de formulario
        event.preventDefault();
        event.stopPropagation();
    });

    // Evento reset de validación
    form.addEventListener('reset', (function (event) {
        for (const div of this.querySelectorAll('div.valid-feedback, div.invalid-feedback')) {
            div.classList.remove('d-block');
            div.classList.add('d-none');
        }
        for (const input of this.querySelectorAll('select')) {
            input.classList.remove('is-valid');
            input.classList.remove('is-invalid');
        }
        this.acProduction.focus();
    }));

    // Eventos de validación
    form.acProduction.addEventListener('change', defaultCheckElement);
    form.acActors.addEventListener('change', defaultCheckElement);
    form.acDirectors.addEventListener('change', defaultCheckElement);
}

/**
 * Validación para el formulario de desasignar categorías
 */
function deassignProductionValidation(handler) {
    // Seleccionar formulario fDeassignProduction
    const form = document.forms.fDeassignProduction;
    // Anular validación HTML
    form.setAttribute('novalidate', '');

    // Evento submit
    form.addEventListener('submit', function (event) {
        let isValid = true;
        let firstInvalidElement = null;

        // Producciones
        if (!this.dcProduction.checkValidity()) {
            isValid = false;
            showFeedBack(this.dcProduction, false);
            firstInvalidElement = this.dcProduction;
        } else {
            showFeedBack(this.dcProduction, true);
        }

        // Actores
        if (!this.dcActors.checkValidity()) {
            isValid = false;
            showFeedBack(this.dcActors, false);
            firstInvalidElement = this.dcActors;
        } else {
            showFeedBack(this.dcActors, true);
        }

        // Directores
        if (!this.dcDirectors.checkValidity()) {
            isValid = false;
            showFeedBack(this.dcDirectors, false);
            firstInvalidElement = this.dcDirectors;
        } else {
            showFeedBack(this.dcDirectors, true);
        }

        // Comprobar validación
        if (!isValid) {
            // Focus sobre el primer error
            firstInvalidElement.focus();
        } else {
            // Extraer valores select
            const actors = [...this.dcActors.selectedOptions].map(opt => opt.value);
            const directors = [...this.dcDirectors.selectedOptions].map(opt => opt.value);
            // Ejecutar manejador
            handler(
                this.dcProduction.value,
                actors,
                directors
            );
        }

        // Evitar envío y recarga de formulario
        event.preventDefault();
        event.stopPropagation();
    });

    // Evento reset de validación
    form.addEventListener('reset', (function (event) {
        for (const div of this.querySelectorAll('div.valid-feedback, div.invalid-feedback')) {
            div.classList.remove('d-block');
            div.classList.add('d-none');
        }
        for (const input of this.querySelectorAll('select')) {
            input.classList.remove('is-valid');
            input.classList.remove('is-invalid');
        }
        this.dcProduction.focus();
    }));

    // Eventos de validación
    form.dcProduction.addEventListener('change', defaultCheckElement);
    form.dcActors.addEventListener('change', defaultCheckElement);
    form.dcDirectors.addEventListener('change', defaultCheckElement);
}

export { newProductionValidation, assignProductionValidation, deassignProductionValidation };