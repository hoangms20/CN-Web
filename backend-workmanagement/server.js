require('dotenv').config()
const express = require('express')
const app = express()
const dbConnect = require('./config/DBConnect')
const router = require('./routes/index')
const path = require('path')
var cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const PORT = `${process.env.PORT}`

//connect Db
dbConnect()

//send with json data
app.use(express.json())

//use mideware to format body in post
app.use(
	express.urlencoded({
		extended: true,
	})
)

// override with POST having ?_method=DELETE or PUT
app.use(methodOverride('_method'))

//use cookie
app.use(cookieParser())

// Static Files
app.use('/public', express.static('public'))

// Set Templating Engine
app.set('views', './views')
app.set('view engine', 'ejs')

//routing
router(app)

app.listen(PORT, () =>
	console.log(`Server started on port http://localhost:${PORT}`)
)
