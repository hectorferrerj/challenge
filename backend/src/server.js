const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const userRoutes = require("./routes/user.routes")
const recipientRoutes = require("./routes/recipient.routes")
const newsletterRoutes = require("./routes/newsletter.routes")

require("dotenv").config()

const port = process.env.PORT || 3000
const url = process.env.DB_HOST || "mongodb://mongo/stori-db"
const app = express()

mongoose.set("strictQuery", true)

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.once("open", async () => {
  console.log("Connected to Stori-db...")
})

app.use(cors())
app.use(express.json())

app.use("/stori/api", userRoutes)
app.use("/stori/api", recipientRoutes)
app.use("/stori/api", newsletterRoutes)

app.listen(port, () => {
  console.log(`Stori Server listening on port ${port}`)
})
