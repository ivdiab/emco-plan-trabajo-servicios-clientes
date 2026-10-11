/* ==========================================================================
   EMCO - LÓGICA DE LA APLICACIÓN WEB DE SERVICIOS
   ========================================================================== */

// -------------------------------------------------
// Token de Firebase Cloud Messaging (FCM)
// -------------------------------------------------
window.fcmToken = null;

// Base de datos de Clientes y Servicios (Servirá como respaldo si no hay conexión)
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
let adHocServices = []; // Servicios personalizados añadidos temporalmente

// ==========================================================================
// INICIALIZACIÓN
// ==========================================================================
document.addEventListener('DOMContentLoaded', async () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  serviceDateInput.value = `${year}-${month}-${day}T${hour}:${minute}`;

  if (!GOOGLE_SCRIPT_URL) {
    configBanner.style.display = 'block';
  }

  // 1. Cargar primero lista inicial en el dropdown
  renderClientDropdown('');

  // 2. Obtener lista actualizada desde Google Sheets
  await fetchDynamicClients();

  // 3. Intentar recuperar borrador del LocalStorage
  loadDraft();

  // 4. Configurar manejadores de eventos
  initEventListeners();
});

// ==========================================================================
// CARGA DINÁMICA DE CLIENTES DESDE GOOGLE SHEETS
// ==========================================================================
async function fetchDynamicClients() {
  if (!GOOGLE_SCRIPT_URL) return;

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL);
    const json = await response.json();

    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      // Actualizar la estructura CLIENTS_DATA con los clientes de la hoja
      json.data.forEach(item => {
        if (item.cliente) {
          CLIENTS_DATA[item.cliente] = {
            tipo: item.tipoInmueble || "Cliente",
            servicios: item.servicios || []
          };
        }
      });

      // Volver a renderizar el desplegable con los clientes actualizados
      renderClientDropdown(clientSearchInput.value);
    }
  } catch (err) {
    console.warn('Cargando clientes desde memoria local por falta de respuesta:', err);
  }
}

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
// LÓGICA DEL SELECT DE CLIENTES
// ==========================================================================
function renderClientDropdown(filterText) {
  clientDropdownList.innerHTML = '';
  const normalizedFilter = filterText.toLowerCase().trim();
  
  // 1. Limitar altura del desplegable y activar barra de desplazamiento
  clientDropdownList.style.maxHeight = '260px';
  clientDropdownList.style.overflowY = 'auto';

  // 2. Filtrar y ordenar alfabéticamente en español (ignorando tildes y mayúsculas)
  const filteredClients = Object.keys(CLIENTS_DATA)
    .filter(client => client.toLowerCase().includes(normalizedFilter))
    .sort((a, b) =>
