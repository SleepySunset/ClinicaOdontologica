const express = require("express")
require("dotenv").config();
const cors = require("cors")
const app = express()
const { dbConnectPostgres} = require("./config/postgres")

app.use(cors())
app.use(express.json());
app.use("/api", require("./routes"));

const port = process.env.PORT || 8080



app.listen(port, () =>{
    console.log(`Tu app está lista por http://localhost:${port}`)
})


dbConnectPostgres();
