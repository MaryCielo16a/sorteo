/**
 * =====================================================
 * SORTEO ECORECETAS — Google Apps Script
 * =====================================================
 *
 * INSTRUCCIONES DE CONFIGURACIÓN:
 *
 * 1. Crea una nueva Google Sheet (hoja de cálculo)
 *    - Ve a https://sheets.google.com
 *    - Crea una hoja nueva llamada "Sorteo EcoRecetas"
 *
 * 2. En la primera fila (encabezados), escribe:
 *    A1: Ticket | B1: Nombre | C1: Email | D1: Fecha
 *    E1: Captura Registro | F1: Captura Formulario | G1: Estado
 *
 * 3. Ve a Extensiones → Apps Script
 *
 * 4. Borra todo el código que aparece y pega ESTE archivo completo
 *
 * 5. Haz clic en "Implementar" → "Nueva implementación"
 *    - Tipo: Aplicación web
 *    - Ejecutar como: Yo (tu cuenta)
 *    - Quién tiene acceso: Cualquier persona
 *    - Clic en "Implementar"
 *
 * 6. Copia la URL que aparece (algo como:
 *    https://script.google.com/macros/s/AKfycb.../exec)
 *
 * 7. Pega esa URL en el archivo src/config/constants.ts
 *    en la variable APPS_SCRIPT_URL
 *
 * NOTA: Cada vez que modifiques este script, debes crear
 * una NUEVA implementación para que los cambios surtan efecto.
 *
 * Las capturas de pantalla se guardarán en una carpeta
 * llamada "Sorteo EcoRecetas - Capturas" en tu Google Drive.
 * =====================================================
 */

var FOLDER_NAME = 'Sorteo EcoRecetas - Capturas';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var nombre = data.nombre;
    var email = data.email;
    var capturaRegistro = data.capturaRegistro;
    var capturaFormulario = data.capturaFormulario;

    // Validaciones
    if (!nombre || !email) {
      return jsonResponse({ success: false, message: 'Nombre y email son requeridos' });
    }

    if (!capturaRegistro || !capturaFormulario) {
      return jsonResponse({ success: false, message: 'Ambas capturas son requeridas' });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Verificar email duplicado
    var emails = sheet.getRange(2, 3, Math.max(sheet.getLastRow() - 1, 1), 1).getValues();
    for (var i = 0; i < emails.length; i++) {
      if (emails[i][0].toString().toLowerCase() === email.toLowerCase()) {
        // Buscar el ticket existente
        var ticketExistente = sheet.getRange(i + 2, 1).getValue();
        return jsonResponse({
          success: true,
          ticket: ticketExistente,
          message: 'Ya estás registrado en el sorteo'
        });
      }
    }

    // Guardar capturas en Drive
    var folder = getOrCreateFolder(FOLDER_NAME);
    var ticketNum = sheet.getLastRow(); // Siguiente número disponible

    var linkRegistro = saveImage(folder, capturaRegistro, 'registro_' + ticketNum + '_' + email);
    var linkFormulario = saveImage(folder, capturaFormulario, 'formulario_' + ticketNum + '_' + email);

    // Guardar en la hoja
    var fecha = new Date().toLocaleDateString('es-PE');
    sheet.appendRow([
      ticketNum,
      nombre,
      email,
      fecha,
      linkRegistro,
      linkFormulario,
      'Pendiente de verificación'
    ]);

    return jsonResponse({
      success: true,
      ticket: ticketNum,
      message: '¡Registro exitoso!'
    });

  } catch (error) {
    return jsonResponse({ success: false, message: 'Error: ' + error.message });
  }
}

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var count = Math.max(sheet.getLastRow() - 1, 0); // Excluir encabezado
    return jsonResponse({ count: count });
  } catch (error) {
    return jsonResponse({ count: 0 });
  }
}

function getOrCreateFolder(name) {
  var folders = DriveApp.getFoldersByName(name);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(name);
}

function saveImage(folder, base64Data, fileName) {
  // Remover el prefijo data:image/...;base64,
  var parts = base64Data.split(',');
  var mimeMatch = parts[0].match(/data:(.*?);/);
  var mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
  var extension = mimeType.split('/')[1] || 'jpg';
  if (extension === 'jpeg') extension = 'jpg';

  var decoded = Utilities.base64Decode(parts[1]);
  var blob = Utilities.newBlob(decoded, mimeType, fileName + '.' + extension);

  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  return file.getUrl();
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
