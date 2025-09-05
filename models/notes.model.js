const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title: String,
    text: String,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
})

const notesModel = mongoose.model('notes',notesSchema);

module.exports = notesModel;