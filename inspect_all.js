const XLSX = require('xlsx');
const path = require('path');

const excelPath = path.join(__dirname, 'Consola de Gestión Emco V4.xlsx');

try {
  const workbook = XLSX.readFile(excelPath);
  
  workbook.SheetNames.forEach(sheetName => {
    console.log(`\n========================================`);
    console.log(`Hoja: "${sheetName}"`);
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    console.log(`Total de filas: ${data.length}`);
    
    if (data.length > 0) {
      console.log('Columnas:');
      console.log(Object.keys(data[0]));
      console.log('Muestra (primeras 3 filas):');
      console.log(JSON.stringify(data.slice(0, 3), null, 2));
    } else {
      console.log('Hoja vacía o sin datos parseables.');
    }
  });
} catch (error) {
  console.error('Error al leer el archivo Excel:', error.message);
}
