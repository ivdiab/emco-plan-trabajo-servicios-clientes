const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const excelPath = path.join(__dirname, 'Consola de Gestión Emco V4.xlsx');

try {
  const workbook = XLSX.readFile(excelPath);
  const sheetName = 'Consola de Gestión Emco V4';
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet, { defval: '' });
  
  const clientsData = {};
  
  data.forEach(row => {
    const client = row['Cliente'] ? row['Cliente'].trim() : '';
    const service = row['Servicio'] ? row['Servicio'].trim() : '';
    const type = row['Tipo de Inmueble'] ? row['Tipo de Inmueble'].trim() : 'Comunidad';
    
    if (!client || !service) return;
    
    if (!clientsData[client]) {
      clientsData[client] = {
        tipo: type,
        servicios: []
      };
    }
    
    if (!clientsData[client].servicios.includes(service)) {
      clientsData[client].servicios.push(service);
    }
  });
  
  // Guardar en un archivo JSON para que el frontend lo cargue
  fs.writeFileSync(
    path.join(__dirname, 'clientes_servicios.json'), 
    JSON.stringify(clientsData, null, 2), 
    'utf-8'
  );
  
  console.log(`Generado con éxito. Clientes procesados: ${Object.keys(clientsData).length}`);
  console.log('Ejemplo de datos guardados:');
  const sampleKeys = Object.keys(clientsData).slice(0, 3);
  sampleKeys.forEach(key => {
    console.log(`- ${key}:`, clientsData[key]);
  });
  
} catch (error) {
  console.error('Error al procesar el Excel:', error.message);
}
