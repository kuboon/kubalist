import * as admin from 'firebase-admin';
import path from 'path'

process.env['GOOGLE_APPLICATION_CREDENTIALS'] = path.join(__dirname, 'firebase-auth.json')
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://kbn-one.firebaseio.com'
});
export const db = admin.firestore()
