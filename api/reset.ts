import {db} from './_lib/firestore'
import {shuffle} from './_lib/shuffle'
import {sha256} from 'hash.js'
import { NowRequest, NowResponse } from '@now/node'

export default async (req: NowRequest, res: NowResponse) => {
  res.setHeader('access-control-allow-origin', '*')
  res.setHeader('access-control-allow-headers', 'origin,x-requested-with,content-type,accept')
  const {key, room} = req.query
  const id = sha256().update(key).digest('hex')
  if(id !== room){res.status(400); return res.end()}

  const docRef = db.collection('rooms').doc(req.query.room as string)
  await db.runTransaction(async t=>{
    const doc = await t.get(docRef)
    const data = doc.data()
    if(!data){res.status(404); return}
    const {cards,numbers} = data
    shuffle(cards)
    shuffle(numbers)
    t.update(docRef, {cards, numbers, count: 0})
    res.json({ok: true})
  })
  res.end()
}
