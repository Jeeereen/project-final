const express = require('express')
const app = express()

const mongoose = require('mongoose')

const userRouter = require('./routes/userRouter')
const bookRouter = require('./routes/bookRouter')

const morgan = require('morgan')

const uri = "mongodb+srv://dbuser:sVlwYFladIg3GFjI@cluster0.k57vv.mongodb.net?retryWrites=true&w=majority";

async function connect(){
    await mongoose.connect(uri,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log("Connected to Database")
}

connect().catch(console.dir)

app.use(morgan('common'))
app.use(express.static(__dirname + '/public'))

app.use(express.json())

app.use('/user', userRouter)
app.use('/book',bookRouter)

app.use((req,res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end('This is Express')
})

const PORT = 8000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})