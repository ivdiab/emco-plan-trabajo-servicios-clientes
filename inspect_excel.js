const XLSX = require('xlsx');
const path = require('path');

const excelPath = path.join(__dirname, 'Consola de Gestión Emco V4.xlsx');

try {
  const workbook = XLSX.readFile(excelPath);
  console.log('Hojas en el Excel:', workbook.SheetNames);
  
  // Vamos a buscar la hoja que coincida con "Consola de Gestión"
  const sheetName = workbook.SheetNames.find(name => name.includes('Consola de Gestión') || name.includes('Emco'));
  if (sheetName) {
    console.log(`\nLeyendo hoja: "${sheetName}"`);
    const sheet = workbook.Sheets[sheetName];
    
    // Convertir a JSON
    const data = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    console.log(`Total de filas encontradas: ${data.length}`);
    
    if (data.length > 0) {
      console.log('\nColumnas detectadas en la primera fila:');
      console.log(Object.keys(data[0]));
      
      console.log('\nPrimeras 5 filas de muestra:');
      console.log(JSON.stringify(data.slice(0, 5), null, 2));
    } else {
      console.log('La hoja está vacía.');
    }
  } else {
    console.log('No se encontró ninguna hoja con el nombre de Consola de Gestión.');
  }
} catch (error) {
  console.error('Error al leer el archivo Excel:', error.message);
}
