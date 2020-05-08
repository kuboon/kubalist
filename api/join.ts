import {db} from './_lib/firestore'
import { NowRequest, NowResponse } from '@now/node'

export default async (req: NowRequest, res: NowResponse) => {
  res.setHeader('access-control-allow-origin', '*')
  res.setHeader('access-control-allow-headers', 'origin,x-requested-with,content-type,accept')
  const docRef = db.collection('rooms').doc(req.query.room as string)
  let card, number, count
  await db.runTransaction(async t=>{
    const doc = await t.get(docRef)
    const data = doc.data()
    if(!data){res.status(404); return}
    if(data.cards.length<=data.count){res.status(400); return}
    card = data.cards[data.count]
    number = data.numbers[data.count]
    count = data.count + 1
    t.update(docRef, {count})
  })
  if(card)res.json({card, number, count})
  res.end()
}
