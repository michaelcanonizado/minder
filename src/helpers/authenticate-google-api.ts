import { google } from 'googleapis';

/**
 * Authenticates access to Google Sheets with
 * Google API
 *
 * @returns instance of googlesheets and auth object
 */
export const authenticateGoogleAPI = async () => {
  const keyFilePath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  /* Authenticate */
  const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
  });

  /* Create client instance */
  const client = await auth.getClient();

  /* Create instance of Google Sheets API */
  /* @ts-ignore - Somehow throws a type error */
  const googleSheets = google.sheets({ version: 'v4', auth: client });

  /* Throw error if an error occurred when authenticating */
  if (!googleSheets) {
    throw new Error('Error connecting with google API');
  }

  return [googleSheets, auth] as [typeof googleSheets, typeof auth];
};
