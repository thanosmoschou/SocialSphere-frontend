import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dotenv from 'dotenv'; // Εισάγουμε τη βιβλιοθήκη dotenv

// Καλούμε το dotenv.config() για να φορτώσουμε τις μεταβλητές από το .env αρχείο
// Αυτό διασφαλίζει ότι οι μεταβλητές είναι διαθέσιμες στο process.env
// πριν το Vite επεξεργαστεί την υπόλοιπη διαμόρφωση.
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Πρόσβαση στις μεταβλητές περιβάλλοντος μέσω process.env
  // Τώρα το BASE_URL_FOR_VITE θα πρέπει να έχει την τιμή από το .env
  const BASE_URL_FOR_VITE = process.env.VITE_APP_BASE_URL;

  // Προαιρετικό: Console log για debugging
  console.log(`[Vite Config] Current Mode: ${mode}`);
  console.log(`[Vite Config] Command: ${command}`);
  console.log(`[Vite Config] BASE_URL_FOR_VITE: ${BASE_URL_FOR_VITE}`); // Αυτό θα πρέπει τώρα να εμφανίζει την τιμή

  return {
    plugins: [react(), tailwindcss()],
    // Χρησιμοποιούμε τη μεταβλητή για το base path
    base: BASE_URL_FOR_VITE, // Εδώ χρησιμοποιείται το process.env.VITE_APP_BASE_URL
  };
});
