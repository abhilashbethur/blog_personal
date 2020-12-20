const mongoose = require('mongoose')
const marked = require("marked")                // used for markdown
const slugify = require("slugify")              // used to remove random string as id and to put title in /articles/title
const createDomPurify = require("dompurify")      // to sanitize input
const { JSDOM } = require("jsdom")
const dompurify = createDomPurify(new JSDOM().window)       //to create HTML and purify it 

const articleSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now                              //or ()=> Date.now()
    },
    slug:{
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml:{
        type: String,
        required: true
    }
})

articleSchema.pre("validate", function(next){
    if (this.title){
        this.slug = slugify(this.title, { lower:true, strict: true})
    }
    if(this.description){
        this.sanitizedHtml = dompurify.sanitize(marked(this.description))
    }
    next()
})

module.exports = mongoose.model('Article', articleSchema)