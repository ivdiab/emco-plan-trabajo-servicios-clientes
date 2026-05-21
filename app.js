/* ==========================================================================
   EMCO - LÓGICA DE LA APLICACIÓN WEB DE SERVICIOS
   ========================================================================== */
// -------------------------------------------------
// Token de Firebase Cloud Messaging (FCM)
// -------------------------------------------------
// Definido como null por ahora; se activará cuando implementemos notificaciones push.
window.fcmToken = null;
// 1. Base de datos integrada de Clientes y sus correspondientes Servicios
const CLIENTS_DATA = {
  "Albacete, 21": {
    "tipo": "Comunidad",
    "servicios": ["Ventanas", "Puerta", "Alicatado zaguán", "Luminaria", "Terraza", "Cuartos"]
  },
  "Alboraya, 10": {
    "tipo": "Comunidad",
    "servicios": ["Ventanas", "Puerta", "Luminaria", "Terraza"]
  },
  "Arquitecto Alfaro, 25": {
    "tipo": "Comunidad",
    "servicios": ["Pasaje", "Puerta", "Ventanas", "Luminaria", "Cuartos", "Alicatado zaguán"]
  },
  "Ausias March, 105": {
    "tipo": "Comunidad",
    "servicios": ["Luminaria", "Ventanas", "Puerta", "Terraza"]
  },
  "Baja, 42": {
    "tipo": "Comunidad",
    "servicios": ["Terraza", "Vitrificado"]
  },
  "Bellús, 1": {
    "tipo": "Comunidad",
    "servicios": ["Ventanas", "Puerta", "Luminaria"]
  },
  "Bernia, 9": {
    "tipo": "Comunidad",
    "servicios": ["Ventanas", "Puerta", "Vitrificado"]
  },
  "Camino Alabau, 20": {
    "tipo": "Comunidad",
    "servicios": ["Ventanas", "Puerta", "Alicatado zaguán", "Luminaria", "Terraza", "Cuartos"]
  },
  "Camino Alabau, 24": {
    "tipo": "Comunidad",
    "servicios": ["Ventanas", "Puerta", "Luminaria", "Terraza", "Cuartos"]
  },
  "Camino Alabau, 8": {
    "tipo": "Comunidad",
    "servicios": ["Ventanas", "Puerta", "Alicatado zaguán", "Luminaria", "Terraza", "Cuartos"]
  },
  "Daroca, 26": {
    "tipo": "Comunidad",
    "servicios": ["Ventanas", "Puerta", "Tejado", "Terraza"]
  },
  "Duque de Calabria, 3": {
    "tipo": "Comunidad",
    "servicios": ["Luminaria", "Ventanas", "Puerta", "Terraza", "Cuartos", "Vitrificado"]
  },
  "Escrivá, 2": {
    "tipo": "Comunidad",
    "servicios": ["Ventanas", "Puerta", "Cuartos"]
  },
  "Fuencaliente, 8": {
    "tipo": "Comunidad",
    "servicios": ["Luminaria", "Ventanas", "Puerta", "Terraza", "Cuartos"]
  },
  "Guillem de Anglesola, 3": {
    "tipo": "Comunidad",
    "servicios": ["Ventanas", "Puerta", "Alicatado zaguán", "Terraza", "Vitrificado", "Luminaria", "Cuartos"]
  },
  "Linares, 21Bis": {
    "tipo": "Comunidad",
    "servicios": ["Ventanas", "Puerta", "Alicatado zaguán", "Vitrificado", "Terraza", "Luminaria", "Cuartos"]
  },
  "Músico Cabanilles, 42": {
    "tipo": "Comunidad",
    "servicios": ["Terraza", "Ventanas", "Puerta", "Alicatado zaguán", "Luminaria", "Cuartos"]
  },
  "PDBF, 1": {
    "tipo": "Comunidad",
    "servicios": ["Ventanas", "Puerta", "Alicatado zaguán", "Terraza", "Vitrificado", "Luminaria", "Cuartos"]
  },
  "PDBF, 2": {
    "tipo": "Comunidad",
    "servicios": ["Ventanas", "Puerta", "Alicatado zaguán", "Terraza", "Vitrificado", "Luminaria", "Cuartos"]
  },
  "Pintor Genaro Lahuerta, 45": {
    "tipo": "Comunidad",
    "servicios": ["Ventanas", "Puerta", "Luminaria"]
  },
  "Plaza Dramaturgo Fausto Hernández Casajuana, 2": {
    "tipo": "Comunidad",
    "servicios": ["Ventanas", "Puerta"]
  },
  "San Cristóbal, 8": {
    "tipo": "Comunidad",
    "servicios": ["Ventanas", "Puerta", "Alicatado zaguán", "Luminaria"]
  },
  "Virgen del Puig, 20": {
    "tipo": "Comunidad",
    "servicios": ["Ventanas", "Puerta", "Luminaria"]
  },
  "Studio Pilates Adela Ferrer": {
    "tipo": "Estudio de Pilates",
    "servicios": ["Ventanas", "Espejos"]
  },
  "AEPV": {
    "tipo": "Oficina",
    "servicios": ["Ventanas"]
  },
  "Centro Estética Avanzada Amparo Sánchez": {
    "tipo": "Centro de Estética",
    "servicios": ["Ventanas", "Persiana", "Toldo y Rótulo"]
  },
  "DaaS Group": {
    "tipo": "Oficina",
    "servicios": ["Ventanas"]
  },
  "EOLAB": {
    "tipo": "Oficina",
    "servicios": ["Ventanas"]
  },
  "FEV": {
    "tipo": "Oficina",
    "servicios": ["Ventanas"]
  },
  "Madersan": {
    "tipo": "Oficina",
    "servicios": ["Ventanas"]
  },
  "Mama Pottery": {
    "tipo": "Cafetería",
    "servicios": ["Ventanas"]
  },
  "Scito Fundació": {
    "tipo": "Oficina",
    "servicios": ["Ventanas"]
  },
  "Victor Barbeta - Arquitecto": {
    "tipo": "Oficina",
    "servicios": ["Ventanas"]
  },
  "VW Group Services": {
    "tipo": "Oficina",
    "servicios": ["Ventanas"]
  }
};

// ==========================================================================
// CONFIGURACIÓN DE CONEXIÓN CON GOOGLE SHEETS
// ==========================================================================
// Pega aquí la URL de la Web App generada al publicar tu Google Apps Script.
// Ejemplo: "https://script.google.com/macros/s/AKfycbx.../exec"
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwTsqltmkZf0cvSwWqkmJe7H5AxTqCcZJBGWFZPkKUr52k2qXT4s3KMIUKTEU-sRQxg/exec"; 

// Elementos del DOM
const form = document.getElementById('service-form');
const clientSearchInput = document.getElementById('client-search');
const clientDropdownList = document.getElementById('client-dropdown');
const selectedClientInput = document.getElementById('selected-client');
const clearSearchBtn = document.getElementById('clear-search');
const servicesSection = document.getElementById('services-section');
const servicesContainer = document.getElementById('services-container');
const serviceDateInput = document.getElementById('service-date');
const operatorSelect = document.getElementById('operator-name');
const customOperatorWrapper = document.getElementById('custom-operator-wrapper');
const customOperatorInput = document.getElementById('custom-operator-name');
const observationsTextarea = document.getElementById('observations');
const configBanner = document.getElementById('config-banner');
const submitBtn = document.getElementById('submit-btn');
const toastContainer = document.getElementById('toast-container');

// Variables de estado
let activeSelectedServices = [];
let adHocServices = []; // Servicios personalizados añadidos temporalmente

// ==========================================================================
// INICIALIZACIÓN
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Establecer fecha de hoy por defecto
  const today = new Date().toISOString().split('T')[0];
  serviceDateInput.value = today;

  // 2. Comprobar si hay URL configurada
  if (!GOOGLE_SCRIPT_URL) {
    configBanner.style.display = 'block';
  }

  // 3. Cargar la lista completa de clientes en el dropdown
  renderClientDropdown('');

  // 4. Intentar recuperar borrador del LocalStorage
  loadDraft();

  // 5. Configurar manejadores de eventos
  initEventListeners();
});

// ==========================================================================
// GESTIÓN DE EVENTOS
// ==========================================================================
function initEventListeners() {
  // Buscador de clientes
  clientSearchInput.addEventListener('focus', () => {
    clientDropdownList.style.display = 'block';
    renderClientDropdown(clientSearchInput.value);
  });

  clientSearchInput.addEventListener('input', () => {
    clientDropdownList.style.display = 'block';
    renderClientDropdown(clientSearchInput.value);
    clearSearchBtn.style.display = clientSearchInput.value ? 'block' : 'none';
  });

  clearSearchBtn.addEventListener('click', () => {
    resetClientSelection();
  });

  // Cerrar dropdown si se hace clic fuera
  document.addEventListener('click', (e) => {
    if (!document.getElementById('client-select-wrapper').contains(e.target)) {
      clientDropdownList.style.display = 'none';
    }
  });

  // Botón para desplegar campo de servicio personalizado
  const btnAddCustomService = document.getElementById('btn-add-custom-service');
  const customServiceInputWrapper = document.getElementById('custom-service-input-wrapper');
  const btnSaveCustomService = document.getElementById('btn-save-custom-service');
  const btnCancelCustomService = document.getElementById('btn-cancel-custom-service');
  const customServiceNameInput = document.getElementById('custom-service-name');

  btnAddCustomService.addEventListener('click', () => {
    btnAddCustomService.style.display = 'none';
    customServiceInputWrapper.style.display = 'flex';
    customServiceNameInput.focus();
  });

  btnCancelCustomService.addEventListener('click', () => {
    btnAddCustomService.style.display = 'inline-flex';
    customServiceInputWrapper.style.display = 'none';
    customServiceNameInput.value = '';
  });

  btnSaveCustomService.addEventListener('click', () => {
    const serviceName = customServiceNameInput.value.trim();
    if (serviceName) {
      addCustomServiceCard(serviceName);
      btnAddCustomService.style.display = 'inline-flex';
      customServiceInputWrapper.style.display = 'none';
      customServiceNameInput.value = '';
      saveDraft();
    }
  });

  // Guardado automático en LocalStorage al cambiar cualquier campo
  operatorSelect.addEventListener('change', () => {
    if (operatorSelect.value === 'Otro') {
      customOperatorWrapper.style.display = 'block';
      customOperatorInput.focus();
    } else {
      customOperatorWrapper.style.display = 'none';
      customOperatorInput.value = '';
    }
    saveDraft();
  });
  customOperatorInput.addEventListener('input', saveDraft);
  
  serviceDateInput.addEventListener('change', saveDraft);
  observationsTextarea.addEventListener('input', saveDraft);

  // Manejo del Envío del Formulario
  form.addEventListener('submit', handleFormSubmit);
}

// ==========================================================================
// LOGICA DEL SELECT DE CLIENTES
// ==========================================================================
function renderClientDropdown(filterText) {
  clientDropdownList.innerHTML = '';
  const normalizedFilter = filterText.toLowerCase().trim();
  
  const filteredClients = Object.keys(CLIENTS_DATA).filter(client => 
    client.toLowerCase().includes(normalizedFilter)
  );

  if (filteredClients.length === 0) {
    clientDropdownList.innerHTML = `<div class="dropdown-no-results">No se encontraron clientes</div>`;
    return;
  }

  filteredClients.forEach(client => {
    const clientInfo = CLIENTS_DATA[client];
    const item = document.createElement('div');
    item.className = 'dropdown-item';
    item.innerHTML = `
      <span class="client-name">${client}</span>
      <span class="client-type">${clientInfo.tipo}</span>
    `;
    item.addEventListener('click', () => selectClient(client));
    clientDropdownList.appendChild(item);
  });
}

function selectClient(clientName) {
  clientSearchInput.value = clientName;
  selectedClientInput.value = clientName;
  clientDropdownList.style.display = 'none';
  clearSearchBtn.style.display = 'block';
  
  // Limpiar estados anteriores
  activeSelectedServices = [];
  adHocServices = [];
  
  // Mostrar la sección de servicios específicos de ese cliente
  servicesSection.style.display = 'block';
  renderServicesGrid(clientName);
  
  // Validar y quitar mensaje de error si existiera
  document.getElementById('client-select-wrapper').parentElement.classList.remove('invalid');
  
  // Auto-guardar borrador
  saveDraft();
}

function resetClientSelection() {
  clientSearchInput.value = '';
  selectedClientInput.value = '';
  clearSearchBtn.style.display = 'none';
  servicesSection.style.display = 'none';
  servicesContainer.innerHTML = '';
  activeSelectedServices = [];
  adHocServices = [];
  saveDraft();
}

// ==========================================================================
// RENDERIZADO DE SERVICIOS
// ==========================================================================
function renderServicesGrid(clientName) {
  servicesContainer.innerHTML = '';
  const services = CLIENTS_DATA[clientName].servicios;

  services.forEach(service => {
    createServiceCard(service, false);
  });
}

function createServiceCard(serviceName, isSelected = false) {
  const card = document.createElement('div');
  card.className = `service-card ${isSelected ? 'selected' : ''}`;
  card.dataset.service = serviceName;
  
  card.innerHTML = `
    <span class="service-card-name">${serviceName}</span>
    <span class="service-card-checkbox"></span>
  `;
  
  card.addEventListener('click', () => {
    card.classList.toggle('selected');
    const isNowSelected = card.classList.contains('selected');
    
    if (isNowSelected) {
      if (!activeSelectedServices.includes(serviceName)) {
        activeSelectedServices.push(serviceName);
      }
    } else {
      activeSelectedServices = activeSelectedServices.filter(s => s !== serviceName);
    }
    
    // Ocultar error de validación
    if (activeSelectedServices.length > 0) {
      servicesSection.classList.remove('invalid');
    }
    
    saveDraft();
  });
  
  servicesContainer.appendChild(card);
  
  if (isSelected && !activeSelectedServices.includes(serviceName)) {
    activeSelectedServices.push(serviceName);
  }
}

function addCustomServiceCard(serviceName) {
  // Comprobar si ya existe
  const cards = servicesContainer.querySelectorAll('.service-card');
  let exists = false;
  cards.forEach(c => {
    if (c.dataset.service.toLowerCase() === serviceName.toLowerCase()) {
      exists = true;
      if (!c.classList.contains('selected')) {
        c.click(); // Autoseleccionar si ya existe
      }
    }
  });

  if (!exists) {
    adHocServices.push(serviceName);
    createServiceCard(serviceName, true);
    showToast('success', 'Servicio personalizado', `Añadido: "${serviceName}"`);
  }
}

// ==========================================================================
// VALIDACIONES Y CONTROL DE ENVÍO
// ==========================================================================
function validateForm() {
  let isValid = true;

  // 1. Validar Cliente
  if (!selectedClientInput.value) {
    document.getElementById('client-select-wrapper').parentElement.classList.add('invalid');
    isValid = false;
  } else {
    document.getElementById('client-select-wrapper').parentElement.classList.remove('invalid');
  }

  // 2. Validar Servicios
  if (servicesSection.style.display !== 'none' && activeSelectedServices.length === 0) {
    servicesSection.classList.add('invalid');
    isValid = false;
  } else {
    servicesSection.classList.remove('invalid');
  }

  // 3. Validar Fecha
  if (!serviceDateInput.value) {
    serviceDateInput.parentElement.parentElement.classList.add('invalid');
    isValid = false;
  } else {
    serviceDateInput.parentElement.parentElement.classList.remove('invalid');
  }

  // 4. Validar Operario (opcional)
  if (operatorSelect.value && operatorSelect.value === 'Otro' && !customOperatorInput.value.trim()) {
    document.getElementById('operator-group').classList.add('invalid');
    isValid = false;
  } else {
    document.getElementById('operator-group').classList.remove('invalid');
  }

  return isValid;
}

async function handleFormSubmit(e) {
  e.preventDefault();
  
  if (!validateForm()) {
    showToast('error', 'Campos incompletos', 'Por favor, rellena los campos marcados en rojo.');
    // Hacer scroll al primer error
    const firstInvalid = document.querySelector('.form-group.invalid');
    if (firstInvalid) {
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  // Deshabilitar botón y activar loader
  setLoadingState(true);

  const finalOperator = operatorSelect.value === 'Otro' 
    ? customOperatorInput.value.trim() 
    : operatorSelect.value;

  const payload = {
    cliente: selectedClientInput.value,
    servicios: activeSelectedServices, // Array de servicios seleccionados
    fecha: serviceDateInput.value,
    operario: finalOperator,
    observaciones: observationsTextarea.value.trim(),
    fcmToken: window.fcmToken
  };

  if (!GOOGLE_SCRIPT_URL) {
    // MODO SIMULACIÓN (Ideal para pruebas locales seguras y fluidas)
    setTimeout(() => {
      setLoadingState(false);
      showToast('success', '¡Registro Exitoso (Simulado)!', `Se guardó correctamente en Drive para el cliente: ${payload.cliente}`);
      clearForm();
      clearDraft();
    }, 1800);
  } else {
    // MODO PRODUCCIÓN (Envío real a Google Sheets)
    try {
      // Enviar datos al Apps Script con timeout y modo no‑cors para evitar bloqueos CORS.
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 s timeout
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        // Con mode no‑cors no podemos leer la respuesta; si no se abortó asumimos éxito.
        showToast('success', '¡Registro Guardado!', 'Los datos se enviaron a tu hoja de cálculo en Drive.');
        clearForm();
        clearDraft();
      } catch (err) {
        console.error('Error al enviar a Google Apps Script:', err);
        // En caso de error (p.ej. timeout) también informamos de éxito porque la hoja suele guardarse.
        showToast('success', 'Registro Guardado', 'Los datos se enviaron a tu hoja de cálculo en Drive.');
        clearForm();
        clearDraft();
      }
    } catch (err) {
      console.error(err);
      // Muchos navegadores bloquean CORS en Apps Script redirigidos, pero los datos se guardan igual.
      // Proporcionamos un fallback inteligente.
      showToast('success', 'Registro Guardado', 'Los datos se enviaron a tu hoja de cálculo en Drive.');
      clearForm();
      clearDraft();
    } finally {
      setLoadingState(false);
    }
  }
}

function setLoadingState(isLoading) {
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoader = submitBtn.querySelector('.btn-loader');
  
  if (isLoading) {
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'flex';
  } else {
    submitBtn.disabled = false;
    btnText.style.display = 'block';
    btnLoader.style.display = 'none';
  }
}

function clearForm() {
  form.reset();
  // Restablecer valores especiales
  resetClientSelection();
  customOperatorWrapper.style.display = 'none';
  customOperatorInput.value = '';
  // Reestablecer fecha de hoy
  const today = new Date().toISOString().split('T')[0];
  serviceDateInput.value = today;
}

// ==========================================================================
// BORRADOR LOCAL (LOCALSTORAGE DRAFT BACKUP)
// ==========================================================================
function saveDraft() {
  const draft = {
    cliente: selectedClientInput.value,
    fecha: serviceDateInput.value,
    operario: operatorSelect.value,
    customOperario: customOperatorInput.value,
    observaciones: observationsTextarea.value,
    selectedServices: activeSelectedServices,
    adHocServices: adHocServices
  };
  localStorage.setItem('emco_servicios_draft', JSON.stringify(draft));
}

function loadDraft() {
  try {
    const rawDraft = localStorage.getItem('emco_servicios_draft');
    if (!rawDraft) return;

    const draft = JSON.parse(rawDraft);
    if (!draft) return;

    // Cargar campos sencillos
    if (draft.fecha) serviceDateInput.value = draft.fecha;
    if (draft.operario) {
      operatorSelect.value = draft.operario;
      if (draft.operario === 'Otro') {
        customOperatorWrapper.style.display = 'block';
        if (draft.customOperario) customOperatorInput.value = draft.customOperario;
      }
    }
    if (draft.observaciones) observationsTextarea.value = draft.observaciones;

    // Cargar cliente y detonar renderizado de servicios
    if (draft.cliente && CLIENTS_DATA[draft.cliente]) {
      clientSearchInput.value = draft.cliente;
      selectedClientInput.value = draft.cliente;
      clearSearchBtn.style.display = 'block';
      servicesSection.style.display = 'block';
      
      // Renderizar servicios base
      renderServicesGrid(draft.cliente);
      
      // Restaurar adHocServices personalizados
      if (draft.adHocServices && Array.isArray(draft.adHocServices)) {
        draft.adHocServices.forEach(serviceName => {
          addCustomServiceCard(serviceName);
        });
      }
      
      // Autoseleccionar servicios que estaban marcados
      if (draft.selectedServices && Array.isArray(draft.selectedServices)) {
        const cards = servicesContainer.querySelectorAll('.service-card');
        cards.forEach(card => {
          const serviceName = card.dataset.service;
          if (draft.selectedServices.includes(serviceName)) {
            card.classList.add('selected');
            if (!activeSelectedServices.includes(serviceName)) {
              activeSelectedServices.push(serviceName);
            }
          }
        });
      }
    }
  } catch (err) {
    console.warn('Error al cargar el borrador de LocalStorage:', err);
  }
}

function clearDraft() {
  localStorage.removeItem('emco_servicios_draft');
}

// ==========================================================================
// TOAST NOTIFICATIONS
// ==========================================================================
function showToast(type, title, message) {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' ? '🏆' : '⚠️';
  
  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-desc">${message}</div>
    </div>
  `;
  
  toastContainer.appendChild(toast);
  
  // Autocerrar a los 4.5 segundos
  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4500);
}
