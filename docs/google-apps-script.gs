/**
 * FitGram landing — lead capture into a Google Sheet, deduped by email.
 *
 * SETUP
 * 1. Create a new Google Sheet (this is your leads database).
 * 2. Extensions → Apps Script. Delete the sample, paste this whole file, Save.
 * 3. Deploy → New deployment → select type "Web app":
 *      - Execute as:      Me
 *      - Who has access:  Anyone
 *    Authorize when prompted, then copy the Web app URL (ends in /exec).
 * 4. Paste that URL into SHEET_ENDPOINT in
 *      src/components/sections/WaitlistForm.tsx
 *    The form then stores every lead here and rejects duplicate emails.
 *
 * The frontend sends the body as text/plain on purpose: it keeps the request
 * "simple" so the browser skips the CORS preflight that Apps Script can't answer.
 */

const SHEET_NAME = 'Leads';
const NOTIFY_EMAIL = 'fitgrampt@gmail.com'; // set to '' to disable email notifications
const HEADERS = [
  'Data',
  'Nome',
  'Email',
  'Tipo de PT',
  'Nº clientes',
  'Ferramentas',
  'Contacto',
  'Call',
  'Tarefa',
  'Idioma',
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000); // avoid two concurrent submits racing the dedup check
  try {
    const data = JSON.parse(e.postData.contents);
    const email = String(data.email || '').trim().toLowerCase();
    if (!email) return json({ ok: false, error: 'missing-email' });

    const sheet = getSheet();

    // Dedup: scan the Email column (column 3) for an existing match.
    const last = sheet.getLastRow();
    if (last >= 2) {
      const existing = sheet.getRange(2, 3, last - 1, 1).getValues();
      for (let i = 0; i < existing.length; i++) {
        if (String(existing[i][0]).trim().toLowerCase() === email) {
          return json({ ok: false, error: 'duplicate' });
        }
      }
    }

    sheet.appendRow([
      new Date(),
      data.name || '',
      email,
      data.ptType || '',
      data.clients || '',
      data.tools || '',
      data.contact || '',
      data.call || '',
      data.pain || '',
      data.locale || '',
    ]);

    // Notify the FitGram team.
    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(
        NOTIFY_EMAIL,
        'Nova candidatura — FitGram beta',
        [
          'Nome: ' + (data.name || ''),
          'Email: ' + email,
          'Tipo de PT: ' + (data.ptType || ''),
          'Nº clientes: ' + (data.clients || ''),
          'Ferramentas: ' + (data.tools || ''),
          'Contacto: ' + (data.contact || ''),
          'Call: ' + (data.call || ''),
          'Tarefa: ' + (data.pain || ''),
          'Idioma: ' + (data.locale || ''),
        ].join('\n'),
      );
    }

    // Confirmation email to the applicant (localized text comes from the site).
    if (data.confirmBody) {
      MailApp.sendEmail({
        to: email,
        subject: data.confirmSubject || 'FitGram',
        body: String(data.confirmBody),
        name: 'FitGram',
      });
    }

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
  }
  return sheet;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
