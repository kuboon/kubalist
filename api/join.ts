import * as admin from 'firebase-admin';
import path from 'path'
import { NowRequest, NowResponse } from '@now/node'

process.env['GOOGLE_APPLICATION_CREDENTIALS'] = path.join(__dirname, 'firebase-auth.json')
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://kbn-one.firebaseio.com'
});
const db = admin.firestore()

export default async (req: NowRequest, res: NowResponse) => {
  const docRef = await db.collection('rooms').doc(req.query.room as string)
  let card, count
  await db.runTransaction(async t=>{
    const doc = await t.get(docRef)
    const data = doc.data()
    if(!data){res.status(404); return}
    if(data.cards.length<=data.count){res.status(400); return}
    card = data.cards[data.count]
    count = data.count + 1
    t.update(docRef, {count})
  })
  if(card)res.json({card, count})
  res.end()
}
