const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },  
    title: {
        type:String,
        required:true,
        minLength:1,        
        maxLength:100,
    }, 
    description: {
        type:String,
        required:true,
        minLength:1,        
        maxLength:100,
    }, 
    tag: {
        type:String,
        defualt:"general",
    }, 
    date: {
        type:Date,
        default: Date.now,
    }, 
    
  });

  module.exports = mongoose.model('notes', notesSchema)