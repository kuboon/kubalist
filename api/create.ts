import * as admin from 'firebase-admin';
import {v1} from 'uuid'
import path from 'path'
import { NowRequest, NowResponse } from '@now/node'

process.env['GOOGLE_APPLICATION_CREDENTIALS'] = path.join(__dirname, 'firebase-auth.json')
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://kbn-one.firebaseio.com'
});
const db = admin.firestore()

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export default async (req: NowRequest, res: NowResponse) => {
  const id = v1()
  const cards = (req.query.cards as string).split(",")
  shuffle(cards)
  await db.collection('rooms').doc(id).set({count: 0, cards, updated_at: admin.database.ServerValue.TIMESTAMP})
  res.json({id, cards})
}
