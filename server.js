const express = require('express')
const ejs = require('ejs')
//const mongoose = require('mongoose')
const app = express()
const PORT = 8000


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
  res.render('index', {todos})
})

//app.get('/', (req, res) => {
//  db.collection("todo").find().toArray()
//    .then(data => {
//      res.render('index', {data: list})
//    })
//    .catch(err => console.log(err)) 
//})

app.listen(process.env.PORT || PORT, () => {
	console.log(`Todoapp listening at http://localhost:${PORT}`)
})



//const MongoClient = require('mongodb').MongoClient;
//let dbName = "todo";
//const uri = "mongodb+srv://todoUser:Krbezlija9@cluster0.9diaa.mongodb.net/todo?retryWrites=true&w=majority";
//MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//var db = async () => {client.connect(err => {
//  //const db = client.db("todo")
//  const collection = client.db("todo").collection("todos");
//  // perform actions on the collection object
//  client.close();
//});
//}

//let dbConnectionStr = 'mongodb+srv://todoUser:Krbezlija9@cluster0.9diaa.mongodb.net/todo?retryWrites=true&w=majority';

//const db = async() => {
 // await mongoose.connect(dbConnectionStr)
//}
//mongoose.connect(dbConnectionStr, {useNewUrlParser: true, useUnifiedTopology: true})
//mongoose.connect(dbConnectionStr)
  //.then(() => console.log("Mongodb connected..."))


var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://mirzaTodo:mirza9@todocluster.ysv0g.mongodb.net/todoList?retryWrites=true&w=majority"
MongoClient.connect(uri, { useUnifiedTopology: true })
  .then( (client) => {
  const collection = client.db("todoList").collection("todos");
  //console.log(collection.find().toArray())

  // perform actions on the collection object
  client.close();
  })
  .catch(err => console.log(err))

let todos = [
  {time:'12AM',
    item: 'Pisi zadacu'},
  {time: '13AM',
    item:'Odmori'}
]
