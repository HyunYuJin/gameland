import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'

const app: Express = express()
const port: Number = 3000
const __dirname = path.resolve();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors<Request>())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "src")));

app.post('/submit', (req: Request, res: Response) => {
  // 전달받은 data
  const data = req.body;

  // 이 데이터를 기반으로 결과값 저장한걸 넘겨주는 get api 만들기
})


app.listen(port, () => {
  console.log(`Server is listening on Port ${port}!`)
})