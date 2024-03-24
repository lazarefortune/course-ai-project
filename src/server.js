import { Model } from "objection"
import config from "./config/config.js"
import app from "./app.js"
import { PrismaClient } from '@prisma/client'

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...")
  console.log(err.name, err.message)
  process.exit(1)
})

// Connect the database
const prisma = new PrismaClient()
// check if the database is connected
prisma.$connect()
  .then(() => {
    console.log("🚀 Database connected")
  })
  .catch((err) => {
    console.log("Database connection failed")
    console.log(err)
  })

// Start the server
const PORT = config.port

app.listen(PORT, () => {
  console.log(`Environment: ${config.environment}`)
  console.log(`🎉 Listening on port ${PORT}`)
})

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!!!  shutting down ...")
  console.log(err.name, err.message)
  // eslint-disable-next-line no-undef
  server.close(() => {
    process.exit(1)
  })
})

export default app
