/**
 * Google Apps Script para EMCO: Plan de Trabajo - Servicios Clientes
 * 
 * Este script actúa como API (Webhook) para recibir las respuestas del formulario web
 * y guardarlas automáticamente en tu hoja de cálculo de Google Drive.
 * 
 * Realiza dos acciones automáticas:
 * 1. Añade un registro completo e histórico en la hoja "HISTORIAL LIMPIO".
 * 2. Busca e identifica al cliente y los servicios en la hoja "Consola de Gestión Emco V4",
 *    actualiza la "Ultima Fecha" y calcula automáticamente la "Proxima Fecha Estimada"
 *    sumando los meses de frecuencia de forma inteligente.
 */

function doPost(e) {
  var JSON_RESPONSE = { success: false, message: "" };
  
  try {
    // 1. Validar y parsear datos recibidos
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("Petición vacía o incorrecta");
    }
    
    var data = JSON.parse(e.postData.contents);
    var cliente = data.cliente;
    var servicios = data.servicios; // Array de servicios
    var fechaStr = data.fecha; // YYYY-MM-DD
    var operario = data.operario || ""; // Operario optional
    var observaciones = data.observaciones || "";
    
    if (!cliente || !servicios || servicios.length === 0 || !fechaStr) {
      throw new Error("Campos obligatorios faltantes (cliente, servicios o fecha)");
    }

    var fechaServicio = parseISOString(fechaStr);
    var timestamp = new Date().toISOString();
    
    // 2. Abrir el documento activo de Google Sheets
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // ==========================================
    // PARTE A: GUARDAR EN HISTORIAL LIMPIO
    // ==========================================
    var sheetHistorial = ss.getSheetByName("HISTORIAL LIMPIO");
    if (!sheetHistorial) {
      throw new Error("No se encontró la pestaña 'HISTORIAL LIMPIO'. Asegúrate de que existe.");
    }
    
    // Las columnas son: Marca temporal, Cliente, Servicio Realizado, Fecha del Servicio, Notas / Observaciones, Operario
    var serviciosTexto = servicios.join(", ");
    sheetHistorial.appendRow([
      timestamp,
      cliente,
      serviciosTexto,
      fechaServicio,
      observaciones,
      operario
    ]);
    
    // ==========================================
    // PARTE B: ACTUALIZAR CONSOLA DE GESTIÓN EMCO
    // ==========================================
    var sheetConsola = ss.getSheetByName("Consola de Gestión Emco V4");
    if (sheetConsola) {
      var lastRow = sheetConsola.getLastRow();
      if (lastRow >= 2) {
        // Leer todos los datos de la consola (a partir de la fila 2)
        var range = sheetConsola.getRange(2, 1, lastRow - 1, 7); // A a G
        var values = range.getValues();
        
        // Iterar las filas de la consola
        for (var i = 0; i < values.length; i++) {
          var filaCliente = (values[i][0] || "").toString().trim();
          var filaServicio = (values[i][1] || "").toString().trim();
          
          // Si el cliente coincide y el servicio está en la lista de completados
          if (filaCliente.toLowerCase() === cliente.toLowerCase() && 
              servicios.some(function(s) { return s.toLowerCase() === filaServicio.toLowerCase(); })) {
            
            var rowNum = i + 2; // Compensar índice (fila 2 es el primer dato)
            
            // 1. Actualizar "Ultima Fecha" (Columna D - Col 4)
            sheetConsola.getRange(rowNum, 4).setValue(fechaServicio);
            
            // 2. Leer "Frecuencia (Meses)" (Columna C - Col 3) y recalcular "Proxima Fecha"
            var frecuenciaMeses = parseInt(values[i][2]);
            if (!isNaN(frecuenciaMeses) && frecuenciaMeses > 0) {
              var proximaFecha = new Date(fechaServicio);
              proximaFecha.setMonth(proximaFecha.getMonth() + frecuenciaMeses);
              
              // Actualizar "Proxima Fecha Estimada" (Columna E - Col 5)
              sheetConsola.getRange(rowNum, 5).setValue(proximaFecha);
            }
          }
        }
      }
    }
    
    JSON_RESPONSE.success = true;
    JSON_RESPONSE.message = "Plan de trabajo registrado con éxito";
    
  } catch (error) {
    JSON_RESPONSE.success = false;
    JSON_RESPONSE.message = error.message;
  }
  
  // 3. Devolver respuesta JSON formateada con CORS para navegadores
  return ContentService.createTextOutput(JSON.stringify(JSON_RESPONSE))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Función auxiliar para parsear fechas de forma segura en Apps Script
 */
function parseISOString(s) {
  var b = s.split(/\D/);
  return new Date(Date.UTC(b[0], --b[1], b[2], 12, 0, 0, 0)); // Mediodía UTC para evitar desfases de zona horaria
}
