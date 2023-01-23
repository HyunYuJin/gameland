import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'

const app: Express = express()
const port: Number = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors<Request>())
app.use(bodyParser.json())

app.post('/submit', (req: Request, res: Response) => {
  // 전달받은 data
  const datas = req.body
  const results = [0, 0, 0, 0, 0]

  console.log(datas.length)

  datas.map((data: {[key: string]: number}) => {
    const value = Number(Object.values(data))
    results[value - 1] += 1
  })

  res.send(results)

  // 이 데이터를 기반으로 결과값 저장한걸 넘겨주는 get api 만들기
})


app.listen(port, () => {
  console.log(`Server is listening on Port ${port}!`)
})