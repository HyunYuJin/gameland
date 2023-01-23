import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'

const app: Express = express()
const port: Number = 3000
let maxTotal: Number = 0

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors<Request>())
app.use(bodyParser.json())

app.post('/submit', (req: Request, res: Response) => {
  // 전달받은 data
  const datas = req.body
  const totals = [0, 0, 0, 0, 0]

  datas.map((data: {[key: string]: number}) => {
    const value = Number(Object.values(data))
    totals[value - 1] += 1
  })

  maxTotal = totals.indexOf(Math.max(...totals)) + 1
  
  res.send(totals)
})

// 넘겨받은 값 중 최대 값(=== 개발 유형)에 관한 데이터 받아오기
app.get('/result', (req: Request, res: Response, next) => {
  try {
    if (!maxTotal) throw Error('결과 값이 없습니다.')
    
    res.status(200).json(maxTotal)
    res.send({ result: maxTotal })
  } catch (error) {
    res.status(400).json({ msg: error })

    next(error)
  }
})

app.listen(port, () => {
  console.log(`Server is listening on Port ${port}!`)
})