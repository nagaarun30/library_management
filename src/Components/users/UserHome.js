import React from 'react'
import Getbooks from './Getbooks';

function UserHome() {
    if(sessionStorage.getItem("loggedin") === "true"){
        return (
            <>
                <div className="container_Home">
                    <div className="tabs_Home">
                        <button className="tablinks_Home" onClick={() => {
                            if(document.getElementById("getbooks").style.display === "none"){
                                document.getElementById("getbooks").style.display = "block";
                            }
                            else{
                                document.getElementById("getbooks").style.display = "none";
                            }
                        }
                        }>Get Books</button>
                        <button className="tablinks_Home" onClick={() => {
                            window.location.href = "#/account";
                        }
                        }>Account</button>
                    </div>
                </div>

                <div className="tab_content" id='getbooks' style={{"display": "none"}}>
                    <Getbooks />
                </div>
                {/* Logout */}
                <button className="tablinks_Home" onClick={() => {
                    sessionStorage.setItem("loggedin", false);
                    sessionStorage.removeItem("uname");
                    sessionStorage.removeItem("uid");
                    sessionStorage.removeItem("email");
                    window.location.href = "#/userlogin";
                }
                }>Logout</button>
            </>
            
         )
       }
       else{
         return (
           <div>
            {alert("You are not logged in")}
            {window.location.href = "#/userlogin"}     
           </div>
         )
       }
}

export default UserHome