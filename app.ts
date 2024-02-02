import 'dotenv/config'
import express from 'express'
import { initializeDatabase } from './src/config/mongoConnect'
import router from './src/routes/userRoutes'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
initializeDatabase()

const app = express()
const port = process.env.PORT
app.use(express.json())
app.use(router)

app.listen(port, () => {
  console.log(`Servidor ouvindo a porta ${port}`)
})
