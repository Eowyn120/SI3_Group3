document.addEventListener('DOMContentLoaded', function() {
    // Si aún tienes un botón global para "Mostrar Información de Pacientes"
    // y su contenedor, mantenemos esta lógica.
    const toggleGlobalPatientInfoButton = document.getElementById('toggleContentButton');
    const globalPatientInfoContainer = document.getElementById('patientInfoContainer');

    if (toggleGlobalPatientInfoButton && globalPatientInfoContainer) {
        toggleGlobalPatientInfoButton.addEventListener('click', function() {
            if (globalPatientInfoContainer.classList.contains('content-hidden')) {
                globalPatientInfoContainer.classList.remove('content-hidden');
                globalPatientInfoContainer.classList.add('content-visible');
                toggleGlobalPatientInfoButton.textContent = 'Ocultar Información de Pacientes';
            } else {
                globalPatientInfoContainer.classList.remove('content-visible');
                globalPatientInfoContainer.classList.add('content-hidden');
                toggleGlobalPatientInfoButton.textContent = 'Mostrar Información de Pacientes';
            }
        });
    }

    // Botón "Agregar Consulta" (se mantiene)
    const addQueryButton = document.getElementById('addQueryButton');
    if (addQueryButton) {
        addQueryButton.addEventListener('click', function() {
            window.location.href = '/users/agregar-consulta';
        });
    }

    // --- Lógica para desplegar/ocultar los detalles de CADA paciente ---
    const toggleDetailButtons = document.querySelectorAll('.toggle-patient-details');

    toggleDetailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const patientId = this.dataset.patientId; // Obtiene el ID del paciente del atributo data
            const patientDetailsContainer = document.getElementById(`patientDetails_${patientId}`);

            if (patientDetailsContainer) {
                // Ocultar todos los otros paneles de detalles de pacientes antes de mostrar el actual
                document.querySelectorAll('.patient-details-visible').forEach(otherDetails => {
                    if (otherDetails.id !== `patientDetails_${patientId}`) {
                        otherDetails.classList.remove('patient-details-visible');
                        otherDetails.classList.add('patient-details-hidden');
                    }
                });
                document.querySelectorAll('.toggle-patient-details').forEach(otherButton => {
                    if (otherButton.dataset.patientId !== patientId) {
                        otherButton.textContent = 'Ver Información';
                    }
                });


                if (patientDetailsContainer.classList.contains('patient-details-hidden')) {
                    patientDetailsContainer.classList.remove('patient-details-hidden');
                    patientDetailsContainer.classList.add('patient-details-visible');
                    this.textContent = 'Ocultar Información'; // Cambia el texto del botón
                } else {
                    patientDetailsContainer.classList.remove('patient-details-visible');
                    patientDetailsContainer.classList.add('patient-details-hidden');
                    this.textContent = 'Ver Información'; // Cambia el texto del botón
                }
            }
        });
    });

    // --- Lógica para desplegar/ocultar los detalles de CADA nutricionista ---
    const toggleNutricionistButtons = document.querySelectorAll('.toggle-nutricionist-details');

    toggleNutricionistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nutricionistId = this.dataset.nutricionistId; // Obtiene el ID del nutricionista del atributo data
            const nutricionistDetailsContainer = document.getElementById(`nutricionistDetails_${nutricionistId}`);

            if (nutricionistDetailsContainer) {
                // Ocultar todos los otros paneles de detalles de nutricionistas antes de mostrar el actual
                document.querySelectorAll('.nutricionist-details-visible').forEach(otherDetails => {
                    if (otherDetails.id !== `nutricionistDetails_${nutricionistId}`) {
                        otherDetails.classList.remove('nutricionist-details-visible');
                        otherDetails.classList.add('nutricionist-details-hidden');
                    }
                });
                document.querySelectorAll('.toggle-nutricionist-details').forEach(otherButton => {
                    if (otherButton.dataset.nutricionistId !== nutricionistId) {
                        otherButton.textContent = 'Ver Información';
                    }
                });

                // Toggle visibility for the clicked nutricionist
                if (nutricionistDetailsContainer.classList.contains('nutricionist-details-hidden')) {
                    nutricionistDetailsContainer.classList.remove('nutricionist-details-hidden');
                    nutricionistDetailsContainer.classList.add('nutricionist-details-visible');
                    this.textContent = 'Ocultar Información';
                } else {
                    nutricionistDetailsContainer.classList.remove('nutricionist-details-visible');
                    nutricionistDetailsContainer.classList.add('nutricionist-details-hidden');
                    this.textContent = 'Ver Información';
                }
            }
        });
    });
});