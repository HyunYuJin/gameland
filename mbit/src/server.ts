import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app: Express = express()
const port: Number = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors<Request>())
app.use(bodyParser.json())

app.post('/submit', (req: Request, res: Response) => {
  const data = req

  console.log('Request: ', data)
})

app.listen(port, () => {
  console.log(`Server is listening on Port ${port}!`)
})