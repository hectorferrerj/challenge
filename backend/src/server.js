const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const userRoutes = require('./routes/user.routes')

require("dotenv").config()

const port = process.env.PORT || 3000
const url = process.env.DB_HOST || 'mongodb://mongo/stori-db'
const app = express()

mongoose.set('strictQuery', true);

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.once("open", async () => {
  console.log("Connected to Stori-db...")
})

app.use(cors())
app.use(express.json())

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//       'Access-Control-Allow-Headers', 
//       'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

//   next();
// });

app.use('/stori/api',userRoutes)

app.listen(port, () => {
  console.log(`Stori Server listening on port ${port}`)
})
