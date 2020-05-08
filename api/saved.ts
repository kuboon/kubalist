import pug from 'pug'
import { NowRequest, NowResponse } from '@now/node'

const page = pug.compileFile("_view/index.pug")
export default async (req: NowRequest, res: NowResponse) => {
  const {name, cards} = req.query
  res.send(page({name, cards}))
}
