const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb://0.0.0.0/NotesApp').then(()=>{
    console.log('Connected to DB');
}).catch((err)=>{
    console.log('Error connecting to DB',err);
})

module.exports = connection;