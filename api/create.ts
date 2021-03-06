import { db } from './_lib/firestore'
import { shuffle } from './_lib/shuffle'
import { v1 } from 'uuid'
import { sha256 } from 'hash.js'
import { NowRequest, NowResponse } from '@vercel/node'

async function cleanUp () {
  const at = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  const batch = db.batch()
  const snapshot = await db
    .collection('rooms')
    .where('createdAt', '<', at)
    .get()
  snapshot.docs.forEach((doc: any) => batch.delete(doc.ref))
  return batch.commit()
}
export default async (req: NowRequest, res: NowResponse) => {
  res.setHeader('access-control-allow-origin', '*')
  res.setHeader(
    'access-control-allow-headers',
    'origin,x-requested-with,content-type,accept'
  )
  const key = v1()
  const id = sha256()
    .update(key)
    .digest('hex')
  const cards = (req.query.cards as string).split(',')
  shuffle(cards)
  const numbers = Array(cards.length)
    .fill(null)
    .map((_, i) => i + 1)
  shuffle(numbers)
  await db
    .collection('rooms')
    .doc(id)
    .set({ count: 0, cards, numbers, created_at: new Date() })
  await cleanUp()
  res.json({ key, id, cards, numbers })
}
