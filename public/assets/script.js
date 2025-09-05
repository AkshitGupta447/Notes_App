console.log('Script Connected');


function SendSignal(button){
    const objectId = button.getAttribute("data-id");
    console.log("Frontend ID: ",objectId);

    fetch("/notes/deletenote",{
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ id: objectId })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            console.log("Deleted in Fronend as well by DOM:", data.deletedNote);
            // Remove the note element from DOM
            button.closest("li").remove();
          } else {
            console.error("Delete failed:", data.error);
          }
    })
    .catch(err => console.error("Error:", err));
}

function SendUpdateSignal(button){
    const Id = button.getAttribute("data-id");
    const title = button.getAttribute("data-title");
    const text = button.getAttribute("data-text");

    console.log("Updation Neeged For Notes, ID: ",Id, " title: ",title," text: ",text);


    // now show the form for that particular notes_id where title and text are pre written and can be updated

    // Pre Fill Form
    document.getElementById("noteid").value = Id;
    document.getElementById("updatetitle").value = title;
    document.getElementById("updatetext").value = text;


    // Show Form
    document.getElementById("updateFormContainer").style.display = "block";

}

function hideForm() {
    document.getElementById("updateFormContainer").style.display = "none";
  }


function submitUpdate( event ){
    event.preventDefault();  // stops page reload
    console.log("Form submitted!");
    // now you can send data with fetch instead of page reload

    const id = document.getElementById("noteid").value;
    const title = document.getElementById("updatetitle").value;
    const text = document.getElementById("updatetext").value;

    fetch("/notes/update",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body : JSON.stringify({ id, title, text })
    })
    .then(res => res.json())
    .then(data =>{
        if (data.success) {

            // 1. Find the note in the DOM
            const li = document.getElementById(`note-${id}`);
            console.log(li);
            
            // 2. Update its text
            li.querySelector(".titleejs").textContent = title;
            li.querySelector(".textejs").textContent = text;

            // 3. Hide the update form
            hideForm();

            //alert("Note updated!");
          } else {
            alert("Update failed: " + data.error);
          }
        })
        .catch(err => console.error(err));

}