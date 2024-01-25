import { connect, connection } from "mongoose"


function initializeDatabase() {
  connection.on("open", () => {
    console.log("MongoDB foi iniciado")
  })

  connect(process.env.MONGODB_URI as string)
}

export { initializeDatabase }
