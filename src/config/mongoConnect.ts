import { connect, connection } from 'mongoose'

async function initializeDatabase () {
  connection.on('open', () => {
    console.log('MongoDB foi iniciado')
  })

  return await connect(process.env.MONGODB_URI as string)
}

export { initializeDatabase }
