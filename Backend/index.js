const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT ;

// ✅ middleware first
app.use(cors());
app.use(bodyParser.json());

// routes
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
});