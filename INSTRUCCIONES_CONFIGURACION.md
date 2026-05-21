# Guía de Configuración: Formulario de Control de Servicios (EMCO)

Esta guía te guiará paso a paso para conectar tu formulario web con tu archivo de Excel en Google Drive. Es un proceso de 3 minutos y completamente gratuito.

---

## Paso 1: Subir el Excel a Google Drive
*(Si ya lo has hecho, puedes saltar al Paso 2)*
1. Abre tu **Google Drive**.
2. Sube el archivo `Consola de Gestión Emco V4.xlsx` a tu unidad.
3. Abre el archivo subido en Google Drive haciendo doble clic.
4. En el menú superior izquierdo, haz clic en **Archivo** ➔ **Guardar como documento de Hojas de cálculo de Google** (esto creará una versión nativa de Google Sheets compatible con automatizaciones).

---

## Paso 2: Configurar Google Apps Script
1. Abre la hoja de cálculo recién creada en Google Sheets.
2. En el menú superior, ve a **Extensiones** ➔ **Apps Script**.
3. Se abrirá una nueva ventana del editor. Borra cualquier código existente en el archivo `Código.gs`.
4. Abre el archivo [google_apps_script.js](file:///C:/Users/Ivan/.gemini/antigravity/scratch/EMCO-Plan_De_Trabajo-Servicios_Clientes/google_apps_script.js) de este proyecto, copia todo su contenido y pégalo en el editor de Apps Script.
5. Haz clic en el botón de **Guardar** (el icono de disquete 💾).

---

## Paso 3: Publicar como Aplicación Web (Web App)
Para que el formulario pueda comunicarse con la hoja, debemos publicarlo:
1. En la parte superior derecha de la ventana de Apps Script, haz clic en el botón azul **Implementar** (o *Deploy*) ➔ **Nueva implementación** (*New deployment*).
2. Haz clic en el engranaje de configuración al lado de "Seleccionar tipo" y elige **Aplicación web** (*Web app*).
3. Rellena los campos con la siguiente configuración:
   - **Descripción**: `API Formulario EMCO v1`
   - **Ejecutar como**: `Yo (tu_correo@gmail.com)`
   - **Quién tiene acceso**: `Cualquier persona` (Esto es *crítico* para que el formulario local pueda enviar los datos sin contraseñas).
4. Haz clic en **Implementar**.
5. Si es la primera vez, Google te pedirá "Autorizar acceso". Haz clic en **Autorizar acceso**, selecciona tu cuenta de Google, haz clic en **Avanzado** (abajo a la izquierda) y luego en **Ir a Proyecto sin título (no seguro)**. Concede los permisos necesarios.
6. Copia la **URL de la aplicación web** que te aparecerá en pantalla. Será algo parecido a:
   `https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXXXXXXX/exec`

---

## Paso 4: Conectar la App Web local
1. Abre el archivo [app.js](file:///C:/Users/Ivan/.gemini/antigravity/scratch/EMCO-Plan_De_Trabajo-Servicios_Clientes/app.js) en tu editor (ej. VS Code o Bloc de Notas).
2. Busca la línea número 131:
   ```javascript
   const GOOGLE_SCRIPT_URL = ""; 
   ```
3. Pega la URL que copiaste en el Paso 3 entre las comillas. Ejemplo:
   ```javascript
   const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXXXXXXX/exec"; 
   ```
4. Guarda el archivo `app.js`.

---

## ¡Listo para Usar! 🚀
Ya puedes abrir tu archivo `index.html` haciendo doble clic en él en tu ordenador.
- Al seleccionar un cliente de la lista desplegable interactiva, se cargarán sus servicios específicos automáticamente.
- Cuando marques los servicios limpiados y envíes el formulario:
  1. Se añadirá una fila con el registro en la pestaña **"HISTORIAL LIMPIO"**.
  2. El sistema buscará a ese cliente y esos servicios en la pestaña **"Consola de Gestión Emco V4"**, actualizará la columna **"Ultima Fecha"** con la fecha seleccionada y **calculará automáticamente la "Proxima Fecha Estimada"** sumando los meses de frecuencia configurados.
