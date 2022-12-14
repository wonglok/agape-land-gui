// import { Generator } from '@jspm/generator'

export default async function handler(req, res) {
  return res.status(200).json({})
  // const generator = new Generator({
  //   mapUrl: import.meta.url,
  //   env: ['browser', 'development', 'module'],
  // })

  // let bodyData = JSON.parse(req.body)

  // for (let packID in bodyData.packages) {
  //   await generator.install(bodyData.packages[packID])
  // }

  // return res.status(200).json(generator.getMap())
}
