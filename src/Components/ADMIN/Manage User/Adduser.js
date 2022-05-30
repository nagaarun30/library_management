import React from 'react'

function Adduser() {

    function handleSubmit(event) {

        event.preventDefault();
        const answer = window.confirm("Are you sure you want to add this User?");
        if(answer){
        const data = new FormData(event.target);
        if(data.get("Education") === ""){
            data.set("Education", "Nill");
        }
        fetch("http://localhost:8080/library_management/usersignup?username=" + data.get("userName") + "&email=" + data.get("email") + "&fullname=" + data.get("FullName") + "&education=" + data.get("Education") + "&password=" + data.get("password"))
          .then((response) => response.json())
            .then((data1) => {
              console.log(data1);
              if (data1.Status === "Success") {
                alert("User added successfully");
                window.location.reload();
              }
              else if(data1.Status === "EmailExists"){
                alert("Email already exists");
                }
              else {
                alert("User not added");
              }
            }
            );
          }
      }
if(sessionStorage.getItem("loggedin") === "true"){
  return (
      <>
    <div className="container_AddBooks">
    <h1>Add Users</h1>
    <br></br>
      <div>      
        <form onSubmit={handleSubmit}>
          <div className="input-div one">
          <div className="i">
                 </div>
            <div>
              <input type="text" name='userName' className="input" placeholder="UserName" required/>
            </div>
          </div>
          <div className="input-div pass">
            <div className="i">
            </div>
            <div>
              <input type="email" name='email' className="input" placeholder="Email" required/>
            </div>
          </div>
          <div className="input-div pass">
            <div className="i">
          </div>
            <div>
              <input type="text" name='FullName' className="input" placeholder="Full Name" required/>
            </div>
          </div>
          <div className="input-div pass">
            <div className="i">
          </div>
            <div>
              <input type="text" name='Education' className="input" placeholder="Education"/>
            </div>
          </div>
          <div className="input-div pass">
            <div className="i">
            </div>
            <div>
              <input type="password" name='password' className="input" placeholder="Password" required/>
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
        <h1>Please Login To Add User</h1>
        <button className='tablinks_Home' onClick={() => {
            window.location.href = "#/login";
        }}>Login</button>
    </div>
)
}
}

export default Adduser