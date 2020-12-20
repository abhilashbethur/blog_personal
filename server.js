const express = require("express")
const mongoose = require("mongoose")  //to link the database
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true ,useUnifiedTopology: true, createIndexes :true }) // to remove the warnings 
const app = express()
const articleRouter = require('./routes/articles')
const Article = require("./models/article")
const methodoverride = require("method-override")

app.set('view engine','ejs') //view eingine will convert ejs to html

app.use(express.urlencoded({extended: false}))
app.use(methodoverride("_method"))

app.get('/',async (req,res)=>{
    const articles = await Article.find().sort({
        createdAt: 'desc' })
    res.render('articles/index',{articles : articles})
})

app.use('/articles',articleRouter)
app.listen(5000)  

