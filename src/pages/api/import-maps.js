import { NextResponse } from 'next/server'

import { Generator } from '@jspm/generator'

export default async function handler(req, res) {
  const generator = new Generator({
    mapUrl: import.meta.url,
    env: ['browser', 'development', 'module'],
  })

  let bodyData = JSON.parse(req.body)

  for (let packID in bodyData.packages) {
    await generator.install(bodyData.packages[packID])
  }

  return NextResponse.json(generator.getMap())
}

export const config = {
  runtime: 'experimental-edge',
}
