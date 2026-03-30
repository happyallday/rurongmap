import express from 'express'
import cors from 'cors'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3002
const DATA_FILE = join(__dirname, 'data.json')

app.use(cors())
app.use(express.json())

const loadData = () => {
  if (existsSync(DATA_FILE)) {
    try {
      return JSON.parse(readFileSync(DATA_FILE, 'utf-8'))
    } catch {
      return { companies: [] }
    }
  }
  return { companies: [] }
}

const saveData = (data) => {
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
}

app.get('/api/data', (req, res) => {
  const data = loadData()
  res.json(data)
})

app.post('/api/data', (req, res) => {
  const data = req.body
  saveData(data)
  res.json({ success: true })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`)
})
