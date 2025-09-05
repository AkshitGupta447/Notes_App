const express = require('express')
const router = express.Router();

const authmiddleware = require('../middlewares/authe');

const notesModel = require('../models/notes.model')


router.get('/',authmiddleware,async (req,res)=>{
  //res.render('index');
  try{
    
    const userId = req.user.userId;

    const notes = await notesModel.find({userId:userId}).populate('userId');

    console.log("Fetched Notes : ", {notes} );

    res.render("index", {notes} );

  }catch(err){

    console.log("Error fetching notes :",err);
    res.status(500).json({
      message: "Server Error"
    })
  }
    
})

router.post('/',authmiddleware ,async (req,res)=>{

    console.log(req.body);

    const userId = req.user.userId;
    console.log(userId)

    const notes = await notesModel.create({
        title: req.body.title,
        text: req.body.text,
        userId: userId
    })

    res.redirect('/notes');
})


router.post("/deletenote", async (req, res) => {
  try {

    const { id } = req.body;
    console.log("Received:", id);
    res.json({ success: true, deletedNote: id});

    // Now Delete that particular notes where notesid = id
    await notesModel.findOneAndDelete({_id: id});

  } catch (err) {
    console.error("Error in /notes/deletenote:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/update', async (req,res)=>{
  const {id,title,text} = req.body;
  console.log("Id has been recived in the backend to update, ID: ",id, title,text);

  // filter, update, option
  const updatednote = await notesModel.findOneAndUpdate(
    {_id:id},
    {$set: { text: text ,title: title}},
    { new: true, runValidators: true }
  )

  res.json({ success: true, note: updatednote });


});

module.exports = router;