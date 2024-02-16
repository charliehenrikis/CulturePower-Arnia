import 'dotenv/config'
import express from 'express'
import { initializeDatabase } from './src/config/mongoConnect'
import UserRouter from './src/routes/userRoutes'
import productRouter from './src/routes/productRoutes'
import { logger } from './src/middleware/logger'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
initializeDatabase()

const app = express()
const port = process.env.PORT
app.use(express.json())
app.use(logger)
app.use('/User', UserRouter)
app.use('/products', productRouter)

app.listen(port, () => {
  console.log(`Servidor ouvindo a porta ${port}`)
})
