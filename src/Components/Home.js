import React from 'react'
import AddBooks from './AddBooks';
import './css/Home/Home.css'
import DeleteBooks from './DeleteBooks';
import Viewbooks from './Viewbooks';

function Home() {

    // console.log(books);
  if(localStorage.getItem("loggedin") === "true"){
   return (
      <>
        <div className="container_Home">
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

            <button className="tablinks_Home" onClick={() => {
              localStorage.setItem("loggedin", false);
              localStorage.removeItem("uname");
              window.location.href = "#/";
            }
            }>Logout</button>
          </div>
        </div>
      </>
    )
  }
  else{
    return (
      <div>
      {alert("You are not logged in")}
      {window.location.href = "#/"}
      </div>
    )
  }
  
}

export default Home