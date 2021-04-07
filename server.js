const express = require('express')
const ejs = require('ejs')

///////////////// Connection to MongoDB Atlas ///////////////////////
const MongoClient = require('mongodb').MongoClient
let db,
    dbConnectionStr = 'mongodb://todoUser:todo9@cluster0-shard-00-00.9diaa.mongodb.net:27017,cluster0-shard-00-01.9diaa.mongodb.net:27017,cluster0-shard-00-02.9diaa.mongodb.net:27017/test?ssl=true&replicaSet=atlas-fvicdi-shard-0&authSource=admin&retryWrites=true&w=majority',
    dbName = 'todo'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    .catch(err => {
        console.log(err)
    })
////////////////////////////////////////////////////////////////////

var app = express()
const PORT = 8000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.get('/', (req, res) => {
	db.collection('todo').find().toArray()
		.then(list => {
			res.render('index', {list})
		})
		.catch(err => {
			console.log(err)
		})
})

app.post('/addItem', (req, res, next) => {
	db.collection('todo').insertOne(req.body)
		.then(result => {
			res.redirect('/')
		})
		.catch(err => console.error(err))
})

app.post('/del', (req, res, next) =>{
	db.collection('todo').find().toArray()
		.then(arr => {
			for(const i in req.body){
				db.collection('todo').deleteOne(arr[i])
					.then(result => res.redirect('/'))
					.catch(err => console.error(err))
			}
		}).catch(err => console.error(err))
})

app.delete('/deleteTodo', (req, res) => {
	console.log(req.body)
	db.collection('todo').deleteOne({item: req.body.item})
		.then(result => {
			console.log('Item Deleted')
			res.json('Item Deleted')
		})
		.catch(err => console.error(err))
})

app.listen(PORT)


var list = [{
	item: "Push the app to Git",
	date: "04/04 23:59"
	},{
	item: "Finish the app",
	date: ""
	},
]
