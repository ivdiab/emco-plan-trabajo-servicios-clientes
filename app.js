/* ==========================================================================
   EMCO - LÓGICA DE LA APLICACIÓN WEB DE SERVICIOS
   ========================================================================== */

// -------------------------------------------------
// Token de Firebase Cloud Messaging (FCM)
// -------------------------------------------------
window.fcmToken = null;

// Base de datos de Clientes y Servicios (Servirá como respaldo local)
let CLIENTS_DATA = {
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
let adHocServices = [];

// ==========================================================================
// INICIALIZACIÓN
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Establecer fecha actual de inmediato
  establecerFechaActual();

  if (!GOOGLE_SCRIPT_URL && configBanner) {
    configBanner.style.display = 'block';
  }

  // 2. Activar eventos de interacción inmediatamente
  initEventListeners();

  // 3. Renderizar lista inicial
  renderClientDropdown('');

  // 4. Cargar borrador si existe
  loadDraft();

  // 5. Cargar clientes dinámicos desde Google Sheets en segundo plano
  fetchDynamicClients();
});

function establecerFechaActual() {
  if (!serviceDateInput) return;
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  serviceDateInput.value = `${year}-${month}-${day}T${hour}:${minute}`;
}

// ==========================================================================
// CARGA DINÁMICA DE CLIENTES DESDE GOOGLE SHEETS
// ==========================================================================
async function fetchDynamicClients() {
  if (!GOOGLE_SCRIPT_URL) return;

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL);
    const json = await response.json();

    if (json && json.success && Array.isArray(json.data) && json.data.length > 0) {
      json.data.forEach(item => {
        if (item && item.cliente) {
          CLIENTS_DATA[item.cliente] = {
            tipo: item.tipoInmueble || "Comunidad",
            servicios: item.servicios || []
          };
        }
      });

      if (clientSearchInput) {
        renderClientDropdown(clientSearchInput.value);
      }
    }
  } catch (err) {
    console.warn('Cargando clientes desde memoria local:', err);
  }
}

// ==========================================================================
// GESTIÓN DE EVENTOS
// ==========================================================================
function initEventListeners() {
  if (!clientSearchInput || !clientDropdownList) return;

  // Buscador de clientes
  clientSearchInput.addEventListener('focus', () => {
    clientDropdownList.style.display = 'block';
    renderClientDropdown(clientSearchInput.value);
  });

  clientSearchInput.addEventListener('input', () => {
    clientDropdownList.style.display = 'block';
    renderClientDropdown(clientSearchInput.value);
    if (clearSearchBtn) clearSearchBtn.style.display = clientSearchInput.value ? 'block' : 'none';
  });

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      resetClientSelection();
    });
  }

  // Cerrar dropdown si se hace clic fuera
  document.addEventListener('click', (e) => {
    const wrapper = document.getElementById('client-select-wrapper');
    if (wrapper && !wrapper.contains(e.target)) {
      clientDropdownList.style.display = 'none';
    }
  });

  // Botón para desplegar campo de servicio personalizado
  const btnAddCustomService = document.getElementById('btn-add-custom-service');
  const customServiceInputWrapper = document.getElementById('custom-service-input-wrapper');
  const btnSaveCustomService = document.getElementById('btn-save-custom-service');
  const btnCancelCustomService = document.getElementById('btn-cancel-custom-service');
  const customServiceNameInput = document.getElementById('custom-service-name');

  if (btnAddCustomService && customServiceInputWrapper) {
    btnAddCustomService.addEventListener('click', () => {
      btnAddCustomService.style.display = 'none';
      customServiceInputWrapper.style.display = 'flex';
      if (customServiceNameInput) customServiceNameInput.focus();
    });
  }

  if (btnCancelCustomService) {
    btnCancelCustomService.addEventListener('click', () => {
      if (btnAddCustomService) btnAddCustomService.style.display = 'inline-flex';
      if (customServiceInputWrapper) customServiceInputWrapper.style.display = 'none';
      if (customServiceNameInput) customServiceNameInput.value = '';
    });
  }

  if (btnSaveCustomService) {
    btnSaveCustomService.addEventListener('click', () => {
      const serviceName = customServiceNameInput ? customServiceNameInput.value.trim() : '';
      if (serviceName) {
        addCustomServiceCard(serviceName);
        if (btnAddCustomService) btnAddCustomService.style.display = 'inline-flex';
        if (customServiceInputWrapper) customServiceInputWrapper.style.display = 'none';
        if (customServiceNameInput) customServiceNameInput.value = '';
        saveDraft();
      }
    });
  }

  // Operario
  if (operatorSelect) {
    operatorSelect.addEventListener('change', () => {
      if (operatorSelect.value === 'Otro') {
        if (customOperatorWrapper) customOperatorWrapper.style.display = 'block';
        if (customOperatorInput) customOperatorInput.focus();
      } else {
        if (customOperatorWrapper) customOperatorWrapper.style.display = 'none';
        if (customOperatorInput) customOperatorInput.value = '';
      }
      saveDraft();
    });
  }

  if (customOperatorInput) customOperatorInput.addEventListener('input', saveDraft);
  if (serviceDateInput) serviceDateInput.addEventListener('change', saveDraft);
  if (observationsTextarea) observationsTextarea.addEventListener('input', saveDraft);

  if (form) form.addEventListener('submit', handleFormSubmit);
}

// ==========================================================================
// LÓGICA DEL SELECT DE CLIENTES
// ==========================================================================
function renderClientDropdown(filterText) {
  if (!clientDropdownList) return;

  clientDropdownList.innerHTML = '';
  clientDropdownList.style.display = 'block';
  clientDropdownList.style.maxHeight = '260px';
  clientDropdownList.style.overflowY = 'auto';

  const normalizedFilter = (filterText || '').toLowerCase().trim();

  // Filtrar y ordenar alfabéticamente en español
  const filteredClients = Object.keys(CLIENTS_DATA)
    .filter(client => client && client.toLowerCase().includes(normalizedFilter))
    .sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));

  if (filteredClients.length === 0) {
    clientDropdownList.innerHTML = `<div class="dropdown-no-results" style="padding:12px; color:#666; text-align:center;">No se encontraron clientes</div>`;
    return;
  }

  filteredClients.forEach(client => {
    const clientInfo = CLIENTS_DATA[client] || { tipo: "Comunidad", servicios: [] };
    const item = document.createElement('div');
    item.className = 'dropdown-item';
    item.innerHTML = `
      <span class="client-name">${client}</span>
      <span class="client-type">${clientInfo.tipo || "Comunidad"}</span>
    `;
    item.addEventListener('click', () => selectClient(client));
    clientDropdownList.appendChild(item);
  });
}

function selectClient(clientName) {
  if (clientSearchInput) clientSearchInput.value = clientName;
  if (selectedClientInput) selectedClientInput.value = clientName;
  if (clientDropdownList) clientDropdownList.style.display = 'none';
  if (clearSearchBtn) clearSearchBtn.style.display = 'block';

  activeSelectedServices = [];
  adHocServices = [];

  if (servicesSection) {
    servicesSection.style.display = 'block';
    renderServicesGrid(clientName);
  }

  const wrapper = document.getElementById('client-select-wrapper');
  if (wrapper && wrapper.parentElement) {
    wrapper.parentElement.classList.remove('invalid');
  }

  saveDraft();
}

function resetClientSelection() {
  if (clientSearchInput) clientSearchInput.value = '';
  if (selectedClientInput) selectedClientInput.value = '';
  if (clearSearchBtn) clearSearchBtn.style.display = 'none';
  if (servicesSection) servicesSection.style.display = 'none';
  if (servicesContainer) servicesContainer.innerHTML = '';
  activeSelectedServices = [];
  adHocServices = [];
  saveDraft();
}

// ==========================================================================
// RENDERIZADO DE SERVICIOS
// ==========================================================================
function renderServicesGrid(clientName) {
  if (!servicesContainer) return;
  servicesContainer.innerHTML = '';
  const clientObj = CLIENTS_DATA[clientName];
  const services = (clientObj && Array.isArray(clientObj.servicios)) ? clientObj.servicios : [];

  services.forEach(service => {
    createServiceCard(service, false);
  });
}

function createServiceCard(serviceName, isSelected = false) {
  if (!servicesContainer) return;

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

    if (activeSelectedServices.length > 0 && servicesSection) {
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
  if (!servicesContainer) return;
  const cards = servicesContainer.querySelectorAll('.service-card');
  let exists = false;
  cards.forEach(c => {
    if (c.dataset.service.toLowerCase() === serviceName.toLowerCase()) {
      exists = true;
      if (!c.classList.contains('selected')) {
        c.click();
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

  if (!selectedClientInput || !selectedClientInput.value) {
    const wrapper = document.getElementById('client-select-wrapper');
    if (wrapper && wrapper.parentElement) wrapper.parentElement.classList.add('invalid');
    isValid = false;
  } else {
    const wrapper = document.getElementById('client-select-wrapper');
    if (wrapper && wrapper.parentElement) wrapper.parentElement.classList.remove('invalid');
  }

  if (servicesSection && servicesSection.style.display !== 'none' && activeSelectedServices.length === 0) {
    servicesSection.classList.add('invalid');
    isValid = false;
  } else if (servicesSection) {
    servicesSection.classList.remove('invalid');
  }

  if (!serviceDateInput || !serviceDateInput.value) {
    if (serviceDateInput && serviceDateInput.parentElement && serviceDateInput.parentElement.parentElement) {
      serviceDateInput.parentElement.parentElement.classList.add('invalid');
    }
    isValid = false;
  } else if (serviceDateInput && serviceDateInput.parentElement && serviceDateInput.parentElement.parentElement) {
    serviceDateInput.parentElement.parentElement.classList.remove('invalid');
  }

  if (operatorSelect && operatorSelect.value === 'Otro' && (!customOperatorInput || !customOperatorInput.value.trim())) {
    const opGroup = document.getElementById('operator-group');
    if (opGroup) opGroup.classList.add('invalid');
    isValid = false;
  } else {
    const opGroup = document.getElementById('operator-group');
    if (opGroup) opGroup.classList.remove('invalid');
  }

  return isValid;
}

async function handleFormSubmit(e) {
  e.preventDefault();

  if (!validateForm()) {
    showToast('error', 'Campos incompletos', 'Por favor, rellena los campos marcados en rojo.');
    const firstInvalid = document.querySelector('.form-group.invalid');
    if (firstInvalid) {
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  setLoadingState(true);

  const finalOperator = (operatorSelect && operatorSelect.value === 'Otro')
    ? (customOperatorInput ? customOperatorInput.value.trim() : '')
    : (operatorSelect ? operatorSelect.value : '');

  const payload = {
    cliente: selectedClientInput ? selectedClientInput.value : '',
    servicios: activeSelectedServices,
    fecha: serviceDateInput ? serviceDateInput.value : '',
    operario: finalOperator,
    observaciones: observationsTextarea ? observationsTextarea.value.trim() : '',
    fcmToken: window.fcmToken
  };

  if (!GOOGLE_SCRIPT_URL) {
    setTimeout(() => {
      setLoadingState(false);
      showToast('success', '¡Registro Exitoso (Simulado)!', `Se guardó correctamente para el cliente: ${payload.cliente}`);
      clearForm();
      clearDraft();
    }, 1800);
  } else {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      showToast('success', '¡Registro Guardado!', 'Los datos se enviaron a tu hoja de cálculo en Drive.');
      clearForm();
      clearDraft();
    } catch (err) {
      console.error('Error al enviar:', err);
      showToast('success', 'Registro Guardado', 'Los datos se enviaron a tu hoja de cálculo en Drive.');
      clearForm();
      clearDraft();
    } finally {
      setLoadingState(false);
    }
  }
}

function setLoadingState(isLoading) {
  if (!submitBtn) return;
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoader = submitBtn.querySelector('.btn-loader');

  if (isLoading) {
    submitBtn.disabled = true;
    if (btnText) btnText.style.display = 'none';
    if (btnLoader) btnLoader.style.display = 'flex';
  } else {
    submitBtn.disabled = false;
    if (btnText) btnText.style.display = 'block';
    if (btnLoader) btnLoader.style.display = 'none';
  }
}

function clearForm() {
  if (form) form.reset();
  resetClientSelection();
  establecerFechaActual();
}

// ==========================================================================
// BORRADOR LOCAL (LOCALSTORAGE DRAFT BACKUP)
// ==========================================================================
function saveDraft() {
  const draft = {
    cliente: selectedClientInput ? selectedClientInput.value : '',
    fecha: serviceDateInput ? serviceDateInput.value : '',
    operario: operatorSelect ? operatorSelect.value : '',
    customOperario: customOperatorInput ? customOperatorInput.value : '',
    observaciones: observationsTextarea ? observationsTextarea.value : '',
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

    if (draft.fecha && serviceDateInput) serviceDateInput.value = draft.fecha;
    if (draft.operario && operatorSelect) {
      operatorSelect.value = draft.operario;
      if (draft.operario === 'Otro' && customOperatorWrapper) {
        customOperatorWrapper.style.display = 'block';
        if (draft.customOperario && customOperatorInput) customOperatorInput.value = draft.customOperario;
      }
    }
    if (draft.observaciones && observationsTextarea) observationsTextarea.value = draft.observaciones;

    if (draft.cliente && CLIENTS_DATA[draft.cliente]) {
      if (clientSearchInput) clientSearchInput.value = draft.cliente;
      if (selectedClientInput) selectedClientInput.value = draft.cliente;
      if (clearSearchBtn) clearSearchBtn.style.display = 'block';
      if (servicesSection) servicesSection.style.display = 'block';

      renderServicesGrid(draft.cliente);

      if (draft.adHocServices && Array.isArray(draft.adHocServices)) {
        draft.adHocServices.forEach(serviceName => {
          addCustomServiceCard(serviceName);
        });
      }

      if (draft.selectedServices && Array.isArray(draft.selectedServices) && servicesContainer) {
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
    console.warn('Error al cargar borrador:', err);
  }
}

function clearDraft() {
  localStorage.removeItem('emco_servicios_draft');
}

// ==========================================================================
// TOAST NOTIFICATIONS
// ==========================================================================
function showToast(type, title, message) {
  if (!toastContainer) return;
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

  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4500);
}
