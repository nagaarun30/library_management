import React from 'react'
import '../css/Home/Home.css'

function Home() {

    // console.log(books);
  if(sessionStorage.getItem("loggedin") === "true"){
   return (
      <>
      
        <div className="container_Home">
        <h1>BOOKS MANAGE</h1>
          <div className="tabs_Home">
            <button className="tablinks_Home add" onClick={() => {
              window.location.href = "#/addbooks";
            }
            }>Add Books</button>


            <button className="tablinks_Home" onClick={() => {
              window.location.href = "#/editbooks";
           }
          }>Edit Books</button>
            <button className="tablinks_Home" onClick={() => {
              window.location.href = "#/deletebooks";
            }
            }>Manage Books</button>
           
          </div>
          <br></br>
          <br></br>
          <br></br>
            <h1>USER MANAGE</h1>
          <div className="tabs_Home">
            <button className="tablinks_Home add" onClick={() => {
              window.location.href = "#/adduser";
            }
            }>Add User</button>
          <button className="tablinks_Home" onClick={() => {
              window.location.href = "#/deleteuser";
            }
            }>Users</button>

            <button className="tablinks_Home" onClick={() => {
              window.location.href = "#/usermanage";
            }
            }>Manage Users</button>
          </div>
          <br></br>
          <br></br>
          <br></br>  
          <h1>ACCOUNTS</h1>
          <div className="tabs_Home">

          <button className="tablinks_Home" onClick={() => {
              window.location.href = "#/libgetbook";
            }
            }>Get Book</button>

            <button className="tablinks_Home" onClick={() => {
              window.location.href = "#/libaccount";
            }
            }>My Account</button>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <h1>Logout</h1>
          <button className="tablinks_Home" onClick={() => {
              sessionStorage.setItem("loggedin", false);
              sessionStorage.removeItem("luname");
              sessionStorage.removeItem("luid");

              window.location.href = "#/";
            }
            }>Logout</button>
        </div>
      </>
    )
  }
  else{
    return (
      <div>
      {alert("You are not logged in")}
      {window.location.href = "#/login"}
      </div>
    )
  }
  
}

export default Home