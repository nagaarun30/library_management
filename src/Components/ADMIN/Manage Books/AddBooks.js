import React from 'react'
import '../../css/addbooks.css'

function AddBooks() {
  function handleSubmit(event) {

    event.preventDefault();
    const answer = window.confirm("Are you sure you want to add this book?");
    if(answer){
    const data = new FormData(event.target);
    if(data.get("author") === ""){
      data.set("author", "Unknown");
    }
    if(data.get("subject") === ""){
      data.set("subject", "Other");
    }

    fetch("http://localhost:8080/library_management/AddBooks?BookTitle=" + data.get("title") + "&Author=" + data.get("author") + "&Subject=" + data.get("subject") + "&PDate=" + data.get("date") + "&Quantity=" + data.get("quantity"))
      .then((response) => response.json())
        .then((data1) => {
          console.log(data1);
          if (data1.Status === "SUCCESS") {
            alert("Book added successfully");
            window.location.reload();
          }
          else {
            alert("Book not added");
          }
        }
        );
      }
  }

  if(sessionStorage.getItem("loggedin") === "true"){
  return (
    <>
      

      {/* TODO: CREATE A FORM FOR ADDING BOOKS */}
      <div className="container_AddBooks">
      <h1>Add Books</h1>
      <br></br>
        <div>      
          <form onSubmit={handleSubmit}>
            <div className="input-div one">
            <div className="i">
           		</div>
              <div>
                <input type="text" name='title' className="input" placeholder="Book Name" required/>
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
              </div>
              <div>
                <input type="text" name='author' className="input" placeholder="Author Name"/>
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
            </div>
              <div>
                <input type="text" name='subject' className="input" placeholder="Subject"/>
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
            </div>
              <div>
                <input type="number" name='quantity' className="input" placeholder="Quantity"/>
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
              </div>
              <div>
                <input type="Date" name='date' className="input"/>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" value="Add">ADD</button>
            <br></br>
            <div className="container_Home">
                    <div className="tabs_Home">
                        <button className="tablinks_Home abtn" onClick={() => {
                            sessionStorage.removeItem("uid");
                                   sessionStorage.removeItem("uname");
                                   sessionStorage.removeItem("email");
                                   window.location.href = "#/login";
                        }
                        }>LOGOUT</button>
                        <button className="tablinks_Home abtn" onClick={() => {
                            window.location.href = "#/home";
                        }
                        }>Home</button>
                    </div>
                </div>
          </form>
        </div>
        
      </div>  
    </>
  )
}
else{
  return (
    <div>
      <h1>Please Login to Add Books</h1>
      <a href='#/login' className='abtn'> LOGIN </a>
    </div>
  )
}
}
export default AddBooks