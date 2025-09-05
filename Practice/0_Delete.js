// SCRIPT

function SendSignal(button){
    
    const notes_id = button.getAttribute("data-id");

    fetch("/notes/delete",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id:notes_id})
    })
    .then(res=> res.json())
    .then(data =>{


        // DOM to update real time changes without reload
        if(data.success){
            // climb up to parent wrapper li to remove every thing inside (buttons,title,text)
            button.closest("li").remove(); 
        }
        else{
            console.log("Delete Failed from backend: ",err);
        }



    })
    .catch(err=> console.error("Error:",err))
}



// BACKEND

// at notes.route.js
router.post('/delete',async (req,res)=>{
try{
    
    const {id} = req.body;

    await notesModel.findOneAndDelete({id: id})

    res.json({success:true, deleted_note_id: id})


}catch(err){

    console.log("Error in backend : ",err);

    res.status(500).json({success:false, error: err.message})
}
});